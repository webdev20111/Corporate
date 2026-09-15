<?php

use App\Http\Controllers\Admin\CareerAdminController;
use App\Http\Controllers\Admin\ContactAdminController;
use App\Http\Controllers\Admin\PageAdminController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    $user = auth()->user();
    if ($user && $user->hasRole('admin')) {
        return redirect()->route('admin.dashboard');
    }

    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', function () {
        return view('admin.dashboard');
    })->name('dashboard');

    Route::resource('pages', PageAdminController::class)->except(['show', 'destroy']);
    Route::get('careers', [CareerAdminController::class, 'index'])->name('careers.index');
    Route::get('careers/{careerApplication}', [CareerAdminController::class, 'show'])->name('careers.show');
    Route::patch('careers/{careerApplication}', [CareerAdminController::class, 'update'])->name('careers.update');

    Route::get('contacts', [ContactAdminController::class, 'index'])->name('contacts.index');
    Route::get('contacts/{contactInquiry}', [ContactAdminController::class, 'show'])->name('contacts.show');
    Route::patch('contacts/{contactInquiry}', [ContactAdminController::class, 'update'])->name('contacts.update');
});

require __DIR__.'/auth.php';
