<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactInquiry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class ContactAdminController extends Controller
{
    public function index(): View
    {
        $inquiries = ContactInquiry::query()
            ->latest('submitted_at')
            ->paginate(20);

        return view('admin.contacts.index', compact('inquiries'));
    }

    public function show(ContactInquiry $contactInquiry): View
    {
        return view('admin.contacts.show', [
            'inquiry' => $contactInquiry,
        ]);
    }

    public function update(Request $request, ContactInquiry $contactInquiry): RedirectResponse
    {
        $data = $request->validate([
            'status' => ['required', 'string', 'max:40'],
        ]);

        $contactInquiry->update($data);

        return redirect()
            ->route('admin.contacts.show', $contactInquiry)
            ->with('status', 'Status updated.');
    }
}
