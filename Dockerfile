FROM node:20-bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

ENV PORT=8787
ENV HOST=0.0.0.0
ENV NODE_ENV=production
ENV DATA_DIR=/app/data

RUN mkdir -p /app/data /app/uploads

EXPOSE 8787
CMD ["node", "server/index.js"]
