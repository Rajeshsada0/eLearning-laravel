import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import UserSidebar from '../../Components/UserSidebar';
import { 
    TrendingUp,
    Clock,
    BookOpen,
    Award,
    Target,
    Calendar,
    CheckCircle,
    Circle,
    BarChart3,
    Activity,
    Users,
    Play
} from 'lucide-react';

export default function Progress({ courseProgress, overallStats }) {
    const formatTime = (seconds) => {
        if (!seconds) return '0m';
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        }
        return `${minutes}m`;
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <>
            {/* <Head title="My Progress - Infinite Education" />
            <Navbar /> */}
            
            <div className="min-h-screen bg-gray-50 flex">
                <UserSidebar />
                
                <div className="flex-1 lg:ml-0">
                    <div className="container mx-auto px-4 py-8">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Progress</h1>
                            <p className="text-gray-600">Track your learning journey and achievements</p>
                        </div>

                        {/* Overall Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <BookOpen className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <span className="text-2xl font-bold text-gray-900">{overallStats.total_courses}</span>
                                </div>
                                <h3 className="text-gray-600 text-sm font-medium">Total Courses</h3>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                        <CheckCircle className="w-6 h-6 text-green-600" />
                                    </div>
                                    <span className="text-2xl font-bold text-gray-900">{overallStats.completed_courses}</span>
                                </div>
                                <h3 className="text-gray-600 text-sm font-medium">Completed Courses</h3>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <Target className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <span className="text-2xl font-bold text-gray-900">{overallStats.overall_progress}%</span>
                                </div>
                                <h3 className="text-gray-600 text-sm font-medium">Overall Progress</h3>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <Clock className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <span className="text-2xl font-bold text-gray-900">{formatTime(overallStats.total_time_spent)}</span>
                                </div>
                                <h3 className="text-gray-600 text-sm font-medium">Time Spent</h3>
                            </div>
                        </div>

                        {/* Progress Overview */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
                                Learning Progress Overview
                            </h2>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Topics Progress</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Completed Topics</span>
                                            <span className="font-semibold text-gray-900">{overallStats.completed_topics} / {overallStats.total_topics}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div 
                                                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                                                style={{ width: `${overallStats.overall_progress}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            {overallStats.total_topics - overallStats.completed_topics} topics remaining
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Course Status</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600 flex items-center">
                                                <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                                                Completed
                                            </span>
                                            <span className="font-semibold text-gray-900">{overallStats.completed_courses}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600 flex items-center">
                                                <Activity className="w-4 h-4 mr-2 text-blue-600" />
                                                In Progress
                                            </span>
                                            <span className="font-semibold text-gray-900">{overallStats.in_progress_courses}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600 flex items-center">
                                                <Circle className="w-4 h-4 mr-2 text-gray-400" />
                                                Not Started
                                            </span>
                                            <span className="font-semibold text-gray-900">0</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Course Progress Details */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
                                Course Progress Details
                            </h2>

                            {courseProgress.length > 0 ? (
                                <div className="space-y-6">
                                    {courseProgress.map((progress, index) => (
                                        <div key={index} className="border border-gray-200 rounded-lg p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                                                        <BookOpen className="w-5 h-5 text-white" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900">{progress.course.title}</h3>
                                                        <p className="text-sm text-gray-600">Enrolled: {formatDate(progress.enrollment_date)}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                                        progress.is_completed 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-blue-100 text-blue-800'
                                                    }`}>
                                                        {progress.is_completed ? (
                                                            <>
                                                                <CheckCircle className="w-4 h-4 mr-1" />
                                                                Completed
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Activity className="w-4 h-4 mr-1" />
                                                                In Progress
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                                                        <span>Topics Progress</span>
                                                        <span>{progress.completed_topics} / {progress.total_topics} ({progress.progress_percentage}%)</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div 
                                                            className={`h-2 rounded-full transition-all duration-500 ${
                                                                progress.is_completed 
                                                                    ? 'bg-green-600' 
                                                                    : 'bg-blue-600'
                                                            }`}
                                                            style={{ width: `${progress.progress_percentage}%` }}
                                                        ></div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between text-sm">
                                                    <div className="flex items-center text-gray-600">
                                                        <Clock className="w-4 h-4 mr-1" />
                                                        Time Spent: {formatTime(progress.time_spent)}
                                                    </div>
                                                    <Link
                                                        href={`/user/courses/${progress.course.id}/learn`}
                                                        className="text-blue-600 hover:text-blue-800 flex items-center"
                                                    >
                                                        <Play className="w-4 h-4 mr-1" />
                                                        Continue Learning
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <TrendingUp className="w-10 h-10 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No progress data available</h3>
                                    <p className="text-gray-600 mb-4">Start learning to see your progress here</p>
                                    <Link
                                        href="/courses"
                                        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                                    >
                                        Browse Courses
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
