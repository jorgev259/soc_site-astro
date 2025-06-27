FROM node:24-alpine AS build-deps
WORKDIR /app
RUN corepack enable
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:24-alpine AS build
ARG GIT_BRANCH
WORKDIR /app
COPY . .
COPY --from=build-deps /app/node_modules ./node_modules
COPY .env.docker .env
RUN yarn build

FROM node:24-alpine AS prod-deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN corepack enable
RUN yarn install --production --frozen-lockfile

FROM node:24-alpine AS runner
ARG GIT_BRANCH
WORKDIR /app
ENV HOST=0.0.0.0
ENV PORT=80
EXPOSE 80
COPY --from=build /app/dist ./dist
COPY --from=prod-deps /app/node_modules ./node_modules
COPY .env.runner .env
COPY package.json yarn.lock
CMD ["yarn prisma:migrate", "node ./dist/server/entry.mjs"]