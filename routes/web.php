<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\PromotionalCodeController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/{any}', function () {
    return view('index');
})->where('any', '.*');


Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// API Routes
Route::prefix('api')->group(function () {
    Route::post('/register', [RegisteredUserController::class, 'store']);
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth:sanctum');
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('/offers', [OfferController::class, 'index']);
        Route::post('/offers/{offer}/generate-code', [PromotionalCodeController::class, 'generate']);
        Route::get('/promotional-codes', [PromotionalCodeController::class, 'index']);
        Route::post('/promotional-codes/{code}/redeem', [PromotionalCodeController::class, 'redeem']);
    });
});

require __DIR__ . '/auth.php';
