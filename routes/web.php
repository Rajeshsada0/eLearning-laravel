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

// Auth routes
Route::middleware('guest')->group(function () {
    Route::get('/login', [PublicController::class, 'login'])->name('login');
    Route::get('/register', [PublicController::class, 'register'])->name('register');
    Route::post('/login', [PublicController::class, 'loginPost'])->name('login.post');
    Route::post('/register', [PublicController::class, 'registerPost'])->name('register.post');
});

// Logout route (accessible by authenticated users)
Route::post('/logout', [PublicController::class, 'logout'])->name('logout');

// Admin routes
Route::prefix('admin')->middleware(['auth', 'role:admin'])->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::get('/users', [AdminDashboardController::class, 'users'])->name('users');
    Route::get('/users/create', [AdminDashboardController::class, 'createUser'])->name('users.create');
    Route::post('/users', [AdminDashboardController::class, 'storeUser'])->name('users.store');
    Route::get('/users/{user}/edit', [AdminDashboardController::class, 'editUser'])->name('users.edit');
    Route::put('/users/{user}', [AdminDashboardController::class, 'updateUser'])->name('users.update');
    Route::delete('/users/{user}', [AdminDashboardController::class, 'deleteUser'])->name('users.delete');
    Route::get('/courses', [AdminDashboardController::class, 'courses'])->name('courses');
    Route::get('/tests', [AdminDashboardController::class, 'tests'])->name('tests');
});

// Instructor routes
Route::prefix('instructor')->middleware(['auth', 'role:instructor'])->name('instructor.')->group(function () {
    Route::get('/dashboard', [InstructorDashboardController::class, 'index'])->name('dashboard');
    Route::get('/courses', [InstructorDashboardController::class, 'courses'])->name('courses');
    Route::get('/courses/create', [InstructorDashboardController::class, 'createCourse'])->name('courses.create');
    Route::post('/courses', [InstructorDashboardController::class, 'storeCourse'])->name('courses.store');
    Route::get('/courses/{course}/edit', [InstructorDashboardController::class, 'editCourse'])->name('courses.edit');
    Route::put('/courses/{course}', [InstructorDashboardController::class, 'updateCourse'])->name('courses.update');
    Route::get('/courses/{course}', [InstructorDashboardController::class, 'showCourse'])->name('courses.show');
    Route::get('/tests', [InstructorDashboardController::class, 'tests'])->name('tests');
    Route::get('/tests/create', [InstructorDashboardController::class, 'createTest'])->name('tests.create');
    Route::post('/tests', [InstructorDashboardController::class, 'storeTest'])->name('tests.store');
    Route::get('/tests/{test}', [InstructorDashboardController::class, 'showTest'])->name('tests.show');
    Route::get('/tests/{test}/edit', [InstructorDashboardController::class, 'editTest'])->name('tests.edit');
    Route::put('/tests/{test}', [InstructorDashboardController::class, 'updateTest'])->name('tests.update');
    Route::get('/students', [InstructorDashboardController::class, 'students'])->name('students');
    Route::get('/analytics', [InstructorDashboardController::class, 'analytics'])->name('analytics');
    Route::get('/earnings', [InstructorDashboardController::class, 'earnings'])->name('earnings');
});

// User/Student routes
Route::prefix('user')->middleware(['auth', 'role:student'])->name('user.')->group(function () {
    Route::get('/dashboard', [UserDashboardController::class, 'index'])->name('dashboard');
    Route::get('/profile', [UserDashboardController::class, 'profile'])->name('profile');
    Route::get('/courses', [UserDashboardController::class, 'courses'])->name('courses');
    Route::get('/tests', [UserDashboardController::class, 'tests'])->name('tests');
    Route::get('/current-affairs', [UserDashboardController::class, 'currentAffairs'])->name('current-affairs');
    Route::get('/study-materials', [UserDashboardController::class, 'studyMaterials'])->name('study-materials');
    Route::get('/settings', [UserDashboardController::class, 'settings'])->name('settings');
    Route::get('/support', [UserDashboardController::class, 'support'])->name('support');
});
