<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Respuesta extends Model
{
    use HasFactory;

    protected $table = 'respuestas';
    protected $fillable = ['comentario_id', 'contenido', 'usuario_id'];

    public function comentario()
    {
        return $this->belongsTo(Comentario::class);
    }

    public function usuario()
    {
        return $this->belongsTo(Usuario::class);
    }
}
