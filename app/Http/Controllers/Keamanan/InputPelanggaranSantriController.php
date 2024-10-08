<?php

namespace App\Http\Controllers\Keamanan;

use App\Http\Controllers\Controller;
use App\InitTrait;
use App\Models\Pelanggaran;
use App\Models\PelanggaranSantri;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
        $validated = request()->validate([
            'nis' => 'required',
            'pelanggaran_id' => 'required',
            'tahun' => 'required',
            'tanggal' => 'required',
            'jumlah' => 'required',
        ]);
        $validated['user_id'] = auth()->user()->id;
        DB::beginTransaction();

        try {
            PelanggaranSantri::create($validated);
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
}
