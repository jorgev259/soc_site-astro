FROM node:24-alpine AS base
WORKDIR /app
EXPOSE 4321
ENV HOST=0.0.0.0
ENV PORT=4321
RUN corepack enable
RUN yarn -v

FROM base AS deps-build
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false

FROM base AS deps-prod
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=true

FROM base AS build
COPY --from=deps-build /app/node_modules/ ./node_modules
COPY . .
RUN yarn build

FROM base AS runner
COPY --from=deps-prod /app/node_modules/ ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY package.json ./
ENTRYPOINT yarn run migrate && yarn start