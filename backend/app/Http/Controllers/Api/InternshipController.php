<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\InternshipApplicationRequest;
use App\Models\InternshipApplication;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;
use App\Mail\UserThankYouMail;
use App\Mail\AdminNotificationMail;

class InternshipController extends Controller
{
    public function store(InternshipApplicationRequest $request): JsonResponse
    {
        $data = $request->validated();

        if ($request->hasFile('resume')) {
            $data['resume_path'] = $request->file('resume')->store('resumes', 'public');
        }

        $data['submitted_at'] = now();

        $application = InternshipApplication::create($data);

        // Send Emails
        Mail::to($data['email'])->send(new UserThankYouMail($data));
        Mail::to(config('mail.admin_address', 'admin@example.com'))->send(new AdminNotificationMail($data, 'Internship Application'));

        return response()->json([
            'message' => 'Internship application received.',
            'id' => $application->id,
        ], 201);
    }
}
