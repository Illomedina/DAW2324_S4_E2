<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\BenefitsController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderDetailsController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [AuthController::class, 'login']);

//Group of routes that are authenticated through auth:sanctum
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/getBenefits', [BenefitsController::class, 'index']);
    Route::get('/getAllYears', [BenefitsController::class, 'getAllYears']);
    Route::delete('deleteBenefits/{id}', [BenefitsController::class, 'delete']);
    Route::post('createBenefit', [BenefitsController::class, 'create']);
    Route::post('UpdateBenefit', [BenefitsController::class, 'update']);
    Route::get('getOneBenefit/{id}', [BenefitsController::class, 'getOne']);
    Route::get('getBenefitsByYear/{year}', [BenefitsController::class, 'getBenefitsByYear']);
    // PRODUCTS
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{id}', [ProductController::class, 'show']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    // SETTINGS
    Route::resource('/settings', SettingController::class);
    // CUSTOMERS
    Route::get('/customers', [CustomerController::class, 'index'])->name('customers.index');
    Route::post('/customers/create', [CustomerController::class, 'store'])->name('customers.store');
    Route::put('/customers/{id}', [CustomerController::class, 'update'])->name('customers.update');
    Route::delete('/customers/{id}', [CustomerController::class, 'destroy'])->name('customers.destroy');

    Route::get('/users', [UserController::class, 'index']);

    //Route to edit 
    Route::put('/users/{id}', [UserController::class, 'update']);

    // Route to create 
    Route::post('/createUser',  [UserController::class, 'store']);      

    //Ruta para eliminar un usuario
    Route::delete('users/{id}', [UserController::class, 'destroy']);

    Route::get('/users/{id}', [UserController::class, 'show']);

});

// ORDERS
Route::get('/orders', [OrderController::class, 'index']);
Route::get('/OrderDetails', [OrderDetailsController::class, 'index']);
Route::get('/OrderDetails/{id}', [OrderDetailsController::class, 'show']);
