<?php

use App\Http\Controllers\Keamanan\InputPelanggaranSantriController;
use Illuminate\Support\Facades\Route;

Route::controller(InputPelanggaranSantriController::class)->group(function(){
        Route::get('input-pelanggaran-santri', 'index')->name('input-pelanggaran-santri');
        Route::post('input-pelanggaran-santri','simpan')->name('input-pelanggaran-santri.simpan');
});