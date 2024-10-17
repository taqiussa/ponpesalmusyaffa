<?php

namespace App\Http\Controllers\Sekretaris;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TambahDataPenggunaController extends Controller
{
    public function index()
    {
        return inertia('Sekretaris/TambahDataPengguna', [
            'listUser' => User::query()
                ->whereNotNull('username')
                ->with(['roles'])
                ->orderBy('name')
                ->get()
        ]);
    }

    public function simpan()
    {
        $validated = request()->validate([
            'name' => 'required',
            'username' => 'required',
            'password' => 'required|confirmed'
        ]);

        DB::beginTransaction();
        $validated['password'] = bcrypt(request('password'));
        try {
            User::create($validated);
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
