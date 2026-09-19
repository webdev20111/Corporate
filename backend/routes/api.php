<?php

use App\Http\Controllers\Api\CareerApplicationController;
use App\Http\Controllers\Api\ContactInquiryController;
use App\Http\Controllers\Api\InternshipController;
use App\Http\Controllers\Api\AppointmentController;

use App\Http\Controllers\Api\PageController;

use Illuminate\Support\Facades\Route;

Route::get('pages', [PageController::class, 'index']);
Route::get('pages/{slug}', [PageController::class, 'show']);
Route::post('careers', [CareerApplicationController::class, 'store']);
Route::post('contacts', [ContactInquiryController::class, 'store']);
Route::post('internships', [InternshipController::class, 'store']);
Route::post('appointments', [AppointmentController::class, 'store']);

