<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CareerApplicationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'full_name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:160'],
            'phone' => ['required', 'string', 'max:40'],
            'location' => ['nullable', 'string', 'max:120'],
            'role' => ['nullable', 'string', 'max:120'],
            'experience' => ['nullable', 'string', 'max:50'],
            'work_type' => ['nullable', 'string', 'max:50'],
            'notice_period' => ['nullable', 'string', 'max:50'],
            'portfolio_url' => ['nullable', 'string', 'max:255'],//url
            'about' => ['nullable', 'string', 'max:2000'],
            'resume' => ['nullable', 'file', 'max:5120'],
            'agreed' => ['nullable', 'boolean'],//reqired
        ];
    }
}
