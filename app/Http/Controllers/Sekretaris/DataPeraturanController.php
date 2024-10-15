<?php

namespace App\Http\Controllers\Sekretaris;

use App\Http\Controllers\Controller;
use App\Models\Pelanggaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DataPeraturanController extends Controller
{
    public function index()
    {
        return inertia('Sekretaris/DataPeraturan', [
            'listPeraturan' => Pelanggaran::query()
                ->orderBy('nama')
                ->get()
        ]);
    }

    public function simpan()
    {
        $validated = request()->validate([
            'nama' => 'required',
            'kategori' => 'required',
            'hukuman' => 'required'
        ]);

        DB::beginTransaction();

        try {
            Pelanggaran::create($validated);
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }

    public function hapus($id){
        DB::beginTransaction();
        try {
            Pelanggaran::destroy($id);
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
}
