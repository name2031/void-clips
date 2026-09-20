FROM node:20-alpine
WORKDIR /app
COPY server/package.json server/package-lock.json ./
RUN npm ci --omit=dev
COPY . .
ENV PORT=8787
ENV HOST=0.0.0.0
ENV PUBLIC_MODE=1
EXPOSE 8787
CMD ["node", "server/index.js"]
