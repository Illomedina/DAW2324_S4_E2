<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BenefitsController;
use App\Http\Controllers\UserController;
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

Route::get('/products', [ProductController::class, 'index']);
Route::get('/customers', [CustomerController::class, 'index']);
Route::get('/getBenefits', [BenefitsController::class, 'index']);
Route::delete('deleteBenefits/{id}', [BenefitsController::class, 'delete']);
Route::post('createBenefit', [BenefitsController::class, 'create']);
Route::post('UpdateBenefit', [BenefitsController::class, 'update']);
Route::get('getOneBenefit/{id}', [BenefitsController::class, 'getOne']);

// Ruta para el crear un usuario
Route::post('createUser',  [UserController::class, 'store']);
//Ruta para eliminar un usuario
//Route::delete('delete/{id}', [UserController::class, 'delete']);
