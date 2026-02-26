<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Instructor\InstructorDashboardController;
use App\Http\Controllers\User\UserDashboardController;
use App\Http\Controllers\PublicController;

// Public routes
Route::get('/', [PublicController::class, 'home'])->name('home');
Route::get('/courses', [PublicController::class, 'courses'])->name('courses.index');
Route::get('/courses/{id}', [PublicController::class, 'courseShow'])->name('courses.show');
Route::get('/tests', [PublicController::class, 'tests'])->name('tests.index');
Route::get('/current-affairs', [PublicController::class, 'currentAffairs'])->name('current-affairs.index');
Route::get('/current-affairs/{id}', [PublicController::class, 'currentAffairShow'])->name('current-affairs.show');
Route::get('/about', [PublicController::class, 'about'])->name('about');
Route::get('/contact', [PublicController::class, 'contact'])->name('contact');

// Auth routes (will be added later)
// Route::middleware('guest')->group(function () {
//     // Login, Register, etc.
// });

// Admin routes
Route::prefix('admin')->middleware(['auth', 'role:admin'])->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::get('/users', [AdminDashboardController::class, 'users'])->name('users');
    Route::get('/courses', [AdminDashboardController::class, 'courses'])->name('courses');
    Route::get('/tests', [AdminDashboardController::class, 'tests'])->name('tests');
});

// Instructor routes
Route::prefix('instructor')->middleware(['auth', 'role:instructor'])->name('instructor.')->group(function () {
    Route::get('/dashboard', [InstructorDashboardController::class, 'index'])->name('dashboard');
    Route::get('/courses', [InstructorDashboardController::class, 'courses'])->name('courses');
    Route::get('/tests', [InstructorDashboardController::class, 'tests'])->name('tests');
    Route::get('/students', [InstructorDashboardController::class, 'students'])->name('students');
    Route::get('/analytics', [InstructorDashboardController::class, 'analytics'])->name('analytics');
});

// User/Student routes
Route::prefix('user')->middleware(['auth', 'role:student'])->name('user.')->group(function () {
    Route::get('/dashboard', [UserDashboardController::class, 'index'])->name('dashboard');
    Route::get('/courses', [UserDashboardController::class, 'courses'])->name('courses');
    Route::get('/tests', [UserDashboardController::class, 'tests'])->name('tests');
    Route::get('/current-affairs', [UserDashboardController::class, 'currentAffairs'])->name('current-affairs');
    Route::get('/study-materials', [UserDashboardController::class, 'studyMaterials'])->name('study-materials');
});
