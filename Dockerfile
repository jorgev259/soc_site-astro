FROM node:24-alpine AS base
WORKDIR /app
RUN corepack enable
RUN yarn -v

FROM base AS deps 
COPY yarn.lock package.json ./
RUN yarn install --frozen-lockfile

FROM base AS deps-prod 
COPY yarn.lock package.json ./
COPY prisma .
RUN yarn install --frozen-lockfile --production
RUN yarn prisma generate

FROM base AS build
ARG MODE=development
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build -m ${MODE}
RUN tsc prisma/migrate.ts --outDir dist/prisma --esModuleInterop

FROM deps AS runner
COPY --from=build /app/dist ./dist
COPY --from=deps-prod /app/node_modules ./node_modules
COPY prisma .
EXPOSE 4321
ENV HOST=0.0.0.0
ENV PORT=4321
ENTRYPOINT node_modules/.bin/prisma migrate deploy && node dist/prisma/migrate.js && node dist/server/entry.mjs