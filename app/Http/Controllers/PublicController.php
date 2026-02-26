<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\MockTest;
use App\Models\Category;
use App\Models\CurrentAffair;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicController extends Controller
{
    public function home(Request $request)
    {
        $courses = Course::with(['instructor', 'category'])
            ->where('is_active', true)
            ->latest()
            ->take(12)
            ->get();

        $featuredCourses = Course::with(['instructor', 'category'])
            ->where('is_active', true)
            ->where('is_featured', true)
            ->latest()
            ->take(6)
            ->get();

        $categories = Category::where('is_active', true)
            ->orderBy('name')
            ->get();

        $currentAffairs = CurrentAffair::where('is_active', true)
            ->where('is_featured', true)
            ->latest('date')
            ->take(4)
            ->get();

        $upcomingTests = MockTest::where('is_active', true)
            ->where('start_time', '>', now())
            ->orderBy('start_time')
            ->take(3)
            ->get();

        return Inertia::render('welcome', [
            'courses' => $courses,
            'featuredCourses' => $featuredCourses,
            'categories' => $categories,
            'currentAffairs' => $currentAffairs,
            'upcomingTests' => $upcomingTests,
        ]);
    }

    public function courses(Request $request)
    {
        $courses = Course::with(['instructor', 'category', 'enrollments'])
            ->where('is_active', true)
            ->when($request->search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            })
            ->when($request->category, function ($query, $category) {
                $query->where('category_id', $category);
            })
            ->when($request->type, function ($query, $type) {
                $query->where('type', $type);
            })
            ->when($request->price, function ($query, $price) {
                if ($price === 'free') {
                    $query->where('is_free', true);
                } elseif ($price === 'paid') {
                    $query->where('is_free', false);
                }
            })
            ->latest()
            ->paginate(12);

        $categories = Category::where('is_active', true)
            ->orderBy('name')
            ->get();

        return Inertia::render('courses/index', [
            'courses' => $courses,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category', 'type', 'price']),
        ]);
    }

    public function courseShow(Request $request, $id)
    {
        $course = Course::with([
            'instructor',
            'category',
            'topics.materials',
            'enrollments' => function ($query) {
                $query->where('user_id', auth()->id());
            }
        ])
        ->where('is_active', true)
        ->findOrFail($id);

        $relatedCourses = Course::with(['instructor', 'category'])
            ->where('category_id', $course->category_id)
            ->where('id', '!=', $course->id)
            ->where('is_active', true)
            ->take(4)
            ->get();

        return Inertia::render('courses/show', [
            'course' => $course,
            'relatedCourses' => $relatedCourses,
        ]);
    }

    public function tests(Request $request)
    {
        $tests = MockTest::with(['instructor', 'category'])
            ->where('is_active', true)
            ->when($request->search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            })
            ->when($request->category, function ($query, $category) {
                $query->where('category_id', $category);
            })
            ->when($request->type, function ($query, $type) {
                if ($type === 'free') {
                    $query->where('is_free', true);
                } elseif ($type === 'paid') {
                    $query->where('is_free', false);
                }
            })
            ->latest()
            ->paginate(12);

        $categories = Category::where('is_active', true)
            ->orderBy('name')
            ->get();

        return Inertia::render('tests/index', [
            'tests' => $tests,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category', 'type']),
        ]);
    }

    public function currentAffairs(Request $request)
    {
        $currentAffairs = CurrentAffair::where('is_active', true)
            ->when($request->search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%");
            })
            ->when($request->category, function ($query, $category) {
                $query->where('category', $category);
            })
            ->when($request->date, function ($query, $date) {
                $query->whereDate('date', $date);
            })
            ->latest('date')
            ->paginate(12);

        $categories = CurrentAffair::distinct('category')
            ->where('is_active', true)
            ->pluck('category')
            ->filter()
            ->values();

        return Inertia::render('current-affairs/index', [
            'currentAffairs' => $currentAffairs,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category', 'date']),
        ]);
    }

    public function currentAffairShow($id)
    {
        $currentAffair = CurrentAffair::with('author')
            ->where('is_active', true)
            ->findOrFail($id);

        $related = CurrentAffair::where('category', $currentAffair->category)
            ->where('id', '!=', $currentAffair->id)
            ->where('is_active', true)
            ->latest('date')
            ->take(5)
            ->get();

        return Inertia::render('current-affairs/show', [
            'currentAffair' => $currentAffair,
            'related' => $related,
        ]);
    }

    public function about()
    {
        return Inertia::render('about');
    }

    public function contact()
    {
        return Inertia::render('contact');
    }
}
