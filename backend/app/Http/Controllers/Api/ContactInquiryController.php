<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactInquiryRequest;
use App\Models\ContactInquiry;
use Illuminate\Http\JsonResponse;

class ContactInquiryController extends Controller
{
    public function store(ContactInquiryRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['submitted_at'] = now();

        $inquiry = ContactInquiry::create($data);

        // Send Email
        \Illuminate\Support\Facades\Mail::to($data['email'])->send(new \App\Mail\UserThankYouMail($data));
        \Illuminate\Support\Facades\Mail::to(config('mail.admin_address', 'admin@example.com'))->send(new \App\Mail\AdminNotificationMail($data, 'Contact Inquiry'));

        return response()->json([
            'message' => 'Inquiry received.',
            'id' => $inquiry->id,
        ], 201);
    }
}
