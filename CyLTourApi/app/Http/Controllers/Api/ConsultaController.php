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
            'password' => 'required|string',
        ]);

        $usuario = Usuario::where('correo', $request->correo)->first();

        if ($usuario && Hash::check($request->password, $usuario->password)) {
            // Crear token
            $token = $usuario->createToken('token-personal')->plainTextToken;

            return response()->json([
                'success' => true,
                'user' => $usuario,
                'token' => $token,
            ]);
        } else {
            return response()->json(['success' => false, 'message' => 'Credenciales inválidas'], 401);
        }
    }

    public function register(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string',
            'fecha_nacimiento' => 'required|date',
            'dni' => 'nullable|string|unique:usuarios,dni',
            'correo' => 'required|email|unique:usuarios,correo',
            'password' => 'required|string|min:6'
        ]);

        $data = $request->all();
        $data['password'] = bcrypt($data['password']);
        $data['rol_id'] = 2; // Rol de usuario normal

        return Usuario::create($data);
    }
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['success' => true, 'message' => 'Sesión cerrada correctamente.']);
    }
}