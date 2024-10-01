<?php

namespace App\Http\Controllers\Sekretaris;

use App\Http\Controllers\Controller;
use App\InitTrait;
use App\Models\Santri;
use Illuminate\Http\Request;

class DataSantriController extends Controller
{
    use InitTrait;

    public function index()
    {
        return inertia('Sekretaris/DataSantri', [
            'initTahun' => $this->data_tahun(),
            'listSantri' => Santri::query()
                ->whereTahun(request('tahun') ?? $this->data_tahun())
                ->when(
                    request('jenis_kelamin'),
                    fn($q) => $q->whereJenisKelamin
                )
                ->with(['biodata', 'santri:nis,name'])
                ->paginate(10)
                ->withQueryString()
        ]);
    }
}
