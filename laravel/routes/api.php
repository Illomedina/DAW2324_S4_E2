<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductControllerController;
use App\Http\Controllers\setting\SettingController;

use App\Http\Controllers\BenefitsController;

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

// SETTINGS
Route::resource('/settings', SettingController::class);
//Route::get('/settings', [SettingController::class, 'index'])->name('settings.index');
//Route::get('/settings/{id}', 'SettingController@show')->name('settings.show');

// CUSTOMERS
Route::get('/customers', [CustomerController::class, 'index']);
Route::post('/customers/create', [CustomerController::class, 'store']);

// BENEFITS
Route::get('/getBenefits', [BenefitsController::class, 'index']);
Route::delete('deleteBenefits/{id}', [BenefitsController::class, 'delete']);
Route::post('createBenefit', [BenefitsController::class, 'create']);
Route::post('UpdateBenefit', [BenefitsController::class, 'update']);
Route::get('getOneBenefit/{id}', [BenefitsController::class, 'getOne']);

// PRODUCTS
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::put('/products/{id}', [ProductController::class, 'update']);
