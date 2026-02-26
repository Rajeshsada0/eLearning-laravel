<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Course;
use App\Models\MockTest;
use App\Models\Enrollment;
use App\Models\TestResult;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class InstructorDashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'role:instructor']);
    }

    public function index(Request $request)
    {
        $instructor = Auth::user();
        
        $stats = [
            'total_courses' => Course::where('instructor_id', $instructor->id)->count(),
            'published_courses' => Course::where('instructor_id', $instructor->id)
                ->where('is_active', true)
                ->count(),
            'total_students' => Enrollment::whereHas('course', function ($query) use ($instructor) {
                $query->where('instructor_id', $instructor->id);
            })->count(),
            'total_revenue' => Enrollment::whereHas('course', function ($query) use ($instructor) {
                $query->where('instructor_id', $instructor->id);
            })->where('payment_status', 'completed')->sum('amount_paid'),
            'total_tests' => MockTest::where('instructor_id', $instructor->id)->count(),
            'active_tests' => MockTest::where('instructor_id', $instructor->id)
                ->where('is_active', true)
                ->count(),
        ];

        $recentCourses = Course::where('instructor_id', $instructor->id)
            ->latest()
            ->take(5)
            ->get();

        $recentTests = MockTest::where('instructor_id', $instructor->id)
            ->latest()
            ->take(5)
            ->get();

        $topCourses = Course::withCount('enrollments')
            ->where('instructor_id', $instructor->id)
            ->orderBy('enrollments_count', 'desc')
            ->take(5)
            ->get();

        $monthlyRevenue = Enrollment::selectRaw('MONTH(created_at) as month, SUM(amount_paid) as total')
            ->whereHas('course', function ($query) use ($instructor) {
                $query->where('instructor_id', $instructor->id);
            })
            ->where('payment_status', 'completed')
            ->whereYear('created_at', now()->year)
            ->groupBy('month')
            ->orderBy('month')
            ->pluck('total', 'month');

        return Inertia::render('instructor/dashboard', [
            'stats' => $stats,
            'recentCourses' => $recentCourses,
            'recentTests' => $recentTests,
            'topCourses' => $topCourses,
            'monthlyRevenue' => $monthlyRevenue,
        ]);
    }

    public function courses(Request $request)
    {
        $instructor = Auth::user();
        
        $courses = Course::with(['category', 'enrollments'])
            ->where('instructor_id', $instructor->id)
            ->when($request->search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            })
            ->when($request->status, function ($query, $status) {
                $query->where('is_active', $status === 'active');
            })
            ->latest()
            ->paginate(12);

        return Inertia::render('instructor/courses', [
            'courses' => $courses,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function tests(Request $request)
    {
        $instructor = Auth::user();
        
        $tests = MockTest::with(['category', 'testResults'])
            ->where('instructor_id', $instructor->id)
            ->when($request->search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            })
            ->when($request->status, function ($query, $status) {
                $query->where('is_active', $status === 'active');
            })
            ->latest()
            ->paginate(12);

        return Inertia::render('instructor/tests', [
            'tests' => $tests,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function students(Request $request)
    {
        $instructor = Auth::user();
        
        $students = User::whereHas('enrollments.course', function ($query) use ($instructor) {
            $query->where('instructor_id', $instructor->id);
        })
        ->with(['enrollments.course'])
        ->when($request->search, function ($query, $search) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%");
        })
        ->latest()
        ->paginate(12);

        return Inertia::render('instructor/students', [
            'students' => $students,
            'filters' => $request->only(['search']),
        ]);
    }

    public function analytics(Request $request)
    {
        $instructor = Auth::user();
        
        $courseStats = Course::where('instructor_id', $instructor->id)
            ->withCount(['enrollments', 'testResults' => function ($query) {
                $query->whereHas('testResult', function ($q) {
                    $q->where('status', 'completed');
                });
            }])
            ->get();

        $monthlyEnrollments = Enrollment::selectRaw('MONTH(created_at) as month, COUNT(*) as count')
            ->whereHas('course', function ($query) use ($instructor) {
                $query->where('instructor_id', $instructor->id);
            })
            ->whereYear('created_at', now()->year)
            ->groupBy('month')
            ->orderBy('month')
            ->pluck('count', 'month');

        $testPerformance = TestResult::selectRaw('AVG(percentage) as avg_score, COUNT(*) as total_attempts')
            ->whereHas('mockTest', function ($query) use ($instructor) {
                $query->where('instructor_id', $instructor->id);
            })
            ->where('status', 'completed')
            ->first();

        return Inertia::render('instructor/analytics', [
            'courseStats' => $courseStats,
            'monthlyEnrollments' => $monthlyEnrollments,
            'testPerformance' => $testPerformance,
        ]);
    }
}
