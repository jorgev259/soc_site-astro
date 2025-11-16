FROM node:24-alpine AS base
WORKDIR /app
EXPOSE 4321
ENV HOST=0.0.0.0
ENV PORT=4321
RUN corepack enable
RUN yarn -v

FROM base AS deps-build
COPY prisma package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false

FROM base AS build
COPY --from=deps-build /app/node_modules/ ./node_modules
COPY . .
RUN yarn prisma generate
RUN yarn build

FROM base AS runner
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma/generated/ ./prisma/generated
COPY prisma/ ./prisma
COPY package.json yarn.lock  ./
ENTRYPOINT yarn install --frozen-lockfile --production=true && yarn prisma migrate deploy && yarn start