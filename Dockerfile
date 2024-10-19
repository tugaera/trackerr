# Etapa 1: Build do frontend React
FROM node:16-alpine AS frontend
WORKDIR /app/frontend
COPY frontend/ .
RUN npm install && npm run build

# Etapa 2: Configuração do backend e bot
FROM node:16-alpine AS backend
WORKDIR /app/backend
COPY backend/ .
RUN npm install

# Etapa 3: Montagem final
FROM node:16-alpine
WORKDIR /app
COPY --from=frontend /app/frontend/build ./frontend
COPY --from=backend /app/backend .
RUN npm install pm2 -g

# Iniciar o MongoDB, Backend e Bot juntos
CMD ["pm2-runtime", "server.js", "bot.js"]
