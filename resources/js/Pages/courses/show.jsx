import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

export default function CourseShow({ course, relatedCourses }) {
    const isInstructor = course.instructor;
    const isEnrolled = course.enrollments && course.enrollments.length > 0;

    return (
        <>
            <Head title={`${course.title} - Mindpyxle Academy`} />
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                
                {/* Course Header */}
                <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center space-x-2 mb-4">
                                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                                    {course.category?.name}
                                </span>
                                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                                    {course.type}
                                </span>
                                {course.is_featured && (
                                    <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                                        Featured
                                    </span>
                                )}
                            </div>
                            <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
                            <p className="text-xl mb-6">{course.description}</p>
                            <div className="flex items-center space-x-6">
                                <div className="flex items-center space-x-2">
                                    <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center">
                                        <span className="text-xl">👨‍🏫</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold">{isInstructor?.name}</div>
                                        <div className="text-sm opacity-90">Instructor</div>
                                    </div>
                                </div>
                                <div className="text-3xl font-bold">
                                    {course.is_free ? 'Free' : `₹${course.price}`}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            {/* Course Content */}
                            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                                <h2 className="text-2xl font-bold mb-6">Course Content</h2>
                                {course.topics && course.topics.length > 0 ? (
                                    <div className="space-y-4">
                                        {course.topics.map((topic, index) => (
                                            <div key={topic.id} className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-3">
                                                        <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-semibold">
                                                            {index + 1}
                                                        </span>
                                                        <div>
                                                            <h3 className="font-semibold text-lg">{topic.title}</h3>
                                                            <p className="text-gray-600">{topic.description}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {topic.materials?.length || 0} materials
                                                    </div>
                                                </div>
                                                
                                                {topic.materials && topic.materials.length > 0 && (
                                                    <div className="mt-4 ml-11 space-y-2">
                                                        {topic.materials.map(material => (
                                                            <div key={material.id} className="flex items-center space-x-2 text-sm text-gray-600">
                                                                <span>
                                                                    {material.type === 'video' ? '🎥' : 
                                                                     material.type === 'pdf' ? '📄' : 
                                                                     material.type === 'link' ? '🔗' : '📎'}
                                                                </span>
                                                                <span>{material.title}</span>
                                                                <span className="text-gray-400">({material.duration || material.type})</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-600">Course content will be available soon.</p>
                                )}
                            </div>

                            {/* About Course */}
                            <div className="bg-white rounded-lg shadow-lg p-8">
                                <h2 className="text-2xl font-bold mb-6">About This Course</h2>
                                <div className="prose max-w-none">
                                    <p className="text-gray-600 leading-relaxed">
                                        {course.description || 'This comprehensive course is designed to help you excel in your exams. ' +
                                        'With expert guidance, detailed study materials, and practice tests, you\'ll be well-prepared ' +
                                        'to achieve your goals.'}
                                    </p>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-6 mt-8">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">📚</span>
                                        <div>
                                            <div className="font-semibold">Study Materials</div>
                                            <div className="text-sm text-gray-600">Comprehensive notes and resources</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">🎯</span>
                                        <div>
                                            <div className="font-semibold">Practice Tests</div>
                                            <div className="text-sm text-gray-600">Regular assessments to track progress</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">💬</span>
                                        <div>
                                            <div className="font-semibold">Doubt Support</div>
                                            <div className="text-sm text-gray-600">Get your questions answered</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">📱</span>
                                        <div>
                                            <div className="font-semibold">Mobile Access</div>
                                            <div className="text-sm text-gray-600">Learn on any device</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            {/* Enrollment Card */}
                            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
                                <div className="text-center mb-6">
                                    <div className="text-4xl font-bold text-green-600 mb-2">
                                        {course.is_free ? 'Free' : `₹${course.price}`}
                                    </div>
                                    <div className="text-gray-600">One-time payment</div>
                                </div>
                                
                                {isEnrolled ? (
                                    <div className="space-y-4">
                                        <div className="bg-green-100 text-green-800 p-4 rounded-lg text-center">
                                            <span className="font-semibold">✓ You are enrolled in this course</span>
                                        </div>
                                        <Link 
                                            href="/user/dashboard"
                                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition w-full block text-center"
                                        >
                                            Go to Dashboard
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition w-full">
                                            {course.is_free ? 'Enroll Now' : 'Buy Now'}
                                        </button>
                                        <button className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition w-full">
                                            Add to Cart
                                        </button>
                                    </div>
                                )}
                                
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="text-sm text-gray-600 space-y-2">
                                        <div className="flex justify-between">
                                            <span>Students Enrolled:</span>
                                            <span className="font-semibold">{course.enrollments?.length || 0}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Course Type:</span>
                                            <span className="font-semibold">{course.type}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Category:</span>
                                            <span className="font-semibold">{course.category?.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Language:</span>
                                            <span className="font-semibold">English</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Instructor Info */}
                            {isInstructor && (
                                <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
                                    <h3 className="text-lg font-bold mb-4">About Instructor</h3>
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="text-xl">👨‍🏫</span>
                                        </div>
                                        <div>
                                            <div className="font-semibold">{isInstructor.name}</div>
                                            <div className="text-sm text-gray-600">Expert Instructor</div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Experienced instructor dedicated to helping students achieve their academic goals.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Related Courses */}
                    {relatedCourses.length > 0 && (
                        <div className="mt-16">
                            <h2 className="text-2xl font-bold mb-8">Related Courses</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {relatedCourses.map(relatedCourse => (
                                    <div key={relatedCourse.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                                        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                                        <div className="p-4">
                                            <h4 className="font-semibold mb-2 line-clamp-2">{relatedCourse.title}</h4>
                                            <div className="flex items-center justify-between">
                                                <span className="text-green-600 font-bold">
                                                    {relatedCourse.is_free ? 'Free' : `₹${relatedCourse.price}`}
                                                </span>
                                                <Link 
                                                    href={`/courses/${relatedCourse.id}`}
                                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                                >
                                                    View →
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <Footer />
            </div>
        </>
    );
}
