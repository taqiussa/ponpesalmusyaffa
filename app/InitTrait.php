<?php

namespace App;

use Carbon\Carbon;

trait InitTrait
{
    public function data_tahun()
    {
        $tahunIni = Carbon::now()->year;

        if (Carbon::now()->lte(Carbon::createFromDate($tahunIni, 7, 14))) {
            $tahunAjaran = ($tahunIni - 1) . ' / ' . $tahunIni;
        } else {
            $tahunAjaran = $tahunIni . ' / ' . ($tahunIni + 1);
        }

        return $tahunAjaran; // Should return "2025 / 2026"
    }
}
