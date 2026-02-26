import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function Welcome({ courses, featuredCourses, categories, currentAffairs, upcomingTests }) {
    return (
        <>
            <Head title="Welcome to Mindpyxle Academy" />
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <h1 className="text-5xl font-bold mb-6">
                                Welcome to Mindpyxle Academy
                            </h1>
                            <p className="text-xl mb-8">
                                Excel in your exams with comprehensive courses, mock tests, and expert guidance
                            </p>
                            <div className="space-x-4">
                                <Link href="/courses" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                                    Browse Courses
                                </Link>
                                <Link href="/tests" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
                                    Take Tests
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Courses */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">Featured Courses</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredCourses.map(course => (
                                <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                                    <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-blue-600 font-semibold">
                                                {course.category?.name}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {course.type}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                                        <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl font-bold text-green-600">
                                                {course.is_free ? 'Free' : `₹${course.price}`}
                                            </span>
                                            <Link 
                                                href={`/courses/${course.id}`}
                                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-8">
                            <Link href="/courses" className="text-blue-600 hover:text-blue-800 font-semibold">
                                View All Courses →
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Categories */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">Exam Categories</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {categories.map(category => (
                                <Link 
                                    key={category.id}
                                    href={`/courses?category=${category.id}`}
                                    className="bg-gray-100 p-6 rounded-lg text-center hover:bg-blue-100 transition"
                                >
                                    <div className="text-3xl mb-3">📚</div>
                                    <h3 className="font-semibold text-gray-800">{category.name}</h3>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Current Affairs */}
                {currentAffairs.length > 0 && (
                    <section className="py-16">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl font-bold text-center mb-12">Latest Current Affairs</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {currentAffairs.map(affair => (
                                    <div key={affair.id} className="bg-white rounded-lg shadow-lg p-6">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm text-blue-600 font-semibold">
                                                {affair.category}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {new Date(affair.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">{affair.title}</h3>
                                        <p className="text-gray-600 mb-4 line-clamp-2">{affair.content}</p>
                                        <Link 
                                            href={`/current-affairs/${affair.id}`}
                                            className="text-blue-600 hover:text-blue-800 font-semibold"
                                        >
                                            Read More →
                                        </Link>
                                    </div>
                                ))}
                            </div>
                            <div className="text-center mt-8">
                                <Link href="/current-affairs" className="text-blue-600 hover:text-blue-800 font-semibold">
                                    View All Current Affairs →
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

                {/* Upcoming Tests */}
                {upcomingTests.length > 0 && (
                    <section className="py-16 bg-white">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl font-bold text-center mb-12">Upcoming Tests</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {upcomingTests.map(test => (
                                    <div key={test.id} className="bg-gray-100 rounded-lg p-6">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm text-blue-600 font-semibold">
                                                {test.category?.name}
                                            </span>
                                            <span className="text-sm text-green-600 font-semibold">
                                                {test.is_free ? 'Free' : `₹${test.price}`}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">{test.title}</h3>
                                        <p className="text-gray-600 mb-4">{test.description}</p>
                                        <div className="text-sm text-gray-500 mb-4">
                                            Starts: {new Date(test.start_time).toLocaleString()}
                                        </div>
                                        <Link 
                                            href={`/tests`}
                                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full block text-center"
                                        >
                                            Register Now
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <Footer />
            </div>
        </>
    );
}
