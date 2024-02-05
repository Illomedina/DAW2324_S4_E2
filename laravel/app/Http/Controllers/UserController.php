<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    //Si el usuario es admin vera las opciones de editar, eliminar
    public function __invoke(){
       return "El usuario admin puede ver la lista de usuarios";
       
    }

    //métodos para controlar rutas
    public function index(){
        //return "Bienvenido a la sección de Usuarios";
        $users = User::all();
        return view('users.index', compact('users'));

    }

    public function create(){
        //return "En esta sección podrás crear un usuario";
        return view('users.create');
    }

    public function show($id){
        $user = User::find($id);
        return view('users.show', compact('user'));
    }
    
    public function showUser(){
        return view('user'); // Reemplaza 'your_react_view' con el nombre real de tu vista
    }

    public function store(Request $request){
        // Valida los datos del formulario
        $request->validate([
            'name' => 'required|string|max:50',
            'surname' => 'required|string|max:50',
            'user' => 'required|string|max:30',
            'password' => 'required|string|max:400',
            'email' => 'required|email|unique:users|max:255',
        ]);

        // Crea un nuevo usuario en la base de datos
        User::create($request->all());

        return redirect()->route('users.index')->with('success', 'Usuario creado exitosamente');
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
        User::find($id)->delete();

        return redirect()->route('users.index')->with('success', 'Usuario eliminado exitosamente');
    }
    

    
}
