<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CareerApplicationRequest;
use App\Models\CareerApplication;
use Illuminate\Http\JsonResponse;

class CareerApplicationController extends Controller
{
    public function store(CareerApplicationRequest $request): JsonResponse
    {
        $data = $request->validated();

        if ($request->hasFile('resume')) {
            $data['resume_path'] = $request->file('resume')->store('resumes', 'public');
        }

        $data['submitted_at'] = now();

        $application = CareerApplication::create($data);

        // Send Email
        \Illuminate\Support\Facades\Mail::to($data['email'])->send(new \App\Mail\UserThankYouMail($data));
        \Illuminate\Support\Facades\Mail::to(config('mail.admin_address', 'admin@example.com'))->send(new \App\Mail\AdminNotificationMail($data, 'Career Application'));


        return response()->json([
            'message' => 'Application received.',
            'id' => $application->id,
        ], 201);
    }
}
