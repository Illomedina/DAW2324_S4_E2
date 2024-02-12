<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('user', function () {
    return view('user');
});

//Uso el controlador para mostrar diferentes vistas
//Si el usuario es admin podra tener opciones a eliminar usuarios.
//Route::get('/users', UserController::class, 'showUser');

// Ruta para mostrar los detalles de un usuario específico
//Route::get('/users/{id}', [UserController::class, 'show'])->name('users.show');

//Ruta para editar el usuario
//Route::get('/users/{id}/edit', [UserController::class, 'edit'])->name('users.edit');

// Ruta para mostrar el formulario de creación de usuarios
//Route::get('/users/create', [UserController::class, 'create'])->name('users.create');

// Ruta para almacenar un nuevo usuario
Route::post('/createUser', [UserController::class, 'store'])->name('users.store');

// routes/web.php
//Route::post('/users', 'UserController@store')->name('users.store');

// routes vista del formulario para crear usuarios
Route::view('/users/create', 'users.create')->name('users.create');


