<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Usuario;

class UsuarioController extends Controller
{
    public function index() {
        return Usuario::with("rol")->get();
    }

    public function store(Request $request) {
        $request->validate([
            'rol_id' => 'required|integer|exists:roles,id',
            'nombre' => 'required|string',
            'fecha_nacimiento' => 'required|date',
            'dni' => 'nullable|string|unique:usuarios,dni',
            'correo' => 'required|email|unique:usuarios,correo',
            'contraseña' => 'required|string|min:6'
        ]);

        $data = $request->all();
        $data['contraseña'] = bcrypt($data['contraseña']);
        return Usuario::create($data);
    }

    public function show($id) {
        return Usuario::findOrFail($id);
    }

    public function update(Request $request, $id) {
        $usuario = Usuario::findOrFail($id);
        $usuario->update($request->except('contraseña'));
        return $usuario;
    }

    public function destroy($id) {
        Usuario::destroy($id);
        return response(null, 204);
    }
}
