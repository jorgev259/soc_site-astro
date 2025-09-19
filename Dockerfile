FROM node:24-alpine
WORKDIR /app
RUN corepack enable
RUN yarn -v
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn prisma generate
RUN yarn build 
# RUN yarn tsx prisma/migrate.ts

EXPOSE 4321
ENV HOST=0.0.0.0
ENV PORT=4321
ENTRYPOINT node_modules/.bin/prisma migrate deploy && node dist/server/entry.mjs