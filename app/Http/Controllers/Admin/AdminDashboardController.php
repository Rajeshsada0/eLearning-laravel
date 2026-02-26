<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Course;
use App\Models\MockTest;
use App\Models\Enrollment;
use App\Models\TestResult;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'role:admin']);
    }

    public function index(Request $request)
    {
        $stats = [
            'total_users' => User::count(),
            'total_instructors' => User::whereHas('roles', function ($query) {
                $query->where('name', 'instructor');
            })->count(),
            'total_students' => User::whereHas('roles', function ($query) {
                $query->where('name', 'student');
            })->count(),
            'total_courses' => Course::count(),
            'total_tests' => MockTest::count(),
            'total_enrollments' => Enrollment::count(),
            'total_revenue' => Enrollment::where('payment_status', 'completed')->sum('amount_paid'),
            'active_tests_today' => MockTest::whereDate('start_time', today())->count(),
        ];

        $recentUsers = User::latest()->take(5)->get();
        $recentCourses = Course::latest()->take(5)->get();
        $recentTests = MockTest::latest()->take(5)->get();

        $monthlyRevenue = Enrollment::selectRaw('MONTH(created_at) as month, SUM(amount_paid) as total')
            ->where('payment_status', 'completed')
            ->whereYear('created_at', now()->year)
            ->groupBy('month')
            ->orderBy('month')
            ->pluck('total', 'month');

        $topCourses = Course::withCount('enrollments')
            ->orderBy('enrollments_count', 'desc')
            ->take(5)
            ->get();

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recentUsers' => $recentUsers,
            'recentCourses' => $recentCourses,
            'recentTests' => $recentTests,
            'monthlyRevenue' => $monthlyRevenue,
            'topCourses' => $topCourses,
        ]);
    }

    public function users(Request $request)
    {
        $users = User::with('roles')
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })
            ->when($request->role, function ($query, $role) {
                $query->whereHas('roles', function ($q) use ($role) {
                    $q->where('name', $role);
                });
            })
            ->latest()
            ->paginate(10);

        return Inertia::render('admin/users', [
            'users' => $users,
            'filters' => $request->only(['search', 'role']),
        ]);
    }

    public function courses(Request $request)
    {
        $courses = Course::with(['instructor', 'category', 'enrollments'])
            ->when($request->search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            })
            ->when($request->status, function ($query, $status) {
                $query->where('is_active', $status === 'active');
            })
            ->latest()
            ->paginate(10);

        return Inertia::render('admin/courses', [
            'courses' => $courses,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function tests(Request $request)
    {
        $tests = MockTest::with(['instructor', 'category', 'testResults'])
            ->when($request->search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            })
            ->when($request->status, function ($query, $status) {
                $query->where('is_active', $status === 'active');
            })
            ->latest()
            ->paginate(10);

        return Inertia::render('admin/tests', [
            'tests' => $tests,
            'filters' => $request->only(['search', 'status']),
        ]);
    }
}
