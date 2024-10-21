<?php

namespace App\Http\Controllers\Sekretaris;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DataAlumniController extends Controller
{
    public function index()
    {
        return inertia('Sekretaris/DataAlumni');
    }
}
