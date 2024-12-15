FROM node:20.12-alpine AS base

FROM base AS deps

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
COPY pnpm-workspace.yaml ./

COPY server/package.json server/yarn.lock* server/package-lock.json* server/pnpm-lock.yaml* server/.npmrc* ./server/
COPY server/prisma ./server/prisma

COPY frontend/package.json frontend/yarn.lock* frontend/package-lock.json* frontend/pnpm-lock.yaml* frontend/.npmrc* ./frontend/
# COPY scripts/package.json scripts/yarn.lock* scripts/package-lock.json* scripts/pnpm-lock.yaml* scripts/.npmrc* ./scripts/


COPY shared/ ./shared/

WORKDIR /app
RUN \
  if [ -f yarn.lock ]; then NODE_ENV=development yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then NODE_ENV=development npm install; \
  elif [ -f pnpm-lock.yaml ]; then NODE_ENV=development corepack enable pnpm && pnpm install; \
  else echo "Lockfile not found." && exit 1; \
  fi

RUN ls -la ./frontend
FROM base AS builder

WORKDIR /app

COPY --from=deps ./app .
COPY frontend ./frontend

WORKDIR /app/frontend

RUN npm install -g typescript

RUN \
  if [ -f yarn.lock ]; then NODE_ENV=development yarn run build; \
  elif [ -f package-lock.json ]; then NODE_ENV=development npm run build; \
  elif [ -f pnpm-lock.yaml ]; then NODE_ENV=development corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS runner

WORKDIR /app
COPY --from=deps ./app ./
COPY server ./server

WORKDIR /app/server
COPY --from=builder ./app/frontend/dist ./src/dist

RUN corepack enable pnpm
RUN ls -la .
RUN pnpm install

EXPOSE 3050

CMD ["pnpm", "run", "start"]