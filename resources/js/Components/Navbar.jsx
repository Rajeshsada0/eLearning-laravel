import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { url } = usePage();

    const isActive = (path) => {
        return url === path || url.startsWith(path + '/');
    };

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">M</span>
                        </div>
                        <span className="text-xl font-bold text-gray-800">Mindpyxle Academy</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link 
                            href="/" 
                            className={`font-medium transition ${isActive('/') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                        >
                            Home
                        </Link>
                        <Link 
                            href="/courses" 
                            className={`font-medium transition ${isActive('/courses') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                        >
                            Courses
                        </Link>
                        <Link 
                            href="/tests" 
                            className={`font-medium transition ${isActive('/tests') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                        >
                            Tests
                        </Link>
                        <Link 
                            href="/current-affairs" 
                            className={`font-medium transition ${isActive('/current-affairs') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                        >
                            Current Affairs
                        </Link>
                        <Link 
                            href="/about" 
                            className={`font-medium transition ${isActive('/about') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                        >
                            About
                        </Link>
                        <Link 
                            href="/contact" 
                            className={`font-medium transition ${isActive('/contact') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                        >
                            Contact
                        </Link>
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link 
                            href="/login" 
                            className="text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
                        >
                            Login
                        </Link>
                        <Link 
                            href="/register" 
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Sign Up
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200">
                        <div className="flex flex-col space-y-3">
                            <Link 
                                href="/" 
                                className={`font-medium transition ${isActive('/') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link 
                                href="/courses" 
                                className={`font-medium transition ${isActive('/courses') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Courses
                            </Link>
                            <Link 
                                href="/tests" 
                                className={`font-medium transition ${isActive('/tests') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Tests
                            </Link>
                            <Link 
                                href="/current-affairs" 
                                className={`font-medium transition ${isActive('/current-affairs') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Current Affairs
                            </Link>
                            <Link 
                                href="/about" 
                                className={`font-medium transition ${isActive('/about') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                About
                            </Link>
                            <Link 
                                href="/contact" 
                                className={`font-medium transition ${isActive('/contact') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contact
                            </Link>
                            <div className="pt-4 border-t border-gray-200 space-y-3">
                                <Link 
                                    href="/login" 
                                    className="block text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition text-center"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link 
                                    href="/register" 
                                    className="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-center"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
