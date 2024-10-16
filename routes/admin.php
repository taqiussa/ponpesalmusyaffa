<?php

use App\Http\Controllers\Admin\AturRoleController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
        Route::controller(AturRoleController::class)->group(function () {
                Route::get('atur-role', 'index')->name('atur-role');
                Route::post('atur-role', 'simpan')->name('atur-role.simpan');
                Route::delete('atur-role', 'hapus')->name('atur-role.hapus');
        });
});
