FROM node:24-alpine AS builder
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn build

FROM node:24-alpine AS dependencies
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

FROM node:24-alpine AS runner
WORKDIR /app
ENV HOST=0.0.0.0
ENV PORT=80
EXPOSE 80
COPY --from=builder /app/dist ./dist
COPY --from=dependencies /app/node_modules ./node_modules
CMD ["node", "./dist/server/entry.mjs"]