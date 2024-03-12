<?php

namespace App\Http\Controllers;
//Request proporciona métodos para examinar la solicitud HTTP

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\Models\User;
use Carbon\Exceptions\Exception;
use Illuminate\Support\Facades\Gate;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    //métodos para controlar rutas
    public function index()
    {
        try {
            $users = User::all();
            return response()->json($users, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'error getting the configuration'], 500);
        }
    }


    public function create()
    {
        //muestra el formulario para crear usuarios
        return view('users.create');
    }

    public function show($id)
    {
        //Encuentra el id del usuario
        try {
            $user = User::find($id);
            return $user;
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Configuration not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'error getting the configuration'], 500);
        }
    }


    public function store(Request $request)
    {
        $user = User::create([
            'idRole' => 1,
            'name' => $request->name,
            'surname' => $request->surname,
            'user' => $request->user,
            'email' => $request->email,
            'password' => $request->password,
        ]);

        // return the user and response code
        return response()->json($user, 201);
    }


    public function update(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);
            $user->name = $request->name;
            $user->surname = $request->surname;
            $user->user = $request->user;
            $user->email = $request->email;
            $user->save();
            return $user;
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Configuración no encontrada.'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al actualizar la configuración.'], 501);
        }
    }

    public function destroy($id)
    {

        $user = User::destroy($id);
        return $user;
    }
}
