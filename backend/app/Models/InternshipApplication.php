<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InternshipApplication extends Model
{
    protected $fillable = [
        'full_name',
        'email',
        'phone',
        'college',
        'department',
        'year_of_study',
        'duration',
        'start_date',
        'resume_path',
        'message',
        'status',
        'submitted_at',
    ];

    protected $casts = [
        'start_date' => 'date',
        'submitted_at' => 'datetime',
    ];
}
