<?php

namespace App\Http\Controllers\Keamanan;

use App\Http\Controllers\Controller;
use App\InitTrait;
use App\Models\Pelanggaran;
use Illuminate\Http\Request;

class InputPelanggaranSantriController extends Controller
{
    use InitTrait;

    public function index()
    {
        return inertia('Keamanan/InputPelanggaranSantri', [
            'initTahun' => $this->data_tahun(),
            'listSantri' => $this->list_all_santri(),
            'listPeraturan' => Pelanggaran::query()
                ->orderBy('nama')
                ->get()
        ]);
    }

    public function simpan()
    {
        request()->validate([
            'nis' => 'required',
        ]);
    }
}
