<?php
return [

/*
|----------------------------------------------------------------------
| Cross-Origin Resource Sharing (CORS) Configuration
|----------------------------------------------------------------------
|
| Aquí puedes configurar los ajustes para compartir recursos entre orígenes
| o "CORS". Esto determina qué operaciones entre orígenes pueden ejecutarse
| en los navegadores web. Puedes ajustar esta configuración según sea necesario.
|
*/

'paths' => ['*'],  // Permite todas las rutas de la API y las rutas de la web

'allowed_methods' => ['*'],  // Permite todos los métodos HTTP (GET, POST, etc.)

'allowed_origins' => ['*'],  // Solo permite solicitudes de tu frontend en localhost:4200

'allowed_origins_patterns' => ['*'],  // Permite cualquier patrón de origen (si es necesario)

'allowed_headers' => ['*'],  // Permite todas las cabeceras HTTP

'exposed_headers' => [],  // Puedes exponer cabeceras si lo necesitas (no es necesario aquí)

'max_age' => 0,  // Configura el tiempo en que los resultados de CORS se cachean (en segundos)

'supports_credentials' => true,  // Permite el envío de credenciales (cookies y encabezados de autenticación)

];
