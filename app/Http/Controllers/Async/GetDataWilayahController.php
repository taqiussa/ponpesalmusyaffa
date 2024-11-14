<?php

namespace App\Http\Controllers\Async;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Laravolt\Indonesia\Models\Kabupaten;
use Laravolt\Indonesia\Models\Kecamatan;
use Laravolt\Indonesia\Models\Village;

class GetDataWilayahController extends Controller
{
    public function kabupaten()
    {
        return response()->json(
            [
                'listKabupaten' => Kabupaten::whereProvinceCode(request('provinceCode'))
                    ->orderBy('name')
                    ->get()
            ]
        );
    }

    public function kecamatan()
    {
        return response()->json(
            [
                'listKecamatan' => Kecamatan::whereCityCode(request('cityCode'))
                    ->orderBy('name')
                    ->get()
            ]
        );
    }

    public function desa()
    {
        return response()->json(
            [
                'listDesa' => Village::whereDistrictCode(request('districtCode'))
                    ->orderBy('name')
                    ->get()
            ]
        );
    }
}
