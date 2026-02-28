import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import { 
    MessageSquare, 
    Mail, 
    Phone, 
    Send, 
    HelpCircle, 
    BookOpen, 
    FileText,
    Clock,
    CheckCircle,
    AlertCircle,
    Search,
    Filter
} from 'lucide-react';

export default function Support() {
    const { user } = usePage().props;
    const [formData, setFormData] = useState({
        subject: '',
        message: '',
        category: 'general',
        priority: 'medium',
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Support ticket submitted:', formData);
    };

    const faqItems = [
        {
            question: 'How do I reset my password?',
            answer: 'Click on "Forgot Password" on the login page and follow the instructions sent to your email.',
            category: 'account'
        },
        {
            question: 'How do I access my courses?',
            answer: 'Go to "My Courses" in your dashboard to see all enrolled courses.',
            category: 'courses'
        },
        {
            question: 'How are test scores calculated?',
            answer: 'Test scores are calculated based on correct answers and time taken.',
            category: 'tests'
        },
        {
            question: 'Can I download course materials?',
            answer: 'Yes, you can download materials from the "Study Materials" section.',
            category: 'materials'
        }
    ];

    const filteredFaqs = faqItems.filter(item => 
        selectedCategory === 'all' || item.category === selectedCategory
    ).filter(item =>
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Head title="Support - Mindpyxle Academy" />
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-12">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                    <MessageSquare className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl lg:text-3xl font-bold">Help & Support</h1>
                                    <p className="text-purple-100">Get help with your account and courses</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Support Content */}
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Contact Form */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Quick Contact */}
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        <MessageSquare className="w-5 h-5 text-blue-600" />
                                        Contact Support
                                    </h2>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                                            <Mail className="w-5 h-5 text-blue-600" />
                                            <div>
                                                <div className="font-medium text-gray-900">Email Support</div>
                                                <div className="text-sm text-gray-600">support@mindpyxle.com</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                                            <Phone className="w-5 h-5 text-green-600" />
                                            <div>
                                                <div className="font-medium text-gray-900">Phone Support</div>
                                                <div className="text-sm text-gray-600">+1 (555) 123-4567</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center text-gray-600 mb-6">
                                        <Clock className="w-4 h-4 inline mr-2" />
                                        Response time: Within 24 hours
                                    </div>
                                </div>

                                {/* Submit Ticket Form */}
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        <HelpCircle className="w-5 h-5 text-purple-600" />
                                        Submit a Support Ticket
                                    </h2>
                                    
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                                <select
                                                    value={formData.category}
                                                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                >
                                                    <option value="general">General</option>
                                                    <option value="technical">Technical Issue</option>
                                                    <option value="billing">Billing</option>
                                                    <option value="account">Account Issue</option>
                                                    <option value="course">Course Related</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                                                <select
                                                    value={formData.priority}
                                                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                >
                                                    <option value="low">Low</option>
                                                    <option value="medium">Medium</option>
                                                    <option value="high">High</option>
                                                    <option value="urgent">Urgent</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                            <input
                                                type="text"
                                                value={formData.subject}
                                                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                placeholder="Brief description of your issue"
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                            <textarea
                                                value={formData.message}
                                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                                rows={5}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                placeholder="Provide detailed information about your issue"
                                            ></textarea>
                                        </div>
                                    </form>
                                    
                                    <button
                                        type="submit"
                                        onClick={handleSubmit}
                                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <Send className="w-5 h-5" />
                                        Submit Ticket
                                    </button>
                                </div>

                                {/* Recent Tickets */}
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Tickets</h3>
                                    
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                                                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">Login Issue</div>
                                                    <div className="text-sm text-gray-600">Ticket #1234</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm text-gray-600">Status</div>
                                                <div className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Pending</div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">Course Access</div>
                                                    <div className="text-sm text-gray-600">Ticket #1233</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm text-gray-600">Status</div>
                                                <div className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Resolved</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* FAQ Section */}
                            <div className="space-y-6">
                                {/* FAQ Search */}
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <HelpCircle className="w-5 h-5 text-green-600" />
                                        Frequently Asked Questions
                                    </h3>
                                    
                                    <div className="space-y-4">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input
                                                type="text"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                placeholder="Search FAQs..."
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            />
                                        </div>
                                        
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setSelectedCategory('all')}
                                                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                                    selectedCategory === 'all' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
                                                }`}
                                            >
                                                All
                                            </button>
                                            <button
                                                onClick={() => setSelectedCategory('account')}
                                                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                                    selectedCategory === 'account' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
                                                }`}
                                            >
                                                Account
                                            </button>
                                            <button
                                                onClick={() => setSelectedCategory('courses')}
                                                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                                    selectedCategory === 'courses' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
                                                }`}
                                            >
                                                Courses
                                            </button>
                                            <button
                                                onClick={() => setSelectedCategory('tests')}
                                                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                                    selectedCategory === 'tests' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
                                                }`}
                                            >
                                                Tests
                                            </button>
                                            <button
                                                onClick={() => setSelectedCategory('materials')}
                                                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                                    selectedCategory === 'materials' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
                                                }`}
                                            >
                                                Materials
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* FAQ Items */}
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <div className="space-y-4">
                                        {filteredFaqs.map((item, index) => (
                                            <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                                                <div className="flex items-start gap-2 mb-2">
                                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                                                        item.category === 'account' ? 'bg-blue-100 text-blue-600' :
                                                        item.category === 'courses' ? 'bg-purple-100 text-purple-600' :
                                                        item.category === 'tests' ? 'bg-orange-100 text-orange-600' :
                                                        'bg-green-100 text-green-600'
                                                    }`}>
                                                        {item.category.charAt(0).toUpperCase()}
                                                    </div>
                                                    <h4 className="font-medium text-gray-900">{item.question}</h4>
                                                </div>
                                                <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick Resources */}
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <BookOpen className="w-5 h-5 text-blue-600" />
                                        Quick Resources
                                    </h3>
                                    
                                    <div className="space-y-3">
                                        <a href="/user/courses" className="flex items-center gap-3 p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                                            <BookOpen className="w-4 h-4" />
                                            <span>My Courses</span>
                                        </a>
                                        <a href="/user/tests" className="flex items-center gap-3 p-3 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors">
                                            <FileText className="w-4 h-4" />
                                            <span>Test Results</span>
                                        </a>
                                        <a href="/user/study-materials" className="flex items-center gap-3 p-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                                            <BookOpen className="w-4 h-4" />
                                            <span>Study Materials</span>
                                        </a>
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
