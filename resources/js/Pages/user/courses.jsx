import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

export default function UserCourses({ enrollments, filters }) {
    return (
        <>
            <Head title="My Courses - Mindpyxle Academy" />
            <Navbar />
            
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
                        <p className="text-gray-600">Track your learning progress</p>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <div className="flex flex-wrap gap-4">
                            <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                <option value="">All Status</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>

                    {/* Courses Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {enrollments?.data?.map(enrollment => (
                            <div key={enrollment.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg mb-2">{enrollment.course?.title}</h3>
                                    <p className="text-gray-600 text-sm mb-4">{enrollment.course?.description}</p>
                                    
                                    <div className="mb-4">
                                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                                            <span>Progress</span>
                                            <span>{enrollment.progress || 0}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-blue-600 h-2 rounded-full" 
                                                style={{ width: `${enrollment.progress || 0}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mb-4">
                                        <span className={`text-sm px-2 py-1 rounded-full ${
                                            enrollment.completed_at 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {enrollment.completed_at ? 'Completed' : 'In Progress'}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            Enrolled: {new Date(enrollment.created_at).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <Link
                                        href={`/courses/${enrollment.course_id}`}
                                        className="block w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition"
                                    >
                                        Continue Learning
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {(!enrollments?.data || enrollments.data.length === 0) && (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h3>
                            <p className="text-gray-600 mb-4">Start your learning journey by enrolling in a course</p>
                            <Link
                                href="/courses"
                                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                            >
                                Browse Courses
                            </Link>
                        </div>
                    )}

                    {/* Pagination */}
                    {enrollments?.links && (
                        <div className="mt-8 flex justify-center">
                            <div className="flex space-x-2">
                                {enrollments.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className={`px-3 py-2 rounded-md ${
                                            link.active
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}
