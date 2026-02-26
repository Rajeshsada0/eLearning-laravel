import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
        alert('Thank you for contacting us. We will get back to you soon!');
        setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        });
    };

    return (
        <>
            <Head title="Contact Us - Mindpyxle Academy" />
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                
                {/* Header */}
                <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl font-bold text-center mb-4">Contact Us</h1>
                        <p className="text-xl text-center">
                            We're here to help you succeed in your academic journey
                        </p>
                    </div>
                </section>

                {/* Contact Info */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                            <div className="text-center">
                                <div className="text-4xl mb-4">📍</div>
                                <h3 className="text-xl font-bold mb-2">Visit Us</h3>
                                <p className="text-gray-600">
                                    123 Education Street<br />
                                    Knowledge City, KC 12345<br />
                                    India
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-4">📞</div>
                                <h3 className="text-xl font-bold mb-2">Call Us</h3>
                                <p className="text-gray-600">
                                    +91 98765 43210<br />
                                    Mon-Fri: 9:00 AM - 6:00 PM<br />
                                    Sat-Sun: 10:00 AM - 4:00 PM
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-4">✉️</div>
                                <h3 className="text-xl font-bold mb-2">Email Us</h3>
                                <p className="text-gray-600">
                                    info@mindpyxle.com<br />
                                    support@mindpyxle.com<br />
                                    admissions@mindpyxle.com
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Contact Form */}
                            <div className="bg-white rounded-lg shadow-lg p-8">
                                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Your Name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Subject *
                                        </label>
                                        <select
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="">Select a subject</option>
                                            <option value="general">General Inquiry</option>
                                            <option value="admissions">Admissions</option>
                                            <option value="technical">Technical Support</option>
                                            <option value="feedback">Feedback</option>
                                            <option value="partnership">Partnership</option>
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Tell us how we can help you..."
                                        />
                                    </div>
                                    
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>

                            {/* FAQ */}
                            <div>
                                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                                <div className="space-y-4">
                                    <div className="bg-white rounded-lg shadow p-6">
                                        <h3 className="font-semibold mb-2">How do I enroll in a course?</h3>
                                        <p className="text-gray-600">
                                            Simply browse our courses, select the one you're interested in, and click on "Enroll Now" 
                                            or "Buy Now". Follow the payment process to get instant access.
                                        </p>
                                    </div>
                                    <div className="bg-white rounded-lg shadow p-6">
                                        <h3 className="font-semibold mb-2">Are the courses available offline?</h3>
                                        <p className="text-gray-600">
                                            Yes, we offer both online and offline courses. You can filter courses by type to find 
                                            offline classes in your area.
                                        </p>
                                    </div>
                                    <div className="bg-white rounded-lg shadow p-6">
                                        <h3 className="font-semibold mb-2">Do you provide study materials?</h3>
                                        <p className="text-gray-600">
                                            All our courses include comprehensive study materials including PDFs, video lectures, 
                                            practice questions, and more.
                                        </p>
                                    </div>
                                    <div className="bg-white rounded-lg shadow p-6">
                                        <h3 className="font-semibold mb-2">How can I get my doubts cleared?</h3>
                                        <p className="text-gray-600">
                                            We have a dedicated doubt section where you can post questions and get answers from 
                                            our expert instructors within 24 hours.
                                        </p>
                                    </div>
                                    <div className="bg-white rounded-lg shadow p-6">
                                        <h3 className="font-semibold mb-2">What is your refund policy?</h3>
                                        <p className="text-gray-600">
                                            We offer a 7-day refund policy if you're not satisfied with the course. Terms and 
                                            conditions apply.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Social Media */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-8">Follow Us</h2>
                        <p className="text-gray-600 mb-8">Stay connected for updates, tips, and educational content</p>
                        <div className="flex justify-center space-x-6">
                            <a href="#" className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-blue-700 transition">
                                <span className="text-xl">f</span>
                            </a>
                            <a href="#" className="bg-sky-500 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-sky-600 transition">
                                <span className="text-xl">𝕏</span>
                            </a>
                            <a href="#" className="bg-pink-600 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-pink-700 transition">
                                <span className="text-xl">📷</span>
                            </a>
                            <a href="#" className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-red-700 transition">
                                <span className="text-xl">▶</span>
                            </a>
                            <a href="#" className="bg-blue-700 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-blue-800 transition">
                                <span className="text-xl">in</span>
                            </a>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
