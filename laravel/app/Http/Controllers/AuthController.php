<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Valida los datos del formulario
        $request->validate([
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'user' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:12',
        ]);

        // Crea un nuevo usuario en la base de datos
        $user = User::create([
            'name' => $request->name,
            'surname' => $request->surname,
            'user' => $request->user,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Genera un token de autenticación para el nuevo usuario
        $token = $user->createToken('authToken')->plainTextToken;

        // Retorna la respuesta con el usuario y el token
        return response()->json(['user' => $user, 'token' => $token], 201);
    }
}
