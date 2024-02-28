<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\Benefits;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller {

    //metodo que se encarga de hacer el login, este metodo llama a login request el cual tiene unas reglas de validacion y se encarga de validar lo que recibe de request
    public function login(LoginRequest $request) {
        //si los datos son validados
        $data = $request->validated();
        //se realiza query que es equivalente a SELECT * FROM users WHERE user = 'data[user]' 
        $user = User::where('user', $data['user'])->first();
        //se comprueba que la conteraseña es correcta
        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json([
                //en caso de que no sea correcto devuelve mensaje
                'message' => 'username or password is incorrect!'
            ], 401);
        }
        //si todo es correcto generamos token
        $token = $user->createToken('auth_token')->plainTextToken;

        // $cookie = cookie('token', $token, 60 * 24); // 1 day

        return response()->json([
            //En la respuesta devolvemos usuario y token
            'user' => new UserResource($user),
            'token' => $token 
        ]);
    }

    //Este metodo gestiona el logout
    public function logout(Request $request) {
        //recibe el usuario de rquest y elmina si token de acceso
        $request->user()->currentAccessToken()->delete();
        //olvida cookie con el token
        $cookie = cookie()->forget('token');

        return response()->json([
            //retornamos mensaje para indicar que el login ha sido correcto
            'message' => 'Logged out successfully!'
        ])->withCookie($cookie);
    }

    //metodo que retorna usuario, este metodo lo uso para comprovar que el usuario se ha creado correctamente
    public function user(Request $request) {
        return new UserResource($request->user());
    }

}