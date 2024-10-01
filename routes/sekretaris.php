<?php

use App\Http\Controllers\Sekretaris\DataSantriController;
use Illuminate\Support\Facades\Route;

Route::controller(DataSantriController::class)->group(function () {
        Route::get('data-santri', 'index')->name('data-santri');
});
