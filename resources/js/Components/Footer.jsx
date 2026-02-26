import React from 'react';
import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">M</span>
                            </div>
                            <span className="text-xl font-bold">Mindpyxle Academy</span>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Empowering students to achieve their academic dreams through quality education and comprehensive exam preparation.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-700 transition">
                                <span className="text-sm">f</span>
                            </a>
                            <a href="#" className="bg-sky-500 w-10 h-10 rounded-full flex items-center justify-center hover:bg-sky-600 transition">
                                <span className="text-sm">𝕏</span>
                            </a>
                            <a href="#" className="bg-pink-600 w-10 h-10 rounded-full flex items-center justify-center hover:bg-pink-700 transition">
                                <span className="text-sm">📷</span>
                            </a>
                            <a href="#" className="bg-red-600 w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-700 transition">
                                <span className="text-sm">▶</span>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-white transition">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/courses" className="text-gray-400 hover:text-white transition">
                                    Courses
                                </Link>
                            </li>
                            <li>
                                <Link href="/tests" className="text-gray-400 hover:text-white transition">
                                    Mock Tests
                                </Link>
                            </li>
                            <li>
                                <Link href="/current-affairs" className="text-gray-400 hover:text-white transition">
                                    Current Affairs
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-400 hover:text-white transition">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-400 hover:text-white transition">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Exam Categories</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/courses?category=1" className="text-gray-400 hover:text-white transition">
                                    UPSC
                                </Link>
                            </li>
                            <li>
                                <Link href="/courses?category=2" className="text-gray-400 hover:text-white transition">
                                    SSC
                                </Link>
                            </li>
                            <li>
                                <Link href="/courses?category=3" className="text-gray-400 hover:text-white transition">
                                    Banking
                                </Link>
                            </li>
                            <li>
                                <Link href="/courses?category=4" className="text-gray-400 hover:text-white transition">
                                    Railway
                                </Link>
                            </li>
                            <li>
                                <Link href="/courses?category=5" className="text-gray-400 hover:text-white transition">
                                    Defense
                                </Link>
                            </li>
                            <li>
                                <Link href="/courses" className="text-gray-400 hover:text-white transition">
                                    View All
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <span className="text-blue-400">📍</span>
                                <span className="text-gray-400">
                                    123 Education Street<br />
                                    Knowledge City, KC 12345<br />
                                    India
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-blue-400">📞</span>
                                <span className="text-gray-400">+91 98765 43210</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-blue-400">✉️</span>
                                <span className="text-gray-400">info@mindpyxle.com</span>
                            </div>
                        </div>
                        
                        {/* Newsletter */}
                        <div className="mt-6">
                            <h4 className="font-semibold mb-2">Subscribe to Newsletter</h4>
                            <div className="flex space-x-2">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-blue-500"
                                />
                                <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">
                                    →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-gray-400 text-sm">
                            © 2024 Mindpyxle Academy. All rights reserved.
                        </div>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition">
                                Terms of Service
                            </Link>
                            <Link href="/refund" className="text-gray-400 hover:text-white text-sm transition">
                                Refund Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
