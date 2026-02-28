import React, { useState, useRef, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    User, 
    Settings, 
    LogOut, 
    ChevronDown, 
    BookOpen, 
    FileText, 
    MessageSquare, 
    Shield,
    TrendingUp,
    Menu,
    X
} from 'lucide-react';
import { router } from '@inertiajs/react';

export default function NavbarSimple() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    
    // Try different approach to get auth data
    const page = usePage();
    const auth = page.props.auth;
    const url = page.props.url;

    const isActive = (path) => {
        if (!url) return false;
        return url === path || url.startsWith(path + '/');
    };

    // More robust authentication check
    const isAuthenticated = auth && auth.user && typeof auth.user === 'object' && auth.user.id;

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">M</span>
                        </div>
                        <span className="text-xl font-bold text-gray-800">
                            Mindpyxle Academy
                        </span>
                    </Link>

                    {/* Desktop navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/"
                            className={`font-medium ${
                                isActive('/') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                            }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/courses"
                            className={`font-medium ${
                                isActive('/courses') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                            }`}
                        >
                            Courses
                        </Link>
                        <Link
                            href="/tests"
                            className={`font-medium ${
                                isActive('/tests') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                            }`}
                        >
                            Tests
                        </Link>
                        <Link
                            href="/current-affairs"
                            className={`font-medium ${
                                isActive('/current-affairs')
                                    ? 'text-blue-600'
                                    : 'text-gray-700 hover:text-blue-600'
                            }`}
                        >
                            Current Affairs
                        </Link>
                        <Link
                            href="/about"
                            className={`font-medium ${
                                isActive('/about') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                            }`}
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className={`font-medium ${
                                isActive('/contact') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                            }`}
                        >
                            Contact
                        </Link>
                    </div>

                    {/* Desktop auth buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        {isAuthenticated ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                    className="flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                        <User className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="font-medium">
                                        {auth.user.name || 'User'}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                                        isProfileDropdownOpen ? 'rotate-180' : ''
                                    }`} />
                                </button>

                                {/* Profile Dropdown */}
                                {isProfileDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
                                        {/* User Info Header */}
                                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                                    <User className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <div className="text-white font-semibold">
                                                        {auth.user.name || 'User'}
                                                    </div>
                                                    <div className="text-white/80 text-sm">
                                                        {auth.user.email || 'user@example.com'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Quick Stats */}
                                        <div className="p-4 border-b border-gray-100">
                                            <div className="grid grid-cols-3 gap-4 text-center">
                                                <div>
                                                    <div className="text-2xl font-bold text-blue-600">12</div>
                                                    <div className="text-xs text-gray-600">Courses</div>
                                                </div>
                                                <div>
                                                    <div className="text-2xl font-bold text-green-600">85%</div>
                                                    <div className="text-xs text-gray-600">Progress</div>
                                                </div>
                                                <div>
                                                    <div className="text-2xl font-bold text-purple-600">24</div>
                                                    <div className="text-xs text-gray-600">Tests</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Menu Items */}
                                        <div className="py-2">
                                            <Link
                                                href="/user/profile"
                                                className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                                                onClick={() => setIsProfileDropdownOpen(false)}
                                            >
                                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                                    <User className="w-4 h-4 text-blue-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-medium text-gray-900">My Profile</div>
                                                    <div className="text-sm text-gray-500">Manage your personal information</div>
                                                </div>
                                            </Link>

                                            <Link
                                                href="/user/dashboard"
                                                className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                                                onClick={() => setIsProfileDropdownOpen(false)}
                                            >
                                                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                                                    <TrendingUp className="w-4 h-4 text-purple-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-medium text-gray-900">Dashboard</div>
                                                    <div className="text-sm text-gray-500">View your learning progress</div>
                                                </div>
                                            </Link>

                                            <Link
                                                href="/user/courses"
                                                className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                                                onClick={() => setIsProfileDropdownOpen(false)}
                                            >
                                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                                                    <BookOpen className="w-4 h-4 text-green-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-medium text-gray-900">My Courses</div>
                                                    <div className="text-sm text-gray-500">Access your enrolled courses</div>
                                                </div>
                                            </Link>

                                            <Link
                                                href="/user/tests"
                                                className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                                                onClick={() => setIsProfileDropdownOpen(false)}
                                            >
                                                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                                                    <FileText className="w-4 h-4 text-orange-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-medium text-gray-900">Test Results</div>
                                                    <div className="text-sm text-gray-500">View your test scores</div>
                                                </div>
                                            </Link>

                                            <Link
                                                href="/user/settings"
                                                className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                                                onClick={() => setIsProfileDropdownOpen(false)}
                                            >
                                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                                                    <Settings className="w-4 h-4 text-gray-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-medium text-gray-900">Settings</div>
                                                    <div className="text-sm text-gray-500">Manage account preferences</div>
                                                </div>
                                            </Link>

                                            <Link
                                                href="/user/support"
                                                className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                                                onClick={() => setIsProfileDropdownOpen(false)}
                                            >
                                                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                                                    <MessageSquare className="w-4 h-4 text-indigo-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-medium text-gray-900">Support</div>
                                                    <div className="text-sm text-gray-500">Get help and support</div>
                                                </div>
                                            </Link>
                                        </div>

                                        {/* Logout Button */}
                                        <div className="p-2 border-t border-gray-100">
                                            <button
                                                onClick={() => {
                                                    setIsProfileDropdownOpen(false);
                                                    router.post('/logout');
                                                }}
                                                className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors group"
                                            >
                                                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                                                    <LogOut className="w-4 h-4 text-red-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-medium">Logout</div>
                                                    <div className="text-sm text-gray-500">Sign out of your account</div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu toggle */}
                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200">
                        <div className="flex flex-col space-y-3">
                            <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                            <Link href="/courses" onClick={() => setIsMenuOpen(false)}>Courses</Link>
                            <Link href="/tests" onClick={() => setIsMenuOpen(false)}>Tests</Link>
                            <Link href="/current-affairs" onClick={() => setIsMenuOpen(false)}>Current Affairs</Link>
                            <Link href="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
                            <Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>

                            <div className="pt-4 mt-4 border-t border-gray-200">
                                {isAuthenticated ? (
                                    <div className="space-y-3">
                                        {/* Mobile User Info */}
                                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                                    <User className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <div className="font-semibold">
                                                        {auth.user.name || 'User'}
                                                    </div>
                                                    <div className="text-white/80 text-sm">
                                                        {auth.user.email || 'user@example.com'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Mobile Menu Items */}
                                        <Link
                                            href="/user/profile"
                                            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <User className="w-5 h-5 text-blue-600" />
                                            <span>My Profile</span>
                                        </Link>

                                        <Link
                                            href="/user/dashboard"
                                            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <TrendingUp className="w-5 h-5 text-purple-600" />
                                            <span>Dashboard</span>
                                        </Link>

                                        <Link
                                            href="/user/courses"
                                            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <BookOpen className="w-5 h-5 text-green-600" />
                                            <span>My Courses</span>
                                        </Link>

                                        <Link
                                            href="/user/tests"
                                            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <FileText className="w-5 h-5 text-orange-600" />
                                            <span>Test Results</span>
                                        </Link>

                                        <Link
                                            href="/user/settings"
                                            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <Settings className="w-5 h-5 text-gray-600" />
                                            <span>Settings</span>
                                        </Link>

                                        <Link
                                            href="/user/support"
                                            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <MessageSquare className="w-5 h-5 text-indigo-600" />
                                            <span>Support</span>
                                        </Link>

                                        <button
                                            onClick={() => {
                                                setIsMenuOpen(false);
                                                router.post('/logout');
                                            }}
                                            className="flex items-center space-x-3 p-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                        >
                                            <LogOut className="w-5 h-5 text-red-600" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <Link
                                            href="/login"
                                            className="block text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 text-center"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 text-center"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Sign Up
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}