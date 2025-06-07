# Stage 1: Build
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build   
# esto genera /app/dist o /app/build según configuración

# Stage 2: Production image
FROM node:18 AS frontend

WORKDIR /output
COPY --from=build /app/dist ./dist   
# o /app/build según configuración

# Aquí podrías copiar a un volumen o servir con nginx/apache
