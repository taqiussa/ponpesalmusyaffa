<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProfilePenggunaController extends Controller
{
    public function index()
    {
        return inertia('ProfilePengguna', [
            'user' => auth()->user()
        ]);
    }

    public function password()
    {
        request()->validate([
            'id' => 'required',
            'password' => 'required|confirmed',
        ]);

        DB::beginTransaction();

        try {
            User::find(request('id'))
                ->update([
                    'password' => bcrypt(request('password'))
                ]);
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }

    public function nama()
    {
        request()->validate([
            'id' => 'required',
            'name' => 'required'
        ]);

        DB::beginTransaction();

        try {
            User::find(request('id'))
                ->update([
                    'name' => request('name')
                ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
    public function nama()
    {
        request()->validate([
            'id' => 'required',
            'name' => 'required'
        ]);

        DB::beginTransaction();

        try {
            User::find(request('id'))
                ->update([
                    'name' => request('name')
                ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }

    public function foto()
    {
        request()->validate([
            'id' => 'required',
            'foto' => 'required|image|mimes:jpeg,png,jpg,gif,svg'
        ]);

        DB::beginTransaction();

        try {
            
            if (request()->hasFile('foto')) {
                $file = request()->file('foto');
                $filename = time() . '_' . $file->getClientOriginalName();
                $path = $file->storeAs('foto', $filename, 'public');

                User::find(request('id'))->update([
                    'foto' => $path
                ]);

                DB::commit();
            }
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }

    }
}
