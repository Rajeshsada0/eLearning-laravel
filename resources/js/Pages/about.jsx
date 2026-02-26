import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function About() {
    return (
        <>
            <Head title="About Us - Mindpyxle Academy" />
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                
                {/* Header */}
                <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl font-bold text-center mb-4">About Mindpyxle Academy</h1>
                        <p className="text-xl text-center">
                            Empowering students to achieve their academic dreams
                        </p>
                    </div>
                </section>

                {/* Mission */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-8">
                                At Mindpyxle Academy, we are committed to providing high-quality education and comprehensive 
                                exam preparation to help students achieve their goals. Our platform combines expert instruction, 
                                cutting-edge technology, and personalized learning to create an unparalleled educational experience.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                                <div className="text-center">
                                    <div className="text-4xl mb-4">🎯</div>
                                    <h3 className="text-xl font-bold mb-2">Excellence</h3>
                                    <p className="text-gray-600">Striving for academic excellence in everything we do</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl mb-4">🤝</div>
                                    <h3 className="text-xl font-bold mb-2">Integrity</h3>
                                    <p className="text-gray-600">Building trust through transparency and honesty</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl mb-4">🚀</div>
                                    <h3 className="text-xl font-bold mb-2">Innovation</h3>
                                    <p className="text-gray-600">Embracing technology to enhance learning</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* What We Offer */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="text-4xl mb-4">📚</div>
                                <h3 className="text-xl font-bold mb-2">Comprehensive Courses</h3>
                                <p className="text-gray-600">Expertly designed courses covering all major competitive exams</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-4">📝</div>
                                <h3 className="text-xl font-bold mb-2">Mock Tests</h3>
                                <p className="text-gray-600">Regular practice tests with detailed performance analysis</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-4">📰</div>
                                <h3 className="text-xl font-bold mb-2">Current Affairs</h3>
                                <p className="text-gray-600">Daily updates on important news and events</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-4">💬</div>
                                <h3 className="text-xl font-bold mb-2">Doubt Support</h3>
                                <p className="text-gray-600">Get your questions answered by expert faculty</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                                <div>
                                    <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
                                    <div className="text-gray-600">Students Enrolled</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
                                    <div className="text-gray-600">Courses Available</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold text-purple-600 mb-2">1000+</div>
                                    <div className="text-gray-600">Mock Tests</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold text-orange-600 mb-2">95%</div>
                                    <div className="text-gray-600">Success Rate</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            <div className="text-center">
                                <div className="w-32 h-32 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <span className="text-4xl">👨‍💼</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">John Doe</h3>
                                <p className="text-gray-600 mb-2">Founder & CEO</p>
                                <p className="text-sm text-gray-500">Visionary leader with 15+ years in education</p>
                            </div>
                            <div className="text-center">
                                <div className="w-32 h-32 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <span className="text-4xl">👩‍🏫</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Jane Smith</h3>
                                <p className="text-gray-600 mb-2">Academic Director</p>
                                <p className="text-sm text-gray-500">Expert in curriculum design and pedagogy</p>
                            </div>
                            <div className="text-center">
                                <div className="w-32 h-32 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <span className="text-4xl">👨‍💻</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Mike Johnson</h3>
                                <p className="text-gray-600 mb-2">Tech Lead</p>
                                <p className="text-sm text-gray-500">Building innovative learning solutions</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
                        <p className="text-xl mb-8">
                            Join thousands of successful students who have transformed their careers
                        </p>
                        <div className="space-x-4">
                            <Link href="/courses" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                                Browse Courses
                            </Link>
                            <Link href="/contact" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
