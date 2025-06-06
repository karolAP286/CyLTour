# CyLTour

Proyecto completo de turismo cultural de Castilla y León.  
Incluye frontend (React + Vite), backend API (Laravel) y configuración para despliegue local con Docker.

---

## Estructura del proyecto

```
CyLTour/
│
├── CyLTour/           # Frontend (React + TypeScript + Vite)
├── CyLTourApi/        # Backend API (Laravel)
├── apache-config/     # Configuración de Apache y vhosts
├── docker-compose.yml # Orquestación de servicios Docker
└── README.md          # Este archivo
```

---

## Requisitos

- Docker y Docker Compose (recomendado para desarrollo local)
- O bien:
  - Node.js >= 18 y npm (para frontend)
  - PHP >= 8.0 y Composer (para backend)
  - MySQL/MariaDB

---

## Instalación rápida con Docker

1. Clona este repositorio:
    ```
    git clone https://github.com/karolAP286/CyLTour.git
    cd CyLTour
    ```
2. Inicia todos los servicios:
    ```
    docker-compose up --build
    ```
3. Accede a la aplicación:
    - Frontend: [http://localhost:3000](http://localhost:3000)
    - Backend API: [http://localhost:8000/api/v2](http://localhost:8000/api/v2)
    - phpMyAdmin (si lo añades): [http://localhost:8080](http://localhost:8080)

---

## Instalación manual

### Backend (Laravel)

1. Ve a la carpeta `CyLTourApi`:
    ```
    cd CyLTourApi
    ```
2. Instala dependencias:
    ```
    composer install
    ```
3. Copia y configura el archivo `.env`:
    ```
    cp .env.example .env
    ```
4. Genera la clave de la app:
    ```
    php artisan key:generate
    ```
5. Configura la base de datos en `.env` y ejecuta migraciones:
    ```
    php artisan migrate
    ```
6. Inicia el servidor:
    ```
    php artisan serve
    ```

### Frontend (React + Vite)

1. Ve a la carpeta `CyLTour`:
    ```
    cd CyLTour
    ```
2. Instala dependencias:
    ```
    npm install
    ```
3. Inicia el servidor de desarrollo:
    ```
    npm run dev
    ```

---

## Enlaces útiles

- [Documentación Backend/API](./CyLTourApi/README.md)
- [Documentación Frontend](./CyLTour/README.md)
- [Endpoints de la API](./CyLTourApi/README.md#endpoints-de-usuario)
- [Repositorio en GitHub](https://github.com/karolAP286/CyLTour)

---

## Endpoints principales

Consulta la documentación detallada de endpoints en [`CyLTourApi/README.md`](./CyLTourApi/README.md).

---
## Mas Información

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/karolAP286/CyLTour)


**CyLTour** — Proyecto de turismo cultural de Castilla y León.