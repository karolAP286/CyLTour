<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\UsuarioController;
use App\Http\Controllers\Api\ComentarioController;
use App\Http\Controllers\Api\RespuestaController;
use App\Http\Controllers\Api\ConsultaController;

Route::prefix('v2')->group(function () {
    // Rutas públicas (sin autenticación)
    Route::post('/login', [ConsultaController::class, 'login']);
    Route::post('/register', [ConsultaController::class, 'register']);
    Route::get('monumentos/{id}/comentarios', [ConsultaController::class, 'comentariosPorMonumento']);
    Route::apiResource('comentarios', ComentarioController::class);
    Route::apiResource('respuestas', RespuestaController::class);


    // Rutas protegidas con Sanctum
    Route::middleware('auth:sanctum')->group(function () {
        Route::apiResource('roles', RoleController::class);
        Route::apiResource('usuarios', UsuarioController::class);
        Route::get('comentariosRechazados', [ConsultaController::class, 'comentariosRechazados']);
        Route::get('comentariosAprobados', [ConsultaController::class, 'comentariosAprobados']);
        Route::get('comentariosUsuario/{id}', [ConsultaController::class, 'comentariosPorUsuario']);
        Route::get('respuestasUsuario/{id}', [ConsultaController::class, 'respuestasPorUsuario']);
        Route::post('logout', [ConsultaController::class, 'logout']);
    });
});