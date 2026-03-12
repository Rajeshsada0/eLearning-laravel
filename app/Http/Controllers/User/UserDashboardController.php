<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Course;
use App\Models\MockTest;
use App\Models\Enrollment;
use App\Models\TestResult;
use App\Models\Progress;
use App\Models\Topic;
use App\Models\CurrentAffair;
use App\Models\Material;
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

        // Calculate progress for each enrolled course
        $progress = [];
        foreach ($enrolledCourses as $enrollment) {
            $totalTopics = $enrollment->course->topics()->count();
            $completedTopics = $enrollment->course->topics()
                ->whereHas('progress', function ($query) use ($user) {
                    $query->where('user_id', $user->id)->whereNotNull('completed_at');
                })
                ->count();
            
            $progressPercentage = $totalTopics > 0 ? ($completedTopics / $totalTopics) * 100 : 0;
            
            $progress[$enrollment->course->id] = [
                'completed_topics' => $completedTopics,
                'total_topics' => $totalTopics,
                'percentage' => round($progressPercentage, 1)
            ];
        }

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
                if ($status === 'in_progress') {
                    $query->whereNull('completed_at');
                } elseif ($status === 'completed') {
                    $query->whereNotNull('completed_at');
                }
            })
            ->paginate(12);

        return Inertia::render('user/courses', [
            'enrollments' => $enrollments,
            'filters' => $request->only(['status'])
        ]);
    }

    public function progress(Request $request)
    {
        $user = Auth::user();
        
        // Get all enrollments with courses and progress
        $enrollments = Enrollment::with(['course', 'course.topics'])
            ->where('user_id', $user->id)
            ->get();

        // Calculate progress for each course
        $courseProgress = [];
        $overallStats = [
            'total_courses' => $enrollments->count(),
            'completed_courses' => 0,
            'in_progress_courses' => 0,
            'total_topics' => 0,
            'completed_topics' => 0,
            'total_time_spent' => 0
        ];

        foreach ($enrollments as $enrollment) {
            $course = $enrollment->course;
            $topics = $course->topics ?? collect([]);
            
            $totalTopics = $topics->count();
            $completedTopics = 0;
            $timeSpent = 0;

            foreach ($topics as $topic) {
                $progress = Progress::where('user_id', $user->id)
                    ->where('topic_id', $topic->id)
                    ->first();
                
                if ($progress && $progress->completed_at) {
                    $completedTopics++;
                    $timeSpent += $progress->time_spent ?? 0;
                }
            }

            $progressPercentage = $totalTopics > 0 ? ($completedTopics / $totalTopics) * 100 : 0;
            $isCompleted = $progressPercentage >= 100;

            $courseProgress[] = [
                'course' => $course,
                'total_topics' => $totalTopics,
                'completed_topics' => $completedTopics,
                'progress_percentage' => round($progressPercentage, 1),
                'time_spent' => $timeSpent,
                'is_completed' => $isCompleted,
                'enrollment_date' => $enrollment->created_at
            ];

            // Update overall stats
            $overallStats['total_topics'] += $totalTopics;
            $overallStats['completed_topics'] += $completedTopics;
            $overallStats['total_time_spent'] += $timeSpent;
            
            if ($isCompleted) {
                $overallStats['completed_courses']++;
            } else {
                $overallStats['in_progress_courses']++;
            }
        }

        // Calculate overall progress percentage
        $overallStats['overall_progress'] = $overallStats['total_topics'] > 0 
            ? round(($overallStats['completed_topics'] / $overallStats['total_topics']) * 100, 1)
            : 0;

        return Inertia::render('user/progress', [
            'courseProgress' => $courseProgress,
            'overallStats' => $overallStats
        ]);
    }

    public function learnCourse(Request $request, $id)
    {
        $user = Auth::user();
        
        // Check if user is enrolled in this course
        $enrollment = Enrollment::with(['course'])
            ->where('user_id', $user->id)
            ->where('course_id', $id)
            ->first();
            
        if (!$enrollment) {
            return redirect()->route('user.courses')->with('error', 'You are not enrolled in this course');
        }

        // Get course with topics and materials
        $course = Course::with([
            'topics' => function ($query) {
                $query->where('is_active', true)->orderBy('order');
            },
            'topics.materials' => function ($query) {
                $query->where('is_active', true)->orderBy('order');
            },
            'topics.progress' => function ($query) use ($user) {
                $query->where('user_id', $user->id);
            },
            'instructor'
        ])->findOrFail($id);

        // Get user progress for each topic
        $progress = [];
        foreach ($course->topics as $topic) {
            $userProgress = $topic->progress->where('user_id', $user->id)->first();
            $progress[$topic->id] = [
                'completed' => $userProgress ? $userProgress->completed_at !== null : false,
                'time_spent' => $userProgress ? $userProgress->time_spent : 0,
                'percentage' => $userProgress ? $userProgress->percentage : 0
            ];
        }

        return Inertia::render('user/learn', [
            'course' => $course,
            'enrollment' => $enrollment,
            'progress' => $progress
        ]);
    }

    public function markTopicComplete(Request $request, $courseId, $topicId)
    {
        $user = Auth::user();
        
        // Check if user is enrolled in this course
        $enrollment = Enrollment::where('user_id', $user->id)
            ->where('course_id', $courseId)
            ->first();
            
        if (!$enrollment) {
            return response()->json(['error' => 'You are not enrolled in this course'], 403);
        }

        // Check if topic exists and belongs to course
        $topic = Topic::where('id', $topicId)
            ->where('course_id', $courseId)
            ->first();
            
        if (!$topic) {
            return response()->json(['error' => 'Topic not found'], 404);
        }

        // Create or update progress
        $progress = Progress::updateOrCreate(
            [
                'user_id' => $user->id,
                'topic_id' => $topicId,
                'course_id' => $courseId,
            ],
            [
                'completed_at' => now(),
                'percentage' => 100,
                'time_spent' => $request->input('time_spent', 0),
                'last_accessed_at' => now(),
            ]
        );

        // Return back with success message
        return back()->with('success', 'Topic marked as complete');
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
