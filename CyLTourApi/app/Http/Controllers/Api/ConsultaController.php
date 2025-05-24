<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Comentario;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;

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
    public function login(Request $request)
    {
        $request->validate([
            'correo' => 'required|email',
            'contraseña' => 'required|string'
        ]);

        $usuario = Usuario::where('correo', $request->correo)->first();

        if ($usuario && Hash::check($request->contraseña, $usuario->contraseña)) {
            return response()->json(['success' => true]);
        } else {
            return response()->json(['success' => false], 401);
        }
    }
}
