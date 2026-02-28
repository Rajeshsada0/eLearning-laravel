<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            ['name' => 'admin', 'slug' => 'admin', 'description' => 'System administrator with full access'],
            ['name' => 'instructor', 'slug' => 'instructor', 'description' => 'Course instructor who can create and manage courses'],
            ['name' => 'student', 'slug' => 'student', 'description' => 'Student who can enroll in courses and take tests'],
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(['slug' => $role['slug']], $role);
        }
    }
}
