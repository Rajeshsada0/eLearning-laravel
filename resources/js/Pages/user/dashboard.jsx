import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import { 
    Home,
    BookOpen,
    FileText,
    TrendingUp,
    Users,
    Settings,
    HelpCircle,
    LogOut,
    Menu,
    X,
    GraduationCap,
    Clock,
    Award,
    Target,
    Activity,
    Calendar,
    Star,
    ChevronRight,
    BarChart3,
    Brain,
    Globe
} from 'lucide-react';

export default function Dashboard({ enrolledCourses, recentTests, progress, stats, recommendedCourses, upcomingTests }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { auth } = usePage().props;

    const menuItems = [
        {
            title: 'Dashboard',
            icon: Home,
            href: '/user/dashboard'
        },
        {
            title: 'My Courses',
            icon: BookOpen,
            href: '/user/courses'
        },
        {
            title: 'Tests',
            icon: FileText,
            href: '/user/tests'
        },
        {
            title: 'Current Affairs',
            icon: Globe,
            href: '/user/current-affairs'
        },
        {
            title: 'Study Materials',
            icon: Brain,
            href: '/user/study-materials'
        },
        {
            title: 'Progress',
            icon: TrendingUp,
            href: '/user/progress'
        },
        {
            title: 'Profile',
            icon: Users,
            href: '/user/profile'
        },
        {
            title: 'Settings',
            icon: Settings,
            href: '/user/settings'
        },
        {
            title: 'Support',
            icon: HelpCircle,
            href: '/user/support'
        }
    ];

    const isActive = (href) => {
        return window.location.pathname === href;
    };

    return (
        <>
            <Head title="Dashboard - Infinite Education" />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
                {/* Mobile Menu Toggle */}
                <div className="lg:hidden fixed top-4 left-4 z-50">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                    >
                        {isSidebarOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
                    </button>
                </div>

                {/* Sidebar */}
                <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:inset-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="flex flex-col h-full">
                        {/* Sidebar Header */}
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <GraduationCap className="w-5 h-5 text-gray-700" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">Infinite</h2>
                                    <p className="text-sm text-gray-500">Student Portal</p>
                                </div>
                            </div>
                        </div>

                        {/* User Info */}
                        {/* <div className="p-4 border-b border-gray-100">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                    <Users className="w-4 h-4 text-gray-600" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-900">{auth?.user?.name || 'Student'}</div>
                                    <div className="text-xs text-gray-500">{auth?.user?.email || 'student@example.com'}</div>
                                </div>
                            </div>
                        </div> */}

                        {/* Navigation Menu */}
                        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                        isActive(item.href)
                                            ? 'bg-gray-100 text-gray-900 border-l-2 border-gray-900'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                >
                                    <item.icon className="w-4 h-4" />
                                    <span>{item.title}</span>
                                </Link>
                            ))}
                        </nav>

                        {/* Logout Button */}
                        <div className="p-4 border-t border-gray-100">
                            <Link
                                href="/logout"
                                method="post"
                                className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all duration-200"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Logout</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 lg:ml-0 overflow-hidden">
                    {/* Top Navigation */}
                    <div className="bg-white shadow-sm border-b border-gray-200">
                        <div className="px-4 sm:px-6 lg:px-8 py-4">
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                                <div className="flex items-center space-x-4">
                                    <div className="text-sm text-gray-600">
                                        Welcome back, {auth?.user?.name || 'Student'}!
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Content */}
                    <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto h-full">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Enrolled Courses</p>
                                        <p className="text-3xl font-bold text-gray-900">{stats?.enrolled_courses || 0}</p>
                                        <p className="text-sm text-blue-600 mt-1">Active learning</p>
                                    </div>
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <BookOpen className="w-6 h-6 text-blue-600" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Completed Courses</p>
                                        <p className="text-3xl font-bold text-gray-900">{stats?.completed_courses || 0}</p>
                                        <p className="text-sm text-green-600 mt-1">Achievements</p>
                                    </div>
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                        <Award className="w-6 h-6 text-green-600" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-500">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Tests Taken</p>
                                        <p className="text-3xl font-bold text-gray-900">{stats?.tests_taken || 0}</p>
                                        <p className="text-sm text-purple-600 mt-1">Practice</p>
                                    </div>
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                        <FileText className="w-6 h-6 text-purple-600" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-orange-500">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Average Score</p>
                                        <p className="text-3xl font-bold text-gray-900">{Math.round(stats?.average_score || 0)}%</p>
                                        <p className="text-sm text-orange-600 mt-1">Performance</p>
                                    </div>
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                        <Target className="w-6 h-6 text-orange-600" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Courses and Tests */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                            {/* Recent Courses */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-blue-600" />
                                    Recent Courses
                                </h3>
                                <div className="space-y-4">
                                    {enrolledCourses?.slice(0, 3).map((enrollment) => (
                                        <div key={enrollment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <BookOpen className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">{enrollment.course?.title}</div>
                                                    <div className="text-sm text-gray-600">{enrollment.course?.instructor?.name}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm text-gray-600">Progress</div>
                                                <div className="font-medium text-blue-600">
                                                    {progress?.[enrollment.course?.id]?.percentage || 0}%
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Tests */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-green-600" />
                                    Recent Tests
                                </h3>
                                <div className="space-y-4">
                                    {recentTests?.slice(0, 3).map((test) => (
                                        <div key={test.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                                    <FileText className="w-5 h-5 text-green-600" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">{test.mock_test?.title}</div>
                                                    <div className="text-sm text-gray-600">{new Date(test.created_at).toLocaleDateString()}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm text-gray-600">Score</div>
                                                <div className="font-medium text-green-600">{test.percentage}%</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-purple-600" />
                                Quick Actions
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Link href="/courses" className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                        <BookOpen className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">Browse Courses</div>
                                        <div className="text-sm text-gray-600">Explore new courses</div>
                                    </div>
                                </Link>
                                <Link href="/tests" className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                        <FileText className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">Take Tests</div>
                                        <div className="text-sm text-gray-600">Practice mock tests</div>
                                    </div>
                                </Link>
                                <Link href="/user/profile" className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                                        <Users className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">Update Profile</div>
                                        <div className="text-sm text-gray-600">Manage your account</div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Sidebar Overlay */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}
            </div>
        </>
    );
}
