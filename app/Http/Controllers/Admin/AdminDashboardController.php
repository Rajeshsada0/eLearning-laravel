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

    public function createUser()
    {
        $roles = \App\Models\Role::all();
        return Inertia::render('admin/users/create', [
            'roles' => $roles,
        ]);
    }

    public function storeUser(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'nullable|string|max:20',
            'password' => 'required|string|min:8|confirmed',
            'role_id' => 'required|exists:roles,id',
            'is_active' => 'boolean',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'password' => bcrypt($validated['password']),
            'is_active' => $validated['is_active'] ?? false,
        ]);

        $user->roles()->attach($validated['role_id']);

        return redirect()->route('admin.users')->with('success', 'User created successfully!');
    }

    public function editUser(User $user)
    {
        $roles = \App\Models\Role::all();
        return Inertia::render('admin/users/edit', [
            'user' => $user->load('roles'),
            'roles' => $roles,
        ]);
    }

    public function updateUser(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:20',
            'role_id' => 'required|exists:roles,id',
            'is_active' => 'boolean',
        ]);

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'is_active' => $validated['is_active'] ?? false,
        ]);

        $user->roles()->sync([$validated['role_id']]);

        return redirect()->route('admin.users')->with('success', 'User updated successfully!');
    }

    public function deleteUser(Request $request, User $user)
    {
        try {
            // Detach roles before deleting
            $user->roles()->detach();
            
            // Delete the user
            $user->delete();
            
            // Return success response for Inertia
            if ($request->wantsJson()) {
                return response()->json(['message' => 'User deleted successfully!']);
            }
            
            // For regular requests, redirect back
            return redirect()->back()->with('success', 'User deleted successfully!');
            
        } catch (\Exception $e) {
            // Log the error
            \Log::error('Error deleting user: ' . $e->getMessage());
            
            // Return error response
            if ($request->wantsJson()) {
                return response()->json(['error' => 'Failed to delete user'], 500);
            }
            
            return redirect()->back()->with('error', 'Failed to delete user');
        }
    }
}
