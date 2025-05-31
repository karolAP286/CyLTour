<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comentario extends Model
{
    use HasFactory;

    protected $table = 'comentarios';
    protected $casts = [
        'estado' => 'boolean',
    ];

    protected $fillable = [
        'puntuacion',
        'contenido',
        'url_imagen',
        'usuario_id',
        'monumento_id',
        'estado',
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
