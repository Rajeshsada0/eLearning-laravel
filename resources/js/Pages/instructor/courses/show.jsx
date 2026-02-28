import React from 'react';
import { Link } from '@inertiajs/react';
import InstructorLayout from '../../../Components/InstructorLayout';

function ShowCourse({ course }) {
    return (
        <InstructorLayout title={course.title}>
            <div className="mb-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
                        <p className="text-gray-600">Course details and management</p>
                    </div>
                    <div className="space-x-3">
                        <Link
                            href={`/instructor/courses/${course.id}/edit`}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Edit Course
                        </Link>
                        <Link
                            href="/instructor/courses"
                            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
                        >
                            Back to Courses
                        </Link>
                    </div>
                </div>
            </div>

            {/* Course Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Overview</h2>
                        
                        {course.thumbnail && (
                            <div className="mb-6">
                                <img 
                                    src={course.thumbnail} 
                                    alt={course.title}
                                    className="w-full h-64 object-cover rounded-lg"
                                />
                            </div>
                        )}
                        
                        <div className="prose max-w-none">
                            <p className="text-gray-700 leading-relaxed">{course.description}</p>
                        </div>

                        {course.what_you_learn && (
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">What You'll Learn</h3>
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <p className="text-gray-700">{course.what_you_learn}</p>
                                </div>
                            </div>
                        )}

                        {course.requirements && (
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <p className="text-gray-700">{course.requirements}</p>
                                </div>
                            </div>
                        )}

                        {course.target_audience && (
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Target Audience</h3>
                                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                    <p className="text-gray-700">{course.target_audience}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Course Topics */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Topics</h2>
                        {course.topics && course.topics.length > 0 ? (
                            <div className="space-y-4">
                                {course.topics.map((topic, index) => (
                                    <div key={topic.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                    <span className="text-green-600 font-medium text-sm">{index + 1}</span>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-900">{topic.title}</h4>
                                                    <p className="text-sm text-gray-600">{topic.description}</p>
                                                </div>
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {topic.duration || 'N/A'} min
                                            </div>
                                        </div>

                                        {/* Video URL */}
                                        {topic.video_url && (
                                            <div className="mb-3">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-sm font-medium text-gray-700">Video:</span>
                                                    <a
                                                        href={topic.video_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-red-600 hover:text-red-800 transition text-sm flex items-center space-x-1"
                                                    >
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545c-7.473 0-12.498 2.505-13.376 2.505a3.016 3.016 0 0 0-2.122 2.136C3.502 9.593 3 12.293 3 14.622s.502 5.03 2.502 6.436a3.016 3.016 0 0 0 2.122 2.136c.878.0 5.903 2.505 13.376 2.505 7.473 0 12.498-2.505 13.376-2.505a3.016 3.016 0 0 0 2.122-2.136C20.498 15.407 21 12.707 21 10.378s-.502-5.03-2.502-6.436zM9.545 10.378c0-1.414 1.122-2.565 2.505-2.565 1.383 0 2.505 1.151 2.505 2.565 0 1.414-1.122 2.565-2.505 2.565-1.383 0-2.505-1.151-2.505-2.565zm5.91 4.545c0-1.414 1.122-2.565 2.505-2.565 1.383 0 2.505 1.151 2.505 2.565 0 1.414-1.122 2.565-2.505 2.565-1.383 0-2.505-1.151-2.505-2.565z"/>
                                                        </svg>
                                                        Watch Video
                                                    </a>
                                                </div>
                                            </div>
                                        )}

                                        {/* Notes */}
                                        {topic.notes && (
                                            <div className="mb-3">
                                                <span className="text-sm font-medium text-gray-700">Notes:</span>
                                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-1">
                                                    <p className="text-sm text-gray-700">{topic.notes}</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Files */}
                                        {topic.files && topic.files.length > 0 && (
                                            <div className="mb-3">
                                                <span className="text-sm font-medium text-gray-700">Files:</span>
                                                <div className="space-y-2 mt-1">
                                                    {topic.files.map((file, fileIndex) => (
                                                        <div key={fileIndex} className="flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-200">
                                                            <div className="flex items-center space-x-2">
                                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                </svg>
                                                                <a
                                                                    href={file.url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-blue-600 hover:text-blue-800 transition text-sm font-medium"
                                                                >
                                                                    {file.original_name}
                                                                </a>
                                                                <span className="text-xs text-gray-500">
                                                                    ({file.formatted_size})
                                                                </span>
                                                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                                                    {file.mime_type.split('/')[1]?.toUpperCase() || 'FILE'}
                                                                </span>
                                                            </div>
                                                            <a
                                                                href={file.url}
                                                                download={file.original_name}
                                                                className="text-green-600 hover:text-green-800 transition"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                </svg>
                                                            </a>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <p className="text-gray-600">No topics added yet</p>
                                <p className="text-sm text-gray-500 mt-1">Start adding topics to structure your course</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    {/* Course Info */}
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Information</h3>
                        
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Category:</span>
                                <span className="font-medium text-gray-900">{course.category?.name || 'N/A'}</span>
                            </div>
                            
                            <div className="flex justify-between">
                                <span className="text-gray-600">Level:</span>
                                <span className="font-medium text-gray-900 capitalize">{course.level || 'N/A'}</span>
                            </div>
                            
                            <div className="flex justify-between">
                                <span className="text-gray-600">Language:</span>
                                <span className="font-medium text-gray-900 capitalize">{course.language || 'N/A'}</span>
                            </div>
                            
                            <div className="flex justify-between">
                                <span className="text-gray-600">Duration:</span>
                                <span className="font-medium text-gray-900">{course.duration_weeks ? `${course.duration_weeks} weeks` : 'N/A'}</span>
                            </div>
                            
                            <div className="flex justify-between">
                                <span className="text-gray-600">Price:</span>
                                <span className="font-medium text-gray-900">
                                    {course.is_free ? 'Free' : `$${course.price || 0}`}
                                </span>
                            </div>
                            
                            <div className="flex justify-between">
                                <span className="text-gray-600">Status:</span>
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                    course.is_active 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {course.is_active ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Statistics */}
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h3>
                        
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total Students:</span>
                                <span className="font-medium text-gray-900">{course.enrollments?.length || 0}</span>
                            </div>
                            
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total Revenue:</span>
                                <span className="font-medium text-gray-900">${course.total_revenue || 0}</span>
                            </div>
                            
                            <div className="flex justify-between">
                                <span className="text-gray-600">Topics:</span>
                                <span className="font-medium text-gray-900">{course.topics?.length || 0}</span>
                            </div>
                        </div>
                    </div>

                    {/* Recent Enrollments */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Enrollments</h3>
                        
                        {course.enrollments && course.enrollments.length > 0 ? (
                            <div className="space-y-3">
                                {course.enrollments.slice(0, 5).map(enrollment => (
                                    <div key={enrollment.id} className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                            <span className="text-gray-600 text-sm font-medium">
                                                {enrollment.user?.name?.charAt(0)?.toUpperCase() || 'S'}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900">{enrollment.user?.name || 'Unknown'}</p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(enrollment.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600 text-center py-4">No enrollments yet</p>
                        )}
                    </div>
                </div>
            </div>
        </InstructorLayout>
    );
}

export default ShowCourse;
