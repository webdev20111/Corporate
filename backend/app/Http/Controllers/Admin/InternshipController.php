<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\InternshipApplication;

class InternshipController extends Controller
{

    public function index()
    {

        $internships = InternshipApplication::latest()->get();

        return view(
            'admin.internships.index',
            compact('internships')
        );

    }

    public function show($id)
    {

        $internship = InternshipApplication::findOrFail($id);

        return view(
            'admin.internships.show',
            compact('internship')
        );

    }

}
