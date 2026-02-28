<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Course;
use App\Models\MockTest;
use App\Models\Enrollment;
use App\Models\TestResult;
use App\Models\Progress;
use App\Models\CurrentAffair;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserDashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        
        $enrolledCourses = Enrollment::with('course')
            ->where('user_id', $user->id)
            ->latest()
            ->take(6)
            ->get();

        $recentTests = TestResult::with('mockTest')
            ->where('user_id', $user->id)
            ->latest()
            ->take(5)
            ->get();

        $stats = [
            'enrolled_courses' => Enrollment::where('user_id', $user->id)->count(),
            'completed_courses' => Enrollment::where('user_id', $user->id)
                ->whereNotNull('completed_at')
                ->count(),
            'tests_taken' => TestResult::where('user_id', $user->id)->count(),
            'average_score' => TestResult::where('user_id', $user->id)
                ->where('status', 'completed')
                ->avg('percentage') ?? 0,
        ];

        $recommendedCourses = Course::where('is_active', true)
            ->whereNotIn('id', $enrolledCourses->pluck('course_id'))
            ->inRandomOrder()
            ->take(4)
            ->get();

        $upcomingTests = MockTest::where('is_active', true)
            ->where('start_time', '>', now())
            ->orderBy('start_time')
            ->take(3)
            ->get();

        return Inertia::render('user/dashboard', [
            'enrolledCourses' => $enrolledCourses,
            'recentTests' => $recentTests,
            'progress' => $progress,
            'stats' => $stats,
            'recommendedCourses' => $recommendedCourses,
            'upcomingTests' => $upcomingTests,
        ]);
    }

    public function courses(Request $request)
    {
        $user = Auth::user();
        
        $enrollments = Enrollment::with(['course.instructor', 'course.category'])
            ->where('user_id', $user->id)
            ->when($request->status, function ($query, $status) {
                if ($status === 'completed') {
                    $query->whereNotNull('completed_at');
                } elseif ($status === 'in_progress') {
                    $query->whereNull('completed_at');
                }
            })
            ->latest()
            ->paginate(12);

        return Inertia::render('user/courses', [
            'enrollments' => $enrollments,
            'filters' => $request->only(['status']),
        ]);
    }

    public function tests(Request $request)
    {
        $user = Auth::user();
        
        $testResults = TestResult::with(['mockTest.category'])
            ->where('user_id', $user->id)
            ->when($request->status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->latest()
            ->paginate(12);

        return Inertia::render('user/tests', [
            'testResults' => $testResults,
            'filters' => $request->only(['status']),
        ]);
    }

    public function currentAffairs(Request $request)
    {
        $currentAffairs = CurrentAffair::where('is_active', true)
            ->when($request->category, function ($query, $category) {
                $query->where('category', $category);
            })
            ->when($request->date, function ($query, $date) {
                $query->whereDate('date', $date);
            })
            ->latest('date')
            ->paginate(12);

        $categories = CurrentAffair::distinct('category')
            ->pluck('category')
            ->filter()
            ->values();

        return Inertia::render('user/current-affairs', [
            'currentAffairs' => $currentAffairs,
            'categories' => $categories,
            'filters' => $request->only(['category', 'date']),
        ]);
    }

    public function studyMaterials(Request $request)
    {
        $user = Auth::user();
        
        $enrolledCourseIds = Enrollment::where('user_id', $user->id)
            ->pluck('course_id');

        $materials = Material::with(['topic.course'])
            ->whereHas('topic.course', function ($query) use ($enrolledCourseIds) {
                $query->whereIn('id', $enrolledCourseIds);
            })
            ->when($request->type, function ($query, $type) {
                $query->where('type', $type);
            })
            ->latest()
            ->paginate(20);

        return Inertia::render('user/study-materials', [
            'materials' => $materials,
            'filters' => $request->only(['type']),
        ]);
    }

    public function profile(Request $request)
    {
        $user = Auth::user();
        
        return Inertia::render('user/profile', [
            'user' => $user,
        ]);
    }

    public function settings(Request $request)
    {
        $user = Auth::user();
        
        return Inertia::render('user/settings', [
            'user' => $user,
        ]);
    }

    public function support(Request $request)
    {
        $user = Auth::user();
        
        return Inertia::render('user/support', [
            'user' => $user,
        ]);
    }
}
