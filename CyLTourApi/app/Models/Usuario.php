<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    use HasFactory;

    protected $table = 'usuarios';
    protected $fillable = [
        'rol_id', 'nombre', 'fecha_nacimiento', 'dni', 'correo', 'contraseña'
    ];

    protected $hidden = [
        'contraseña'
    ];

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
