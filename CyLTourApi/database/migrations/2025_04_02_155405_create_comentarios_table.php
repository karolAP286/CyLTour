<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up() {
        Schema::create('comentarios', function (Blueprint $table) {
            $table->id();
            $table->integer('puntuacion');
            $table->text('contenido');
            $table->string('url_imagen')->nullable();
            $table->foreignId('usuario_id')->constrained('usuarios')->onDelete('cascade');
            $table->boolean('estado');
            $table->integer('monumento_id');
            $table->timestamps();
        });
    }
    public function down() {
        Schema::dropIfExists('comentarios');
    }
};
