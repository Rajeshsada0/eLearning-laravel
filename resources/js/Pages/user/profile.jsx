import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import { 
    User, 
    Mail, 
    Phone, 
    Calendar, 
    MapPin, 
    Edit,
    Shield,
    BookOpen,
    Award,
    TrendingUp
} from 'lucide-react';

export default function Profile() {
    const { user } = usePage().props;

    return (
        <>
            <Head title="My Profile - Mindpyxle Academy" />
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                    <User className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl lg:text-3xl font-bold">My Profile</h1>
                                    <p className="text-blue-100">Manage your personal information and preferences</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Content */}
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Profile Info */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Personal Information */}
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                            <User className="w-5 h-5 text-blue-600" />
                                            Personal Information
                                        </h2>
                                        <button className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                                            <Edit className="w-4 h-4" />
                                            Edit
                                        </button>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                            <div className="text-gray-900 font-medium">{user.name || 'N/A'}</div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                            <div className="text-gray-900 font-medium">{user.email || 'N/A'}</div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                            <div className="text-gray-900 font-medium">{user.phone || 'Not provided'}</div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                                            <div className="text-gray-900 font-medium">
                                                {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Account Statistics */}
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-green-600" />
                                        Account Statistics
                                    </h2>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                                            <div className="text-2xl font-bold text-blue-600">12</div>
                                            <div className="text-sm text-gray-600">Courses Enrolled</div>
                                        </div>
                                        <div className="text-center p-4 bg-green-50 rounded-lg">
                                            <div className="text-2xl font-bold text-green-600">85%</div>
                                            <div className="text-sm text-gray-600">Completion Rate</div>
                                        </div>
                                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                                            <div className="text-2xl font-bold text-purple-600">24</div>
                                            <div className="text-sm text-gray-600">Tests Taken</div>
                                        </div>
                                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                                            <div className="text-2xl font-bold text-orange-600">156</div>
                                            <div className="text-sm text-gray-600">Study Hours</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Learning Progress */}
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        <BookOpen className="w-5 h-5 text-purple-600" />
                                        Recent Activity
                                    </h2>
                                    
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <BookOpen className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">JavaScript Fundamentals</div>
                                                    <div className="text-sm text-gray-600">Course</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm text-gray-600">Last accessed</div>
                                                <div className="font-medium text-gray-900">2 hours ago</div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                                    <Award className="w-5 h-5 text-green-600" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">React Basics Test</div>
                                                    <div className="text-sm text-gray-600">Test Score</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm text-gray-600">Score</div>
                                                <div className="font-medium text-green-600">92%</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Quick Actions */}
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-blue-600" />
                                        Quick Actions
                                    </h3>
                                    
                                    <div className="space-y-3">
                                        <a href="/user/settings" className="block w-full text-left px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                                            Account Settings
                                        </a>
                                        <a href="/user/courses" className="block w-full text-left px-4 py-3 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors">
                                            My Courses
                                        </a>
                                        <a href="/user/tests" className="block w-full text-left px-4 py-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                                            Test Results
                                        </a>
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Mail className="w-5 h-5 text-green-600" />
                                        Contact Information
                                    </h3>
                                    
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <Mail className="w-4 h-4 text-gray-600" />
                                            <span className="text-gray-700">{user.email || 'N/A'}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Phone className="w-4 h-4 text-gray-600" />
                                            <span className="text-gray-700">{user.phone || 'Not provided'}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <MapPin className="w-4 h-4 text-gray-600" />
                                            <span className="text-gray-700">Not provided</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Account Status */}
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-green-600" />
                                        Account Status
                                    </h3>
                                    
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-700">Account Type</span>
                                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Student</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-700">Status</span>
                                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Active</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-700">Email Verified</span>
                                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Yes</span>
                                        </div>
                                    </div>
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
