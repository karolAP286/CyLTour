<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comentario extends Model
{
    use HasFactory;

    protected $table = 'comentarios';
    protected $fillable = [
        'puntuacion', 'contenido', 'url_imagen', 'usuario_id', 'estado', 'monumento_id', 'respuesta'
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class);
    }

    public function respuestas()
    {
        return $this->hasMany(Respuesta::class);
    }
}
