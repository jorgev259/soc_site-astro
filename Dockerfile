FROM node:24-alpine AS base
WORKDIR /app
EXPOSE 4321
ENV HOST=0.0.0.0
ENV PORT=4321
RUN corepack enable
RUN yarn -v
COPY . .
RUN yarn install --frozen-lockfile 
RUN yarn build 
RUN yarn prisma generate
ENTRYPOINT node_modules/.bin/prisma migrate deploy && node dist/server/entry.mjs