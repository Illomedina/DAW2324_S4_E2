<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idRole')->nullable();
            $table->string('name', 50);
            $table->string('user', 50);
            $table->string('surname', 50);
            $table->string('password', 200);
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();

             //clave foranea
            //  $table->foreign('idRole')->references('id')->on('roles');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }


     /**
     * Update the existing record.
     */
    public function updateRecord(int $userId, array $data): void
    {
        // Utiliza el modelo User para actualizar el registro
        // Asegúrate de tener el modelo importado al principio del archivo

        // Primero, obtén el usuario que deseas actualizar
        $user = \App\Models\User::find($userId);

        // Verifica si el usuario existe
        if ($user) {
            // Actualiza los campos con los datos proporcionados
            $user->update($data);
        } else {
            // Puedes manejar la lógica en caso de que el usuario no exista
            // Por ejemplo, lanzar una excepción, loggear un mensaje, etc.
            // En este ejemplo, lanzaremos una excepción
            throw new \Exception("Usuario con ID $userId no encontrado.");
        }
    }
};
