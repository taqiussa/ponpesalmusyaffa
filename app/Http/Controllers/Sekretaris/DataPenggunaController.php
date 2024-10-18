<?php

namespace App\Http\Controllers\Sekretaris;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DataPenggunaController extends Controller
{
    public function index()
    {
        return inertia('Sekretaris/DataPengguna', [
            'listUser' => User::query()
                ->whereNotNull('username')
                ->with(['roles'])
                ->orderBy('name')
                ->get()
        ]);
    }

    public function edit($id)
    {
        return inertia(
            'Sekretaris/EditDataPengguna',
            [
                'user' => User::find($id)
            ]
        );
    }

    public function simpan()
    {
        request()->validate([
            'id' => 'required',
            'name' => 'required',
            'username' => 'required'
        ]);

        DB::beginTransaction();

        try {
            User::find(request('id'))
                ->update([
                    'username' => request('username'),
                    'name' => request('name')
                ]);
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }

    public function hapus()
    {
        request()->validate(['id' => 'required']);

        DB::beginTransaction();

        try {
            User::destroy(request('id'));
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
}
