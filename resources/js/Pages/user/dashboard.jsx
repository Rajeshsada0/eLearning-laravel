import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard - Mindpyxle Academy" />
            <Navbar />
            
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Stats Cards */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="p-3 bg-blue-100 rounded-full">
                                        <span className="text-2xl">📚</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Enrolled Courses</h3>
                                        <p className="text-3xl font-bold text-blue-600">12</p>
                                        <p className="text-sm text-gray-600">Active courses</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="p-3 bg-green-100 rounded-full">
                                        <span className="text-2xl">📝</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Tests Completed</h3>
                                        <p className="text-3xl font-bold text-green-600">8</p>
                                        <p className="text-sm text-gray-600">Mock tests taken</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="p-3 bg-purple-100 rounded-full">
                                        <span className="text-2xl">⏆</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Study Hours</h3>
                                        <p className="text-3xl font-bold text-purple-600">156</p>
                                        <p className="text-sm text-gray-600">Total learning time</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                        <div>
                                            <p className="font-medium">Completed: UPSC Prelims Course</p>
                                            <p className="text-sm text-gray-600">2 hours ago</p>
                                        </div>
                                        <span className="text-green-600">✓</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                        <div>
                                            <p className="font-medium">Test Score: 85%</p>
                                            <p className="text-sm text-gray-600">Mock Test #12</p>
                                        </div>
                                        <span className="text-blue-600">📊</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                                <div className="space-y-3">
                                    <Link 
                                        href="/courses" 
                                        className="block w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
                                    >
                                        <div className="flex items-center">
                                            <span className="text-blue-600 mr-3">📚</span>
                                            <span>Browse Courses</span>
                                        </div>
                                    </Link>
                                    <Link 
                                        href="/tests" 
                                        className="block w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition"
                                    >
                                        <div className="flex items-center">
                                            <span className="text-green-600 mr-3">📝</span>
                                            <span>Take Tests</span>
                                        </div>
                                    </Link>
                                    <Link 
                                        href="/current-affairs" 
                                        className="block w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition"
                                    >
                                        <div className="flex items-center">
                                            <span className="text-purple-600 mr-3">📰</span>
                                            <span>Current Affairs</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}
