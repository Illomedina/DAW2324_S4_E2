<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductControllerController;
use App\Http\Controllers\setting\SettingController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\BenefitsController;
use App\Http\Controllers\UserController;
/*
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/test', function () {
    return response()->json([
        'message' => 'Hello World!',
    ]);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



Route::resource('/settings', SettingController::class);
//Route::get('/settings', [SettingController::class, 'index'])->name('settings.index');
//Route::get('/settings/{id}', 'SettingController@show')->name('settings.show');

Route::get('/customers', [CustomerController::class, 'index']);
Route::post('/customers/create', [CustomerController::class, 'store']);
Route::put('/customers/{id}', [CustomerController::class, 'update']);
Route::delete('/customers/{id}', [CustomerController::class, 'destroy']);

Route::get('/products/{id}', [ProductController::class, 'show']);


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/getBenefits', [AuthController::class, 'getAll']);
    Route::delete('deleteBenefits/{id}', [BenefitsController::class, 'delete']);
    Route::post('createBenefit', [BenefitsController::class, 'create']);
    Route::post('UpdateBenefit', [BenefitsController::class, 'update']);
    Route::get('getOneBenefit/{id}', [BenefitsController::class, 'getOne']);
});

Route::get('/users', [UserController::class, 'index']);

// Ruta para el crear un usuario
Route::post('createUser',  [UserController::class, 'store']);
//Ruta para eliminar un usuario
Route::delete('users/{id}', [UserController::class, 'destroy']);
// PRODUCTS
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::put('/products/{id}', [ProductController::class, 'update']);
