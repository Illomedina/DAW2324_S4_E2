<?php

namespace App\Http\Controllers;
//Request proporciona métodos para examinar la solicitud HTTP
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Gate;

class UserController extends Controller
{

    //métodos para controlar rutas
    public function index(){
        $users = User::all();

        return $users;
      
    }

    public function create(){
        //muestra el formulario para crear usuarios
        return view('users.create');
    }

    public function show($id){
        //Encuentra el id del usuario
        $user = User::find($id);

        // Verifica si el usuario existe
        if (!$user) {
            return redirect()->route('users.index')->with('error', 'Usuario no encontrado');
        }
        
        // Verifica si el usuario autenticado es el dueño del perfil o si es un administrador
        if (auth()->user()->id === $user->id) {
            // Devuelve la vista con el perfil del usuario
            return redirect()->route('users.index')->with('error', 'No tienes permiso para ver este perfil');
        } 

        return view('users.show', compact('user'));
    }
    
    public function showUser(){
        // Lógica para mostrar el perfil del usuario (puedes adaptarla según tus necesidades)
        //$user = auth()->user();
        //return view('users.show', compact('user'));
        return view('user'); // Reemplaza 'your_react_view' con el nombre real de tu vista
    }

    public function store(Request $request){
        $user = User::create([
            'idRole' =>1,
            'name' => $request->name,
            'surname' => $request->surname,
            'user' => $request->user,
            'email' => $request->email,
            'password' => $request->password,
        ]);

        $user->save();
    }

    public function edit($id){

        $user = User::find($id);
        return view('users.edit', compact('user'));
    }

    public function update(Request $request, $id){
        // Valida los datos del formulario
        $request->validate([
            'name' => 'required|string|max:50',
            'surname' => 'required|string|max:50',
            'user' => 'required|string|max:30',
            'password' => 'required|string|max:400',
            'email' => 'required|email|max:255|unique:users,email,' . $id,
        ]);

        // Actualiza el usuario en la base de datos
        User::find($id)->update($request->all());

        return redirect()->route('users.index')->with('success', 'Usuario actualizado exitosamente');
    }

    public function destroy($id)
    {
        // Elimina el usuario de la base de datos
        //User::find($id)->delete();
        $user = User::destroy($id);
        return $user;
        //return redirect()->route('users.index')->with('success', 'Usuario eliminado exitosamente');
    }
    

    
}
