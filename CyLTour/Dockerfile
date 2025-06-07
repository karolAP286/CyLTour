# React frontend - producción
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# 👇 Pasar la variable de entorno de Docker ARG a ENV para que Vite la vea
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# 👇 Aumenta el heap de Node.js para prevenir errores de memoria en el build
ENV NODE_OPTIONS=--max-old-space-size=2048

RUN npm run build
