<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CareerApplication extends Model
{
    protected $fillable = [
        'full_name',
        'email',
        'phone',
        'location',
        'role',
        'experience',
        'work_type',
        'notice_period',
        'portfolio_url',
        'about',
        'resume_path',
        'agreed',
        'status',
        'assigned_to',
        'submitted_at',
    ];

    protected $casts = [
        'agreed' => 'boolean',
        'submitted_at' => 'datetime',
    ];
}
