<?php

use App\Http\Controllers\Sekretaris\DataSantriController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {

        Route::controller(DataSantriController::class)->group(function () {
                Route::get('data-santri', 'index')->name('data-santri');
        });
});
