<?php

namespace App;

use App\Models\Santri;
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

    public function list_all_santri()
    {
        return Santri::query()
            ->whereTahun(request('tahun') ?? $this->data_tahun())
            ->when(
                request('jenis_kelamin'),
                fn($q) => $q->whereJenisKelamin(request('jenis_kelamin'))
            )
            ->with(['santri:nis,name'])
            ->get()
            ->sortBy('santri.name')
            ->values();
    }
}
