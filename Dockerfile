# syntax=docker/dockerfile:experimental
FROM node:24-alpine AS base
WORKDIR /app
RUN corepack enable
RUN yarn -v

FROM base AS deps
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

FROM deps AS build
ARG MODE=development
ENV DATABASE_URL="mysql://soc:soc@localhost:3306/soc"
COPY src public project.inlang prisma messages ./
RUN yarn prisma db push
RUN yarn build -m ${MODE}

FROM deps AS runner
ENV HOST=0.0.0.0
ENV PORT=80
EXPOSE 80
COPY --from=build /app/dist .
COPY prisma package.json ./
CMD ["node", "./dist/server/entry.mjs"]