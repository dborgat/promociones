<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\PromotionalCodeController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth:sanctum');

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/offers', [OfferController::class, 'index']);
    Route::post('/offers/{offer}/generate-code', [PromotionalCodeController::class, 'generate']);
    Route::get('/promotional-codes', [PromotionalCodeController::class, 'index']);
    Route::post('/promotional-codes/{code}/redeem', [PromotionalCodeController::class, 'redeem']);
});

