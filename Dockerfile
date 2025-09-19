FROM node:24-alpine
WORKDIR /app
RUN corepack enable
RUN yarn -v

FROM base AS deps 
COPY yarn.lock package.json ./
RUN yarn install --frozen-lockfile
RUN yarn prisma generate

FROM base AS deps-prod 
COPY yarn.lock package.json ./
COPY prisma .
RUN yarn install --frozen-lockfile --production
RUN yarn prisma generate

FROM base AS build
COPY src .
COPY prisma .
COPY package.json ./
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build 
# RUN yarn tsx prisma/migrate.ts

EXPOSE 4321
ENV HOST=0.0.0.0
ENV PORT=4321
ENTRYPOINT node_modules/.bin/prisma migrate deploy && node dist/server/entry.mjs