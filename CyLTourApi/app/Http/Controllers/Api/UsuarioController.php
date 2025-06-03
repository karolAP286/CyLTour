<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Usuario;

class UsuarioController extends Controller
{
    public function index()
    {
        return Usuario::with("rol")->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'rol_id' => 'required|integer|exists:roles,id',
            'nombre' => 'required|string',
            'fecha_nacimiento' => 'required|date',
            'dni' => 'nullable|string|unique:usuarios,dni',
            'correo' => 'required|email|unique:usuarios,correo',
            'password' => 'required|string|min:6'
        ]);

        $data = $request->all();
        $data['password'] = bcrypt($data['password']);
        return Usuario::create($data);
    }

    public function show($id)
    {
        return Usuario::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $usuario = Usuario::findOrFail($id);

        $data = $request->all();

        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }

        $usuario->update($data);

        return response()->json($usuario, 200);
    }


    public function destroy($id)
    {
        Usuario::destroy($id);
        return response(null, 204);
    }
}
