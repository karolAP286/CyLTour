<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable; // CAMBIO CLAVE
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable // CAMBIO CLAVE
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'usuarios';

    protected $fillable = [
        'rol_id',
        'nombre',
        'fecha_nacimiento',
        'dni',
        'correo',
        'password'
    ];

    protected $hidden = [
        'password',
        'remember_token', // opcional si llegas a usarlo
    ];

    // 🔁 Relaciones
    public function rol()
    {
        return $this->belongsTo(Role::class);
    }

    public function comentarios()
    {
        return $this->hasMany(Comentario::class);
    }

    public function respuestas()
    {
        return $this->hasMany(Respuesta::class);
    }
}
