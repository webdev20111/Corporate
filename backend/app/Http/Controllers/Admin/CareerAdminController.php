<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CareerApplication;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class CareerAdminController extends Controller
{
    public function index(): View
    {
        $applications = CareerApplication::query()
            ->latest('submitted_at')
            ->paginate(20);

        return view('admin.careers.index', compact('applications'));
    }

    public function show(CareerApplication $careerApplication): View
    {
        return view('admin.careers.show', [
            'application' => $careerApplication,
        ]);
    }

    public function update(Request $request, CareerApplication $careerApplication): RedirectResponse
    {
        $data = $request->validate([
            'status' => ['required', 'string', 'max:40'],
        ]);

        $careerApplication->update($data);

        return redirect()
            ->route('admin.careers.show', $careerApplication)
            ->with('status', 'Status updated.');
    }
}
