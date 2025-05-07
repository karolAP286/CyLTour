<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Comentario;

class ConsultaController extends Controller
{
    // Comentarios por monumento con sus respuestas
    public function comentariosPorMonumento($monumento_id)
    {
        $comentarios = Comentario::with(['usuario', 'respuestas.usuario'])
            ->where('monumento_id', $monumento_id)
            ->where('estado', true)
            ->get();

        return response()->json($comentarios);
    }

    // Comentarios aprobados (estado = true)
    public function comentariosAprobados()
    {
        $comentarios = Comentario::with('usuario')
            ->where('estado', 1)
            ->get();

        return response()->json($comentarios);
    }

    // Comentarios rechazados (estado = false)
    public function comentariosRechazados()
    {
        $comentarios = Comentario::with('usuario')
            ->where('estado', 0)
            ->get();

        return response()->json($comentarios);
    }
}
