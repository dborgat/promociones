<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\PromotionalCodeController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

Route::prefix('api')->group(function () {
    Route::post('/register', [RegisteredUserController::class, 'store']);
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth:sanctum');
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('/user', [AuthenticatedSessionController::class, 'me']);
        Route::get('/offers', [OfferController::class, 'getOffers']);
        Route::post('/offers/{offer}/generate-code', [PromotionalCodeController::class, 'generate']);
        Route::get('/promotional-codes', [PromotionalCodeController::class, 'promotionalCodeList']);
        Route::get('/count-promotional-codes', [PromotionalCodeController::class, 'countPromotionalCodes']);
        Route::post('/promotional-codes/{code}/redeem', [PromotionalCodeController::class, 'redeem']);
    });
});

Route::get('/{any}', function () {
    return view('index');
})->where('any', '.*');
