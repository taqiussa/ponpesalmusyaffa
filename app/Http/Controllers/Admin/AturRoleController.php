<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

class AturRoleController extends Controller
{
    public function index()
    {
        return inertia('Admin/AturRole', [
            'listRole' => Role::query()
                ->orderBy('name')
                ->get(),
            'listUser' => User::query()
                ->whereNotNull('username')
                ->with(['roles'])
                ->orderBy('name')
                ->get()
        ]);
    }

    public function simpan()
    {
        request()->validate([
            'role' => 'required',
            'user_id' => 'required'
        ]);

        DB::beginTransaction();

        try {
            $user = User::find(request('user_id'));
            $user->assignRole(request('role'));
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }

    public function hapus()
    {
        DB::beginTransaction();

        try {
            $user = User::find(request('id')[0]);
            $user->removeRole(request('id')[1]);
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
}
