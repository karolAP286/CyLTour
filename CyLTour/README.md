# CyLTour Frontend

Este es el frontend de CyLTour, una aplicación web desarrollada con **React**, **TypeScript** y **Vite**. Permite a los usuarios explorar monumentos, dejar comentarios, registrarse, iniciar sesión y gestionar su perfil. Incluye paneles de usuario y administración.

## Requisitos

- Node.js >= 18
- npm >= 9 (o yarn/pnpm)
- Acceso a la API backend de CyLTour (ver carpeta CyLTourApi)

## Instalación

1. Clona el repositorio o copia los archivos en tu entorno local.
2. Instala las dependencias:
    ```
    npm install
    ```
3. (Opcional) Configura variables de entorno si tu API no está en `http://localhost:8081/api/v2`.

## Uso en desarrollo

Inicia el servidor de desarrollo con:
```
npm run dev
```
La aplicación estará disponible en [http://localhost:443](http://localhost:443).

## Scripts principales

- `npm run dev` — Inicia el servidor de desarrollo.
- `npm run build` — Genera la versión de producción.
- `npm run preview` — Previsualiza la build de producción.
- `npm run lint` — Ejecuta ESLint.

## Estructura del proyecto

- `/src/components` — Componentes reutilizables (monumentos, usuario, admin, etc.)
- `/src/services` — Servicios para consumir la API.
- `/src/types` — Tipos TypeScript.
- `/src/hooks` — Hooks personalizados.
- `/public/img` — Imágenes de provincias.

## Funcionalidades principales

- **Exploración de monumentos** por provincia y detalle.
- **Comentarios y respuestas** en monumentos.
- **Registro e inicio de sesión** de usuarios.
- **Gestión de perfil** y cambio de contraseña.
- **Panel de usuario**: ver y editar perfil, comentarios y respuestas.
- **Panel de administración**: gestión de usuarios, comentarios y generación de QR.

## Variables de entorno

Si necesitas cambiar la URL de la API, edita el valor en `.env`:

| **Name**                                 | **Description**        | **Default**                     |
| ---------------------------------------- | ---------------------- | ------------------------------- |
| **VITE_API_BASE_URL**                    | Url base para API      | [http://187.33.156.209:8081/api/v2  ](http://187.33.156.209:8081/api/v2)  |

---

**CyLTour** — Proyecto de turismo cultural de Castilla y León.
