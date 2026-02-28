import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { 
    Mail, 
    Phone, 
    MapPin, 
    Send, 
    MessageSquare, 
    Clock, 
    CheckCircle, 
    User, 
    Building, 
    Globe, 
    Facebook, 
    Twitter, 
    Linkedin, 
    Instagram,
    ArrowRight,
    Shield,
    Zap
} from 'lucide-react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        
        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }
        
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setIsSubmitting(true);
        
        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
        }, 2000);
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        });
        setErrors({});
        setIsSubmitted(false);
    };

    return (
        <>
            <Head title="Contact Us - Mindpyxle Academy" />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <Navbar />
                
                {/* Enhanced Header */}
                <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="mb-6">
                                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Mail className="w-10 h-10 text-white" />
                                </div>
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">Get in Touch</h1>
                            <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
                                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                            </p>
                        </div>
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute top-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                </section>

                {/* Contact Content */}
                <section className="py-16 lg:py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                                {/* Contact Form */}
                                <div className="lg:col-span-2">
                                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6">
                                            <h2 className="text-2xl font-bold flex items-center gap-3">
                                                <MessageSquare className="w-6 h-6" />
                                                Send us a message
                                            </h2>
                                        </div>
                                        
                                        {isSubmitted ? (
                                            <div className="p-8 text-center">
                                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <CheckCircle className="w-8 h-8 text-green-600" />
                                                </div>
                                                <h3 className="text-xl font-bold text-green-600 mb-2">Message Sent Successfully!</h3>
                                                <p className="text-gray-600 mb-6">
                                                    Thank you for contacting us. We'll get back to you soon.
                                                </p>
                                                <button
                                                    onClick={resetForm}
                                                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                                                >
                                                    Send another message
                                                </button>
                                            </div>
                                        ) : (
                                            <form onSubmit={handleSubmit} className="p-8">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            <User className="w-4 h-4 inline mr-2" />
                                                            Your Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            value={formData.name}
                                                            onChange={handleChange}
                                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                                errors.name ? 'border-red-500' : 'border-gray-300'
                                                            }`}
                                                            placeholder="John Doe"
                                                        />
                                                        {errors.name && (
                                                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                                        )}
                                                    </div>
                                                    
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            <Mail className="w-4 h-4 inline mr-2" />
                                                            Email Address
                                                        </label>
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                                errors.email ? 'border-red-500' : 'border-gray-300'
                                                            }`}
                                                            placeholder="john@example.com"
                                                        />
                                                        {errors.email && (
                                                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                                        )}
                                                    </div>
                                                    
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            <Phone className="w-4 h-4 inline mr-2" />
                                                            Phone Number
                                                        </label>
                                                        <input
                                                            type="tel"
                                                            name="phone"
                                                            value={formData.phone}
                                                            onChange={handleChange}
                                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                            placeholder="+1 (555) 123-4567"
                                                        />
                                                    </div>
                                                    
                                                    <div className="md:col-span-2">
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            <MessageSquare className="w-4 h-4 inline mr-2" />
                                                            Subject
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="subject"
                                                            value={formData.subject}
                                                            onChange={handleChange}
                                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                                errors.subject ? 'border-red-500' : 'border-gray-300'
                                                            }`}
                                                            placeholder="How can we help you?"
                                                        />
                                                        {errors.subject && (
                                                            <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                                                        )}
                                                    </div>
                                                    
                                                    <div className="md:col-span-2">
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            <MessageSquare className="w-4 h-4 inline mr-2" />
                                                            Message
                                                        </label>
                                                        <textarea
                                                            name="message"
                                                            value={formData.message}
                                                            onChange={handleChange}
                                                            rows={5}
                                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                                errors.message ? 'border-red-500' : 'border-gray-300'
                                                            }`}
                                                            placeholder="Tell us more about your inquiry..."
                                                        ></textarea>
                                                        {errors.message && (
                                                            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                                                        )}
                                                    </div>
                                                </div>
                                                
                                                <div className="mt-8">
                                                    <button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                                    >
                                                        {isSubmitting ? (
                                                            <>
                                                                <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin"></div>
                                                                Sending...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Send className="w-5 h-5" />
                                                                Send Message
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </form>
                                        )}
                                    </div>
                                </div>

                                {/* Contact Information */}
                                <div className="lg:col-span-1 space-y-8">
                                    {/* Contact Details */}
                                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6">
                                            <h3 className="text-xl font-bold flex items-center gap-3">
                                                <Building className="w-6 h-6" />
                                                Contact Information
                                            </h3>
                                        </div>
                                        <div className="p-6">
                                            <div className="space-y-6">
                                                <div className="flex items-start gap-4">
                                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                        <Mail className="w-6 h-6 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-900">Email</div>
                                                        <div className="text-gray-600">info@mindpyxle.com</div>
                                                        <div className="text-sm text-gray-500">We'll respond within 24 hours</div>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-start gap-4">
                                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                        <Phone className="w-6 h-6 text-green-600" />
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-900">Phone</div>
                                                        <div className="text-gray-600">+1 (555) 123-4567</div>
                                                        <div className="text-sm text-gray-500">Mon-Fri, 9am-6pm</div>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-start gap-4">
                                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                        <MapPin className="w-6 h-6 text-purple-600" />
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-900">Address</div>
                                                        <div className="text-gray-600">123 Education Street</div>
                                                        <div className="text-gray-600">New York, NY 10001</div>
                                                        <div className="text-sm text-gray-500">United States</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Office Hours */}
                                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                                        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
                                            <h3 className="text-xl font-bold flex items-center gap-3">
                                                <Clock className="w-6 h-6" />
                                                Office Hours
                                            </h3>
                                        </div>
                                        <div className="p-6">
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-700">Monday - Friday</span>
                                                    <span className="text-gray-900 font-medium">9:00 AM - 6:00 PM</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-700">Saturday</span>
                                                    <span className="text-gray-900 font-medium">10:00 AM - 4:00 PM</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-700">Sunday</span>
                                                    <span className="text-gray-900 font-medium">Closed</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Social Media */}
                                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6">
                                            <h3 className="text-xl font-bold flex items-center gap-3">
                                                <Globe className="w-6 h-6" />
                                                Follow Us
                                            </h3>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex justify-center space-x-4">
                                                <a
                                                    href="#"
                                                    className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                                                >
                                                    <Facebook className="w-6 h-6" />
                                                </a>
                                                <a
                                                    href="#"
                                                    className="w-12 h-12 bg-sky-400 rounded-full flex items-center justify-center text-white hover:bg-sky-500 transition-colors"
                                                >
                                                    <Twitter className="w-6 h-6" />
                                                </a>
                                                <a
                                                    href="#"
                                                    className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center text-white hover:bg-blue-800 transition-colors"
                                                >
                                                    <Linkedin className="w-6 h-6" />
                                                </a>
                                                <a
                                                    href="#"
                                                    className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                                                >
                                                    <Instagram className="w-6 h-6" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Links */}
                                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                                        <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-6">
                                            <h3 className="text-xl font-bold flex items-center gap-3">
                                                <Zap className="w-6 h-6" />
                                                Quick Links
                                            </h3>
                                        </div>
                                        <div className="p-6">
                                            <div className="space-y-3">
                                                <Link
                                                    href="/about"
                                                    className="block text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 group"
                                                >
                                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                                                    About Us
                                                </Link>
                                                <Link
                                                    href="/courses"
                                                    className="block text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 group"
                                                >
                                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                                                    Browse Courses
                                                </Link>
                                                <Link
                                                    href="/faq"
                                                    className="block text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 group"
                                                >
                                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                                                    FAQ
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
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
                                    <Shield className="w-10 h-10 text-white" />
                                </div>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Need Help?</h2>
                            <p className="text-xl lg:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
                                Our support team is here to help you with any questions or concerns.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <Link 
                                    href="/contact" 
                                    className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center gap-3"
                                >
                                    <Mail className="w-5 h-5" />
                                    Contact Support
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link 
                                    href="/faq" 
                                    className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300 hover:scale-105 flex items-center gap-3"
                                >
                                    <MessageSquare className="w-5 h-5" />
                                    View FAQ
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
