<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'UPSC & State PSC', 'slug' => 'upsc-state-psc', 'description' => 'Civil Services Examination Preparation', 'is_active' => true],
            ['name' => 'SSC Exams', 'slug' => 'ssc-exams', 'description' => 'Staff Selection Commission Exams', 'is_active' => true],
            ['name' => 'Banking Exams', 'slug' => 'banking-exams', 'description' => 'Banking and Financial Sector Exams', 'is_active' => true],
            ['name' => 'Railway Exams', 'slug' => 'railway-exams', 'description' => 'Railway Recruitment Board Exams', 'is_active' => true],
            ['name' => 'Defence Exams', 'slug' => 'defence-exams', 'description' => 'Defense Services Exams', 'is_active' => true],
            ['name' => 'Police Exams', 'slug' => 'police-exams', 'description' => 'Police Department Recruitment Exams', 'is_active' => true],
            ['name' => 'Teaching Exams', 'slug' => 'teaching-exams', 'description' => 'Teaching and Education Exams', 'is_active' => true],
            ['name' => 'Engineering Exams', 'slug' => 'engineering-exams', 'description' => 'Engineering Entrance and Recruitment Exams', 'is_active' => true],
            ['name' => 'NEET | JEE | CUET | Boards', 'slug' => 'neet-jee-cuet-boards', 'description' => 'Medical, Engineering and Board Exams', 'is_active' => true],
            ['name' => 'State Exams', 'slug' => 'state-exams', 'description' => 'State Government Recruitment Exams', 'is_active' => true],
            ['name' => 'Foundation Courses', 'slug' => 'foundation-courses', 'description' => 'General Knowledge and Foundation Courses', 'is_active' => true],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
