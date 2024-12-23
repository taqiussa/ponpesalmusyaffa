<?php

use App\Http\Controllers\Sekretaris\DataAlumniController;
use App\Http\Controllers\Sekretaris\DataPenggunaController;
use App\Http\Controllers\Sekretaris\DataPeraturanController;
use App\Http\Controllers\Sekretaris\DataSantriController;
use App\Http\Controllers\Sekretaris\InputDataAlumniController;
use App\Http\Controllers\Sekretaris\TambahDataAlumniController;
use App\Http\Controllers\Sekretaris\TambahDataPenggunaController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {

        Route::controller(DataAlumniController::class)->group(function () {
                Route::get('data-alumni', 'index')->name('data-alumni');
        });

        Route::controller(DataPenggunaController::class)->group(function () {
                Route::get('data-pengguna', 'index')->name('data-pengguna');
                Route::get('data-pengguna/{id}', 'edit')->name('data-pengguna.edit');
                Route::post('data-pengguna', 'simpan')->name('data-pengguna.simpan');
                Route::delete('data-pengguna', 'hapus')->name('data-pengguna.hapus');
        });

        Route::controller(DataPeraturanController::class)->group(function () {
                Route::get('data-peraturan', 'index')->name('data-peraturan');
                Route::post('data-peraturan', 'simpan')->name('data-peraturan.simpan');
                Route::delete('data-peraturan', 'hapus')->name('data-peraturan.hapus');
        });

        Route::controller(DataSantriController::class)->group(function () {
                Route::get('data-santri', 'index')->name('data-santri');
        });

        Route::controller(TambahDataAlumniController::class)->group(function(){
                Route::get('tambah-data-alumni', 'index')->name('tambah-data-alumni');
                Route::post('tambah-data-alumni', 'simpan')->name('tambah-data-alumni.simpan');
                Route::get('/provinces', [TambahDataAlumniController::class, 'getProvinces']);
                Route::get('/cities/{provinceCode}', [TambahDataAlumniController::class, 'getCities']);
                Route::get('/districts/{cityCode}', [TambahDataAlumniController::class, 'getDistricts']);
                Route::get('/villages/{districtCode}', [TambahDataAlumniController::class, 'getVillages']);
                // Route::get('provinces/{provinceCode}/cities', 'getCities');
                // Route::get('cities/{cityCode}/districts', 'getDistricts');
                // Route::get('districts/{districtCode}/villages', 'getVillages');
        });

        Route::controller(TambahDataPenggunaController::class)->group(function () {
                Route::get('tambah-data-pengguna', 'index')->name('tambah-data-pengguna');
                Route::post('tambah-data-pengguna', 'simpan')->name('tambah-data-pengguna.simpan');
                Route::delete('tambah-data-pengguna', 'hapus')->name('tambah-data-pengguna.hapus');
        });
});
