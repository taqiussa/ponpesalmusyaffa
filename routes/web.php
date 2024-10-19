<?php

use App\Http\Controllers\Auth\ProfilePenggunaController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/',function(){
    return inertia('LandingPage');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    Route::controller(ProfilePenggunaController::class)->group(function(){
        Route::get('profile-pengguna', 'index')->name('profil-pengguna');
        Route::post('profile-pengguna/password', 'password')->name('profil-pengguna.password');
        Route::post('profile-pengguna/nama', 'nama')->name('profil-pengguna.nama');
        Route::post('profile-pengguna/foto', 'foto')->name('profil-pengguna.foto');

    });


    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/keamanan.php';
require __DIR__ . '/sekretaris.php';
