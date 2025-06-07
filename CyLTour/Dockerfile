# Etapa 1: construir React
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: servir con Apache
FROM httpd:latest

COPY --from=build /app/build /usr/local/apache2/htdocs/

EXPOSE 80
CMD ["httpd-foreground"]
