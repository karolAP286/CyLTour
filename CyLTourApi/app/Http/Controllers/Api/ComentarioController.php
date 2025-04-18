<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Comentario;

class ComentarioController extends Controller
{
    public function index() {
        return Comentario::with("usuario")->get();
    }

    public function store(Request $request) {
        $request->validate([
            'puntuacion' => 'required|integer',
            'contenido' => 'nullable|string',
            'url_imagen' => 'nullable|string',
            'usuario_id' => 'required|exists:usuarios,id',
            'estado' => 'required|boolean',
            'monumento_id' => 'required|integer',
            'respuesta' => 'nullable|boolean'
        ]);

        return Comentario::create($request->all());
    }

    public function show($id) {
        return Comentario::findOrFail($id);
    }

    public function update(Request $request, $id) {
        $comentario = Comentario::findOrFail($id);
        $comentario->update($request->all());
        return $comentario;
    }

    public function destroy($id) {
        Comentario::destroy($id);
        return response(null, 204);
    }
}
