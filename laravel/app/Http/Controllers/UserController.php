<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    //Si el usuario es admin vera las opciones de editar, eliminar
    public function __invoke(){
       return "El usuario admin puede ver la lista de usuarios";


    }

    //métodos para controlar rutas
    public function index(){
        return "Bienvenido a la sección de Usuarios";
    }

    public function create(){
        return "En esta sección podrás crear un usuario";
    }

    public function show(){
        return "Aquí podrás ver todos los usuarios de la sección de admin";
    }
    
    public function showUser()
    {
        return view('user'); // Reemplaza 'your_react_view' con el nombre real de tu vista
    }
    

    
}
