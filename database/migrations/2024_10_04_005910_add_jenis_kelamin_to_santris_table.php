<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('santris', function (Blueprint $table) {
            $table->string('jenis_kelamin', 2)->nullable();
        });

        DB::statement(
            "   UPDATE santris
                JOIN users ON santris.nis = users.nis
                SET santris.jenis_kelamin = users.jenis_kelamin
            "
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('santris', function (Blueprint $table) {
            //
        });
    }
};
