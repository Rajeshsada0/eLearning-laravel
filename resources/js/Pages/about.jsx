import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { 
    Target, 
    Shield, 
    Lightbulb, 
    BookOpen, 
    FileText, 
    MessageCircle, 
    Globe, 
    Users, 
    CheckCircle, 
    GraduationCap,
    Zap,
    ArrowRight
} from 'lucide-react';

export default function About() {
    return (
        <>
            <Head title="About Us - Mindpyxle Academy" />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <Navbar />
                
                {/* Enhanced Header */}
                <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-16 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-5xl mx-auto text-center">
                            <div className="mb-6">
                                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <GraduationCap className="w-10 h-10 text-white" />
                                </div>
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">About Mindpyxle Academy</h1>
                            <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
                                Empowering students to achieve their academic dreams
                            </p>
                        </div>
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute top-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                </section>

                {/* Enhanced Mission */}
                <section className="py-16 lg:py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto text-center">
                            <div className="flex items-center justify-center mb-8">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                                    <Target className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold mb-8">Our Mission</h2>
                            <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-12 max-w-4xl mx-auto">
                                At Mindpyxle Academy, we are committed to providing high-quality education and comprehensive 
                                exam preparation to help students achieve their goals. Our platform combines expert instruction, 
                                cutting-edge technology, and personalized learning to create an unparalleled educational experience.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-12">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Target className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl lg:text-2xl font-bold mb-3 text-gray-900">Excellence</h3>
                                    <p className="text-gray-600 text-base lg:text-lg">Striving for academic excellence</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Shield className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl lg:text-2xl font-bold mb-3 text-gray-900">Integrity</h3>
                                    <p className="text-gray-600 text-base lg:text-lg">Building trust through transparency</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Lightbulb className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl lg:text-2xl font-bold mb-3 text-gray-900">Innovation</h3>
                                    <p className="text-gray-600 text-base lg:text-lg">Embracing technology to enhance learning</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Enhanced What We Offer */}
                <section className="py-16 lg:py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl lg:text-4xl font-bold mb-4">What We Offer</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                        <BookOpen className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl lg:text-2xl font-bold mb-3 text-gray-900">Comprehensive Courses</h3>
                                    <p className="text-gray-600 text-base lg:text-lg">Expertly designed courses</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                        <FileText className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl lg:text-2xl font-bold mb-3 text-gray-900">Mock Tests</h3>
                                    <p className="text-gray-600 text-base lg:text-lg">Regular practice tests</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                        <Globe className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl lg:text-2xl font-bold mb-3 text-gray-900">Current Affairs</h3>
                                    <p className="text-gray-600 text-base lg:text-lg">Daily updates on news</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                        <MessageCircle className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl lg:text-2xl font-bold mb-3 text-gray-900">Doubt Support</h3>
                                    <p className="text-gray-600 text-base lg:text-lg">Get your questions answered</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Enhanced Stats */}
                <section className="py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Impact</h2>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
                                <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
                                    <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                                    <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">10,000+</div>
                                    <div className="text-gray-600 text-base lg:text-lg font-medium">Students Enrolled</div>
                                </div>
                                <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
                                    <BookOpen className="w-12 h-12 text-green-600 mx-auto mb-4" />
                                    <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-2">500+</div>
                                    <div className="text-gray-600 text-base lg:text-lg font-medium">Courses Available</div>
                                </div>
                                <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
                                    <FileText className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                                    <div className="text-3xl lg:text-4xl font-bold text-purple-600 mb-2">1000+</div>
                                    <div className="text-gray-600 text-base lg:text-lg font-medium">Mock Tests</div>
                                </div>
                                <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
                                    <CheckCircle className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                                    <div className="text-3xl lg:text-4xl font-bold text-orange-600 mb-2">95%</div>
                                    <div className="text-gray-600 text-base lg:text-lg font-medium">Success Rate</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Enhanced CTA */}
                <section className="py-16 lg:py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="mb-8">
                                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Zap className="w-10 h-10 text-white" />
                                </div>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
                            <p className="text-xl lg:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
                                Join thousands of successful students who have transformed their careers
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <Link 
                                    href="/courses" 
                                    className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center gap-3"
                                >
                                    <BookOpen className="w-5 h-5" />
                                    Browse Courses
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link 
                                    href="/contact" 
                                    className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300 hover:scale-105 flex items-center gap-3"
                                >
                                    Contact Us
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                </section>

                <Footer />
            </div>
        </>
    );
}
