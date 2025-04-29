<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\UsuarioController;
use App\Http\Controllers\Api\ComentarioController;
use App\Http\Controllers\Api\RespuestaController;

Route::prefix('api/v1')->group(function () {
    Route::apiResource('roles', RoleController::class);
    Route::apiResource('usuarios', UsuarioController::class);
    Route::apiResource('comentarios', ComentarioController::class);
    Route::apiResource('respuestas', RespuestaController::class);
});