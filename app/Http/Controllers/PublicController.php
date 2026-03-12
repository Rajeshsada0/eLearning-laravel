<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\MockTest;
use App\Models\Category;
use App\Models\CurrentAffair;
use App\Models\User;
use App\Models\Role;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PublicController extends Controller
{
    public function login()
    {
        return Inertia::render('auth/login');
    }

    public function register()
    {
        return Inertia::render('auth/register');
    }

    public function loginPost(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials, $request->remember)) {
            $request->session()->regenerate();
            
            $user = Auth::user();
            $user->update(['last_login_at' => now()]);
            
            // Redirect based on user role
            if ($user->isAdmin()) {
                return redirect()->intended('/admin/dashboard');
            } elseif ($user->isInstructor()) {
                return redirect()->intended('/instructor/dashboard');
            } else {
                return redirect()->intended('/user/dashboard');
            }
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }

    public function registerPost(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'name' => $validated['first_name'] . ' ' . $validated['last_name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'is_active' => true,
        ]);

        // Assign student role by default
        $studentRole = Role::where('name', 'student')->first();
        if ($studentRole) {
            $user->roles()->attach($studentRole->id);
        }

        Auth::login($user);

        return redirect('/user/dashboard')->with('success', 'Registration successful! Welcome to Infinite Education!');
    }

    public function logout(Request $request)
    {
        // Get current user before logout for logging
        $user = Auth::user();
        
        // Logout the user
        Auth::logout();
        
        // Invalidate the session
        $request->session()->invalidate();
        
        // Regenerate CSRF token
        $request->session()->regenerateToken();
        
        // Clear all session data
        $request->session()->flush();
        
        // Log the logout (optional)
        \Log::info('User logged out', ['user_id' => $user?->id, 'email' => $user?->email]);
        
        return redirect('/')->with('success', 'Logged out successfully!');
    }

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

    public function enrollCourse(Request $request, $id)
    {
        if (!Auth::check()) {
            return redirect()->route('login')->with('message', 'Please login to enroll in courses');
        }

        $course = Course::findOrFail($id);
        $user = Auth::user();

        // Check if already enrolled
        $existingEnrollment = Enrollment::where('user_id', $user->id)
            ->where('course_id', $course->id)
            ->first();

        if ($existingEnrollment) {
            return back()->with('error', 'You are already enrolled in this course');
        }

        // Create enrollment
        Enrollment::create([
            'user_id' => $user->id,
            'course_id' => $course->id,
            'enrolled_at' => now(),
            'status' => 'active'
        ]);

        return redirect()->route('user.dashboard')->with('success', 'Successfully enrolled in ' . $course->title);
    }

    public function addToCart(Request $request, $id)
    {
        if (!Auth::check()) {
            return redirect()->route('login')->with('message', 'Please login to add courses to cart');
        }

        $course = Course::findOrFail($id);
        $user = Auth::user();

        // Get cart from session
        $cart = session()->get('cart', []);

        // Check if already in cart
        if (isset($cart[$course->id])) {
            return back()->with('error', 'Course is already in your cart');
        }

        // Add to cart
        $cart[$course->id] = [
            'id' => $course->id,
            'title' => $course->title,
            'price' => $course->price,
            'is_free' => $course->is_free,
            'instructor' => $course->instructor->name,
            'category' => $course->category->name,
            'image' => $course->image,
            'added_at' => now()
        ];

        session()->put('cart', $cart);

        return back()->with('success', 'Course added to cart successfully');
    }

    public function cart(Request $request)
    {
        if (!Auth::check()) {
            return redirect()->route('login')->with('message', 'Please login to view your cart');
        }

        $cart = session()->get('cart', []);
        $total = collect($cart)->sum(function ($item) {
            return $item['is_free'] ? 0 : $item['price'];
        });

        return Inertia::render('cart', [
            'cart' => array_values($cart),
            'total' => $total,
            'count' => count($cart)
        ]);
    }

    public function removeFromCart(Request $request, $courseId)
    {
        $cart = session()->get('cart', []);

        if (isset($cart[$courseId])) {
            unset($cart[$courseId]);
            session()->put('cart', $cart);
        }

        return back()->with('success', 'Course removed from cart');
    }

    public function checkout(Request $request)
    {
        if (!Auth::check()) {
            return redirect()->route('login')->with('message', 'Please login to checkout');
        }

        $cart = session()->get('cart', []);

        if (empty($cart)) {
            return back()->with('error', 'Your cart is empty');
        }

        $user = Auth::user();
        $total = collect($cart)->sum(function ($item) {
            return $item['is_free'] ? 0 : $item['price'];
        });

        // Process payment and enrollments (simplified for demo)
        foreach ($cart as $courseId => $item) {
            // Check if already enrolled
            $existingEnrollment = Enrollment::where('user_id', $user->id)
                ->where('course_id', $courseId)
                ->first();

            if (!$existingEnrollment) {
                // Create enrollment
                Enrollment::create([
                    'user_id' => $user->id,
                    'course_id' => $courseId,
                    'enrolled_at' => now(),
                    'status' => 'active'
                ]);
            }
        }

        // Clear cart
        session()->forget('cart');

        return redirect()->route('user.dashboard')->with('success', 'Payment successful! You are now enrolled in all courses.');
    }
}
