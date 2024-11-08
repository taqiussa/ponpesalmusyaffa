<?php

namespace App\Http\Controllers\Sekretaris;

use App\Http\Controllers\Controller;
use App\Models\Alumni;
use Illuminate\Support\Facades\DB;

class TambahDataAlumniController extends Controller
{
    public function index()
    {
        return inertia('Sekretaris/TambahDataAlumni');
    }

    public function simpan()
    {
        $validated =   request()->validate(
            [
                'nama' => 'required',
                'jenis_kelamin' => 'required',
                'tempat_lahir' => 'required',
                'tanggal_lahir' => 'required',
                'nama_ayah' => 'nullable',
                'nama_ibu' => 'nullable',
                'rt' => 'required',
                'rw' => 'required',
                'desa' => 'required',
                'kecamatan' => 'required',
                'kabupaten' => 'required',
                'provinsi' => 'required',
                'status_nikah' => 'required',
                'status_pekerjaan' => 'required',
                'tahun_masuk' => 'nullable',
                'tingkat_terakhir' => 'nullable'
            ]
        );

        DB::beginTransaction();

        try {
            Alumni::create($validated);
            DB::commit();;
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
}
