<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InternshipApplicationRequest extends FormRequest
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
            'college' => ['required', 'string', 'max:160'],
            'department' => ['required', 'string', 'max:120'],
            'year_of_study' => ['required', 'string', 'max:20'],
            'duration' => ['required', 'string', 'max:50'],
            'start_date' => ['required', 'date'],
            'resume' => ['nullable', 'file', 'max:5120'],
            'message' => ['nullable', 'string', 'max:2000'],
        ];
    }
}
