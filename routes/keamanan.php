<?php

use App\Http\Controllers\Keamanan\DataPelanggaranSantriController;
use App\Http\Controllers\Keamanan\InputPelanggaranSantriController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:Keamanan'])->group(function () {

        Route::controller(DataPelanggaranSantriController::class)->group(function () {
                Route::get('data-pelanggaran-santri', 'index')->name('data-pelanggaran-santri');
                Route::delete('data-pelanggaran-santri', 'hapus')->name('data-pelanggaran-santri.hapus');
        });

        Route::controller(InputPelanggaranSantriController::class)->group(function () {
                Route::get('input-pelanggaran-santri', 'index')->name('input-pelanggaran-santri');
                Route::post('input-pelanggaran-santri', 'simpan')->name('input-pelanggaran-santri.simpan');
                Route::delete('input-pelanggaran-santri', 'hapus')->name('input-pelanggaran-santri.hapus');
        });
});
