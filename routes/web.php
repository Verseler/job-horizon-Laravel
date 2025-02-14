<?php

use App\Http\Controllers\JobListingController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('LandingPage', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('/dashboard', 'Dashboard')->name('dashboard');
});

//Job Seeker
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/jobs', [JobListingController::class, 'index'])->name('job.list');
    Route::post('/jobs/{id}/bookmark', [JobListingController::class, 'bookmark'])->name('job.bookmark');
    Route::delete('/jobs/{id}/bookmark', [JobListingController::class, 'unBookmark'])->name('job.unBookmark');
});

//Recruiter
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
