<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Role;

class RoleController extends Controller
{
    public function index() {
        return Role::all();
    }

    public function store(Request $request) {
        $request->validate(['rol' => 'required|string']);
        return Role::create($request->all());
    }

    public function show($id) {
        return Role::findOrFail($id);
    }

    public function update(Request $request, $id) {
        $role = Role::findOrFail($id);
        $role->update($request->all());
        return $role;
    }

    public function destroy($id) {
        Role::destroy($id);
        return response(null, 204);
    }
}
