<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@academy.com',
            'password' => Hash::make('password'),
            'phone' => '+1234567890',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);
        $admin->roles()->attach(Role::where('name', 'admin')->first());

        // Create instructor user
        $instructor = User::create([
            'name' => 'John Instructor',
            'email' => 'instructor@academy.com',
            'password' => Hash::make('password'),
            'phone' => '+1234567891',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);
        $instructor->roles()->attach(Role::where('name', 'instructor')->first());

        // Create student user
        $student = User::create([
            'name' => 'Jane Student',
            'email' => 'student@academy.com',
            'password' => Hash::make('password'),
            'phone' => '+1234567892',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);
        $student->roles()->attach(Role::where('name', 'student')->first());
    }
}
