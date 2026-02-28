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

    public function createCourse()
    {
        $categories = \App\Models\Category::all();
        return Inertia::render('instructor/courses/create', [
            'categories' => $categories,
        ]);
    }

    public function storeCourse(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'price' => 'nullable|numeric|min:0',
            'is_free' => 'boolean',
            'is_active' => 'boolean',
            'requirements' => 'nullable|string',
            'what_you_learn' => 'nullable|string',
            'target_audience' => 'nullable|string',
            'language' => 'required|string',
            'level' => 'required|string|in:beginner,intermediate,advanced',
            'duration_weeks' => 'nullable|integer|min:1',
        ]);

        $course = Course::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'category_id' => $validated['category_id'],
            'instructor_id' => Auth::id(),
            'price' => $validated['is_free'] ? 0 : $validated['price'],
            'is_free' => $validated['is_free'],
            'is_active' => $validated['is_active'],
            'requirements' => $validated['requirements'],
            'what_you_learn' => $validated['what_you_learn'],
            'target_audience' => $validated['target_audience'],
            'language' => $validated['language'],
            'level' => $validated['level'],
            'duration_weeks' => $validated['duration_weeks'],
            'slug' => \Str::slug($validated['title']),
        ]);

        return redirect()->route('instructor.courses')->with('success', 'Course created successfully!');
    }

    public function showCourse(Course $course)
    {
        if ($course->instructor_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $course->load(['category', 'enrollments.user', 'topics.files']);

        return Inertia::render('instructor/courses/show', [
            'course' => $course,
        ]);
    }

    public function editCourse(Course $course)
    {
        if ($course->instructor_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $categories = \App\Models\Category::all();
        
        return Inertia::render('instructor/courses/edit', [
            'course' => $course->load(['topics.files']),
            'categories' => $categories,
        ]);
    }

    public function updateCourse(Request $request, Course $course)
    {
        if ($course->instructor_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'price' => 'nullable|numeric|min:0',
            'is_free' => 'boolean',
            'is_active' => 'boolean',
            'requirements' => 'nullable|string',
            'what_you_learn' => 'nullable|string',
            'target_audience' => 'nullable|string',
            'language' => 'required|string',
            'level' => 'required|string|in:beginner,intermediate,advanced',
            'duration_weeks' => 'nullable|integer|min:1',
            'topics' => 'nullable|array',
            'topics.*.title' => 'required|string|max:255',
            'topics.*.description' => 'nullable|string',
            'topics.*.duration' => 'nullable|integer|min:1',
            'topics.*.order' => 'required|integer|min:1',
            'topics.*.video_url' => 'nullable|url',
            'topics.*.notes' => 'nullable|string',
            'topics.*.files' => 'nullable|array',
            'topics.*.files.*' => 'nullable|file|max:10240', // 10MB max per file
        ]);

        $course->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'category_id' => $validated['category_id'],
            'price' => $validated['is_free'] ? 0 : $validated['price'],
            'is_free' => $validated['is_free'],
            'is_active' => $validated['is_active'],
            'requirements' => $validated['requirements'],
            'what_you_learn' => $validated['what_you_learn'],
            'target_audience' => $validated['target_audience'],
            'language' => $validated['language'],
            'level' => $validated['level'],
            'duration_weeks' => $validated['duration_weeks'],
            'slug' => \Str::slug($validated['title']),
        ]);

        // Update topics
        if (isset($validated['topics'])) {
            // Delete existing topics
            $course->topics()->delete();
            
            // Create new topics
            foreach ($validated['topics'] as $topicData) {
                $topic = $course->topics()->create([
                    'title' => $topicData['title'],
                    'description' => $topicData['description'] ?? null,
                    'duration' => $topicData['duration'] ?? null,
                    'order' => $topicData['order'],
                    'video_url' => $topicData['video_url'] ?? null,
                    'notes' => $topicData['notes'] ?? null,
                ]);

                // Handle file uploads
                if (isset($topicData['files']) && is_array($topicData['files'])) {
                    foreach ($topicData['files'] as $file) {
                        if ($file instanceof \Illuminate\Http\UploadedFile) {
                            $fileName = time() . '_' . $file->getClientOriginalName();
                            $filePath = $file->storeAs('topic-files', $fileName, 'public');
                            
                            $topic->files()->create([
                                'filename' => $fileName,
                                'original_name' => $file->getClientOriginalName(),
                                'mime_type' => $file->getMimeType(),
                                'size' => $file->getSize(),
                                'path' => $filePath,
                            ]);
                        }
                    }
                }
            }
        }

        return redirect()->route('instructor.courses')->with('success', 'Course updated successfully!');
    }

    public function createTest()
    {
        $categories = \App\Models\Category::all();
        return Inertia::render('instructor/tests/create', [
            'categories' => $categories,
        ]);
    }

    public function storeTest(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'duration' => 'required|integer|min:1',
            'total_questions' => 'required|integer|min:1',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'is_active' => 'boolean',
            'passing_score' => 'nullable|integer|min:0|max:100',
            'instructions' => 'nullable|string',
        ]);

        $test = MockTest::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'category_id' => $validated['category_id'],
            'instructor_id' => Auth::id(),
            'duration_minutes' => $validated['duration'],
            'total_questions' => $validated['total_questions'],
            'start_time' => $validated['start_time'],
            'end_time' => $validated['end_time'],
            'is_active' => $validated['is_active'],
            'passing_marks' => $validated['passing_score'] ?? 0,
            'instructions' => $validated['instructions'] ?? null,
            'slug' => \Str::slug($validated['title']),
        ]);

        return redirect()->route('instructor.tests')->with('success', 'Test created successfully!');
    }

    public function showTest(MockTest $test)
    {
        if ($test->instructor_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $test->load(['category', 'testResults.user']);

        return Inertia::render('instructor/tests/show', [
            'test' => $test,
            'testResults' => $test->testResults,
        ]);
    }

    public function editTest(MockTest $test)
    {
        if ($test->instructor_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $categories = \App\Models\Category::all();
        
        return Inertia::render('instructor/tests/edit', [
            'test' => $test,
            'categories' => $categories,
        ]);
    }

    public function updateTest(Request $request, MockTest $test)
    {
        if ($test->instructor_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'duration' => 'required|integer|min:1',
            'total_questions' => 'required|integer|min:1',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'is_active' => 'boolean',
            'passing_score' => 'nullable|integer|min:0|max:100',
            'instructions' => 'nullable|string',
        ]);

        $test->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'category_id' => $validated['category_id'],
            'duration_minutes' => $validated['duration'],
            'total_questions' => $validated['total_questions'],
            'start_time' => $validated['start_time'],
            'end_time' => $validated['end_time'],
            'is_active' => $validated['is_active'],
            'passing_marks' => $validated['passing_score'] ?? 0,
            'instructions' => $validated['instructions'] ?? null,
            'slug' => \Str::slug($validated['title']),
        ]);

        return redirect()->route('instructor.tests')->with('success', 'Test updated successfully!');
    }
}
