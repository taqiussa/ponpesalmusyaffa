<?php

namespace App\Http\Controllers\Sekretaris;

use App\Http\Controllers\Controller;
use App\InitTrait;
use App\Models\Santri;
use App\Models\User;
use Illuminate\Http\Request;

class DataSantriController extends Controller
{
    use InitTrait;

    public function index()
    {
        $nis = [];

        if (request('search') != '' || request('search') != null) {
            $nis = User::query()
                ->whereNotNull('nis')
                ->where('name', 'like', '%' . request('search') . '%')
                ->pluck('nis');
        }

        return inertia('Sekretaris/DataSantri', [
            'initTahun' => $this->data_tahun(),
            'listSantri' => Santri::query()
                ->whereTahun(request('tahun') ?? $this->data_tahun())
                ->when(
                    request('jenis_kelamin'),
                    fn($q) => $q->whereJenisKelamin(request('jenis_kelamin'))
                )
                ->when(
                    request('search'),
                    fn($q) => $q->whereIn('nis', $nis)
                )
                ->with(['biodata', 'santri:nis,name'])
                ->paginate(10)
                ->withQueryString()
        ]);
    }
}
