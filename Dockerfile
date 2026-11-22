# Explorador de tarifas: Express sobre Node 24 LTS.
# Los ficheros (public/) NO van en la imagen: se montan del directorio que usa el FTP.
FROM node:24-alpine
ENV NODE_ENV=production PORT=3000
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund && npm cache clean --force
COPY . .
RUN mkdir -p public
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s CMD wget -q -O /dev/null http://127.0.0.1:3000/login || exit 1
CMD ["node", "index.js"]
