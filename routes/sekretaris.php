<?php

use App\Http\Controllers\Sekretaris\DataPeraturanController;
use App\Http\Controllers\Sekretaris\DataSantriController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {

        Route::controller(DataSantriController::class)->group(function () {
                Route::get('data-santri', 'index')->name('data-santri');
        });

        Route::controller(DataPeraturanController::class)->group(function () {
                Route::get('data-peraturan', 'index')->name('data-peraturan');
                Route::post('data-peraturan', 'simpan')->name('data-peraturan.simpan');
                Route::delete('data-peraturan', 'hapus')->name('data-peraturan.hapus');
        });
});
