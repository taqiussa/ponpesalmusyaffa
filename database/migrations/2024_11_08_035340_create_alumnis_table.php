<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('alumnis', function (Blueprint $table) {
            $table->id();
            $table->string('nama', 100);
            $table->string('jenis_kelamin', 2)->index();
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->string('nama_ayah', 100);
            $table->string('nama_ibu', 100);
            $table->string('rt', 4);
            $table->string('rw', 4);
            $table->string('desa', 100)->index();
            $table->string('kecamatan', 100)->index();
            $table->string('kabupaten', 100)->index();
            $table->string('provinsi', 100)->index();
            $table->string('telepon', 30);
            $table->string('status_nikah', 30);
            $table->string('status_pekerjaan', 30);
            $table->string('tahun_masuk', 30);
            $table->string('tingkat_terakhir', 100);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alumnis');
    }
};
