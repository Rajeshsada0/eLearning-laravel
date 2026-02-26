<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Route;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Register role middleware
        Route::aliasMiddleware('role', \App\Http\Middleware\RoleMiddleware::class);

        // Custom Blade directives
        Blade::if('admin', function () {
            return auth()->check() && auth()->user()->isAdmin();
        });

        Blade::if('instructor', function () {
            return auth()->check() && auth()->user()->isInstructor();
        });

        Blade::if('student', function () {
            return auth()->check() && auth()->user()->isStudent();
        });

        Blade::if('role', function ($role) {
            return auth()->check() && auth()->user()->hasRole($role);
        });
    }
}
