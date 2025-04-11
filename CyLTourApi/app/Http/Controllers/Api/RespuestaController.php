<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Respuesta;

class RespuestaController extends Controller
{
    public function index() {
        return Respuesta::all();
    }

    public function store(Request $request) {
        $request->validate([
            'comentario_id' => 'required|exists:comentarios,id',
            'contenido' => 'required|string',
            'usuario_id' => 'required|exists:usuarios,id'
        ]);

        return Respuesta::create($request->all());
    }

    public function show($id) {
        return Respuesta::findOrFail($id);
    }

    public function update(Request $request, $id) {
        $respuesta = Respuesta::findOrFail($id);
        $respuesta->update($request->all());
        return $respuesta;
    }

    public function destroy($id) {
        Respuesta::destroy($id);
        return response(null, 204);
    }
}
