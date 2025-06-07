# Stage 1: build
FROM node:18 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: copiar solo el build al host (opcional)
FROM busybox:1.34.1-uclibc

WORKDIR /output
COPY --from=build /app/build ./build

# Solo para copiar el build fuera del contenedor
