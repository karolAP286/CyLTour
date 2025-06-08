# CyLTour API

This is the backend API for the CyLTour project, built with Laravel.

## Requisitos

- PHP >= 8.4
- Composer
- MySQL/MariaDB
- XAMPP (opcional, para entorno local)

## Instalación

1. Clona el repositorio o copia los archivos en tu servidor local.
2. Instala las dependencias de PHP:
    ```
    composer install
    ```
3. Configura tus variables en el archivo .env, si no lo tienes creado copia el archivo .env.example en .env y modificalo:
    ```
    cp .env.example .env
    ```
4. Genera la clave de la aplicación:
    ```
    php artisan key:generate
    ```
5. Configura la conexión a la base de datos en el archivo `.env`.
6. Ejecuta las migraciones:
    ```
    php artisan migrate
    ```

## Uso

- Inicia el servidor de desarrollo:
    ```
    php artisan serve
    ```
- La API estará disponible en `http://localhost:8081/api/v2`.

## Endpoints de la API CyLTour

### Autenticación y usuarios

| Método | Ruta                        | Descripción                        | Autenticación |
|--------|-----------------------------|------------------------------------|---------------|
| POST   | /api/v2/login               | Login de usuario                   | No            |
| POST   | /api/v2/register            | Registro de usuario                | No            |
| POST   | /api/v2/logout              | Cerrar sesión                      | Sí            |

### Usuarios

| Método | Ruta                        | Descripción                        | Autenticación |
|--------|-----------------------------|------------------------------------|---------------|
| GET    | /api/v2/usuarios            | Listar usuarios                    | Sí            |
| POST   | /api/v2/usuarios            | Crear usuario                      | Sí            |
| GET    | /api/v2/usuarios/{id}       | Obtener usuario por ID             | Sí            |
| PUT    | /api/v2/usuarios/{id}       | Actualizar usuario                 | Sí            |
| DELETE | /api/v2/usuarios/{id}       | Eliminar usuario                   | Sí            |

### Roles

| Método | Ruta                        | Descripción                        | Autenticación |
|--------|-----------------------------|------------------------------------|---------------|
| GET    | /api/v2/roles               | Listar roles                       | Sí            |
| POST   | /api/v2/roles               | Crear rol                          | Sí            |
| GET    | /api/v2/roles/{id}          | Obtener rol por ID                 | Sí            |
| PUT    | /api/v2/roles/{id}          | Actualizar rol                     | Sí            |
| DELETE | /api/v2/roles/{id}          | Eliminar rol                       | Sí            |

### Comentarios

| Método | Ruta                                      | Descripción                                 | Autenticación |
|--------|-------------------------------------------|---------------------------------------------|---------------|
| GET    | /api/v2/comentarios                       | Listar comentarios                          | No            |
| POST   | /api/v2/comentarios                       | Crear comentario                            | Si            |
| GET    | /api/v2/comentarios/{id}                  | Obtener comentario por ID                   | No            |
| PUT    | /api/v2/comentarios/{id}                  | Actualizar comentario                       | Si            |
| DELETE | /api/v2/comentarios/{id}                  | Eliminar comentario                         | Si            |
| GET    | /api/v2/monumentos/{id}/comentarios       | Listar comentarios de un monumento          | No            |
| GET    | /api/v2/comentariosAprobados              | Listar comentarios aprobados                | No            |
| GET    | /api/v2/comentariosRechazados             | Listar comentarios rechazados               | Si            |
| GET    | /api/v2/comentariosUsuario/{id}           | Listar comentarios de un usuario            | Si            |

### Respuestas

| Método | Ruta                            | Descripción                        | Autenticación |
|--------|---------------------------------|------------------------------------|---------------|
| GET    | /api/v2/respuestas              | Listar respuestas                  | No            |
| POST   | /api/v2/respuestas              | Crear respuesta                    | Si            |
| GET    | /api/v2/respuestas/{id}         | Obtener respuesta por ID           | No            |
| PUT    | /api/v2/respuestas/{id}         | Actualizar respuesta               | Si            |
| DELETE | /api/v2/respuestas/{id}         | Eliminar respuesta                 | Si            |
| GET    | /api/v2/respuestasUsuario/{id}  | Listar respuestas de un usuario    | Si            |

---

**Notas:**
- Los endpoints marcados con "Sí" en autenticación requieren un token Bearer de Laravel Sanctum.
- Los endpoints pueden cambiar según la configuración de tus controladores y middleware.
- Las rutas están bajo el prefijo `/api/v2/`.

---

## Notas

- Las rutas de la API están definidas en `routes/api.php`.
- Las contraseñas se almacenan de forma segura usando bcrypt.
- Para desarrollo local, puedes usar XAMPP y configurar la base de datos en `phpMyAdmin`.

---

**CyLTour API**  
Desarrollado con Laravel
