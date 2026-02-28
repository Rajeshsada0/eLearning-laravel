import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import { 
    User, 
    Star, 
    Clock, 
    Users, 
    BookOpen, 
    Target, 
    MessageCircle, 
    Smartphone, 
    Play, 
    FileText, 
    Link as LinkIcon, 
    Video, 
    Award, 
    TrendingUp, 
    CheckCircle, 
    ShoppingCart, 
    GraduationCap,
    Calendar,
    Globe,
    Zap,
    Heart,
    ArrowRight
} from 'lucide-react';

export default function CourseShow({ course, relatedCourses }) {
    const isInstructor = course.instructor;
    const isEnrolled = course.enrollments && course.enrollments.length > 0;

    return (
        <>
            <Head title={`${course.title} - Mindpyxle Academy`} />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <Navbar />
                
                {/* Enhanced Course Header */}
                <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-12 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-5xl mx-auto">
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2">
                                    <BookOpen className="w-3 h-3" />
                                    {course.category?.name}
                                </span>
                                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2">
                                    <Video className="w-3 h-3" />
                                    {course.type}
                                </span>
                                {course.is_featured && (
                                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                                        <Star className="w-3 h-3" />
                                        Featured
                                    </span>
                                )}
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">{course.title}</h1>
                            <p className="text-base lg:text-lg mb-6 text-white/90 max-w-3xl">{course.description}</p>
                            
                            <div className="flex flex-wrap items-center gap-4 lg:gap-6">
                                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl">
                                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-full flex items-center justify-center">
                                        <User className="w-5 h-5 lg:w-6 lg:h-6" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-sm lg:text-base">{isInstructor?.name}</div>
                                        <div className="text-xs text-white/80">Expert Instructor</div>
                                    </div>
                                </div>
                                
                                <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl">
                                    <div className="text-2xl lg:text-3xl font-bold">
                                        {course.is_free ? 'Free' : `₹${course.price}`}
                                    </div>
                                    <div className="text-xs text-white/80">One-time payment</div>
                                </div>
                                
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl">
                                    <Users className="w-4 h-4" />
                                    <span className="font-semibold text-sm">{course.enrollments?.length || 0} Students</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute top-10 right-10 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
                    <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                </section>

                <div className="container mx-auto px-4 py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-4 lg:space-y-6">
                            {/* Enhanced Course Content */}
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 lg:p-4">
                                    <h2 className="text-lg lg:text-xl font-bold flex items-center gap-2">
                                        <BookOpen className="w-4 h-4 lg:w-5 lg:h-5" />
                                        Course Content
                                    </h2>
                                </div>
                                <div className="p-3 lg:p-4">
                                    {course.topics && course.topics.length > 0 ? (
                                        <div className="space-y-2 lg:space-y-3">
                                            {course.topics.map((topic, index) => (
                                                <div key={topic.id} className="border border-gray-200 rounded-lg p-3 lg:p-4 hover:shadow-md transition-all duration-300 hover:border-blue-300">
                                                    <div className="flex items-center justify-between mb-2 lg:mb-3">
                                                        <div className="flex items-center gap-2 lg:gap-3">
                                                            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs lg:text-sm">
                                                                {index + 1}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <h3 className="font-semibold text-sm lg:text-base text-gray-900 truncate">{topic.title}</h3>
                                                                <p className="text-gray-600 mt-1 text-xs lg:text-sm line-clamp-2">{topic.description}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-1 lg:gap-2 text-xs text-gray-500 whitespace-nowrap">
                                                            <FileText className="w-3 h-3 lg:w-4 lg:h-4" />
                                                            <span>{topic.materials?.length || 0} materials</span>
                                                        </div>
                                                    </div>
                                                    
                                                    {topic.materials && topic.materials.length > 0 && (
                                                        <div className="ml-10 lg:ml-12 space-y-1 lg:space-y-2">
                                                            {topic.materials.map(material => (
                                                                <div key={material.id} className="flex items-center gap-2 lg:gap-3 p-2 lg:p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition">
                                                                    <div className="w-5 h-5 lg:w-6 lg:h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                                        {material.type === 'video' ? (
                                                                            <Play className="w-2 h-2 lg:w-3 lg:h-3 text-blue-600" />
                                                                        ) : material.type === 'pdf' ? (
                                                                            <FileText className="w-2 h-2 lg:w-3 lg:h-3 text-blue-600" />
                                                                        ) : material.type === 'link' ? (
                                                                            <LinkIcon className="w-2 h-2 lg:w-3 lg:h-3 text-blue-600" />
                                                                        ) : (
                                                                            <FileText className="w-2 h-2 lg:w-3 lg:h-3 text-blue-600" />
                                                                        )}
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <span className="font-medium text-gray-900 text-xs lg:text-sm truncate">{material.title}</span>
                                                                        <span className="text-gray-500 ml-1 lg:ml-2 text-xs whitespace-nowrap">({material.duration || material.type})</span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-6 lg:py-8">
                                            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <BookOpen className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400" />
                                            </div>
                                            <p className="text-gray-600 text-sm lg:text-base">Course content will be available soon.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Enhanced About Course */}
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-3 lg:p-4">
                                    <h2 className="text-lg lg:text-xl font-bold flex items-center gap-2">
                                        <Heart className="w-4 h-4 lg:w-5 lg:h-5" />
                                        About This Course
                                    </h2>
                                </div>
                                <div className="p-3 lg:p-4">
                                    <div className="prose max-w-none">
                                        <p className="text-gray-700 leading-relaxed text-sm lg:text-base">
                                            {course.description || 'This comprehensive course is designed to help you excel in your exams. ' +
                                            'With expert guidance, detailed study materials, and practice tests, you\'ll be well-prepared ' +
                                            'to achieve your goals.'}
                                        </p>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 mt-4 lg:mt-6">
                                        <div className="flex items-start gap-2 lg:gap-3 p-2 lg:p-3 bg-blue-50 rounded-lg">
                                            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <BookOpen className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900 text-xs lg:text-sm">Study Materials</div>
                                                <div className="text-xs text-gray-600">Comprehensive notes and resources</div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-start gap-2 lg:gap-3 p-2 lg:p-3 bg-green-50 rounded-lg">
                                            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Target className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900 text-xs lg:text-sm">Practice Tests</div>
                                                <div className="text-xs text-gray-600">Regular assessments to track progress</div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-start gap-2 lg:gap-3 p-2 lg:p-3 bg-purple-50 rounded-lg">
                                            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <MessageCircle className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900 text-xs lg:text-sm">Doubt Support</div>
                                                <div className="text-xs text-gray-600">Get your questions answered</div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-start gap-2 lg:gap-3 p-2 lg:p-3 bg-orange-50 rounded-lg">
                                            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Smartphone className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900 text-xs lg:text-sm">Mobile Access</div>
                                                <div className="text-xs text-gray-600">Learn on any device</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Sidebar */}
                        <div className="lg:col-span-1 space-y-3 lg:space-y-4">
                            {/* Enrollment Card */}
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-3 lg:p-4">
                                    <div className="text-center">
                                        <div className="text-2xl lg:text-3xl font-bold mb-1 lg:mb-2">
                                            {course.is_free ? 'Free' : `₹${course.price}`}
                                        </div>
                                        <div className="text-white/80 text-xs lg:text-sm">One-time payment</div>
                                    </div>
                                </div>
                                
                                <div className="p-3 lg:p-4">
                                    {isEnrolled ? (
                                        <div className="space-y-3">
                                            <div className="bg-green-50 border border-green-200 p-3 rounded-lg text-center">
                                                <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-green-600 mx-auto mb-1 lg:mb-2" />
                                                <span className="font-semibold text-green-800 text-xs lg:text-sm">You are enrolled in this course</span>
                                            </div>
                                            <Link 
                                                href="/user/dashboard"
                                                className="bg-blue-600 text-white px-3 py-2 lg:px-4 lg:py-2 rounded-lg hover:bg-blue-700 transition w-full block text-center font-medium flex items-center justify-center gap-2 text-xs lg:text-sm"
                                            >
                                                <GraduationCap className="w-3 h-3 lg:w-4 lg:h-4" />
                                                Go to Dashboard
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="space-y-2 lg:space-y-3">
                                            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 lg:px-4 lg:py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition w-full font-medium flex items-center justify-center gap-2 text-xs lg:text-sm">
                                                <Zap className="w-3 h-3 lg:w-4 lg:h-4" />
                                                {course.is_free ? 'Enroll Now' : 'Buy Now'}
                                            </button>
                                            <button className="border-2 border-blue-600 text-blue-600 px-3 py-2 lg:px-4 lg:py-2 rounded-lg hover:bg-blue-50 transition w-full font-medium flex items-center justify-center gap-2 text-xs lg:text-sm">
                                                <ShoppingCart className="w-3 h-3 lg:w-4 lg:h-4" />
                                                Add to Cart
                                            </button>
                                        </div>
                                    )}
                                    
                                    <div className="mt-3 lg:mt-4 pt-3 lg:pt-4 border-t border-gray-200">
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600 flex items-center gap-1 lg:gap-2 text-xs">
                                                    <Users className="w-3 h-3 lg:w-4 lg:h-4" />
                                                    Students
                                                </span>
                                                <span className="font-semibold text-xs">{course.enrollments?.length || 0}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600 flex items-center gap-1 lg:gap-2 text-xs">
                                                    <Video className="w-3 h-3 lg:w-4 lg:h-4" />
                                                    Type
                                                </span>
                                                <span className="font-semibold text-xs">{course.type}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600 flex items-center gap-1 lg:gap-2 text-xs">
                                                    <BookOpen className="w-3 h-3 lg:w-4 lg:h-4" />
                                                    Category
                                                </span>
                                                <span className="font-semibold text-xs truncate ml-2">{course.category?.name}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600 flex items-center gap-1 lg:gap-2 text-xs">
                                                    <Globe className="w-3 h-3 lg:w-4 lg:h-4" />
                                                    Language
                                                </span>
                                                <span className="font-semibold text-xs">English</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced Instructor Info */}
                            {isInstructor && (
                                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 lg:p-4">
                                        <h3 className="text-sm lg:text-base font-bold flex items-center gap-2">
                                            <User className="w-4 h-4" />
                                            About Instructor
                                        </h3>
                                    </div>
                                    <div className="p-3 lg:p-4">
                                        <div className="flex items-center gap-2 lg:gap-3 mb-3">
                                            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <User className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="font-semibold text-sm lg:text-base truncate">{isInstructor.name}</div>
                                                <div className="text-xs text-gray-600">Expert Instructor</div>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 leading-relaxed text-xs lg:text-sm">
                                            Experienced instructor dedicated to helping students achieve their academic goals with personalized guidance and comprehensive support.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Enhanced Related Courses */}
                    {relatedCourses.length > 0 && (
                        <div className="mt-8 lg:mt-12">
                            <div className="flex items-center gap-2 mb-4 lg:mb-6">
                                <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
                                <h2 className="text-lg lg:text-xl font-bold">Related Courses</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                                {relatedCourses.map(relatedCourse => (
                                    <div key={relatedCourse.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                                        <div className="h-24 lg:h-32 bg-gradient-to-r from-blue-500 to-purple-500 relative">
                                            <div className="absolute inset-0 bg-black/20"></div>
                                            <div className="absolute bottom-2 lg:bottom-3 left-2 lg:left-3 right-2 lg:right-3 text-white">
                                                <h4 className="font-semibold text-xs lg:text-sm line-clamp-2">{relatedCourse.title}</h4>
                                            </div>
                                        </div>
                                        <div className="p-2 lg:p-3">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-green-600 font-semibold text-sm lg:text-base">
                                                    {relatedCourse.is_free ? 'Free' : `₹${relatedCourse.price}`}
                                                </span>
                                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                                    <Users className="w-3 h-3 lg:w-4 lg:h-4" />
                                                    <span>{relatedCourse.enrollments?.length || 0}</span>
                                                </div>
                                            </div>
                                            <Link 
                                                href={`/courses/${relatedCourse.id}`}
                                                className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 lg:gap-2 group text-xs lg:text-sm"
                                            >
                                                View Course
                                                <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4 group-hover:translate-x-1 transition" />
                                            </Link>
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
