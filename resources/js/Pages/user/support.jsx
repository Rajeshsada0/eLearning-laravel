import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import UserSidebar from '../../Components/UserSidebar';
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
    Filter,
    User,
    Calendar,
    TrendingUp,
    Star,
    ExternalLink,
    ChevronRight,
    Shield,
    Headphones,
    MessageCircle
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

    const faqCategories = [
        { id: 'all', name: 'All Categories', icon: HelpCircle, color: 'gray' },
        { id: 'account', name: 'Account', icon: User, color: 'blue' },
        { id: 'courses', name: 'Courses', icon: BookOpen, color: 'green' },
        { id: 'payments', name: 'Payments', icon: TrendingUp, color: 'purple' },
        { id: 'technical', name: 'Technical', icon: Shield, color: 'red' },
        { id: 'general', name: 'General', icon: MessageSquare, color: 'yellow' }
    ];

    const faqItems = [
        {
            id: 1,
            category: 'account',
            question: 'How do I reset my password?',
            answer: 'You can reset your password by clicking on "Forgot Password" on the login page. Follow the instructions sent to your email.',
            helpful: 45
        },
        {
            id: 2,
            category: 'courses',
            question: 'How do I enroll in a course?',
            answer: 'Browse our course catalog, select a course that interests you, and click "Enroll Now" or "Add to Cart". Complete the payment process to get access.',
            helpful: 38
        },
        {
            id: 3,
            category: 'payments',
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards, debit cards, PayPal, and bank transfers. All payments are processed securely through our payment partners.',
            helpful: 52
        },
        {
            id: 4,
            category: 'technical',
            question: 'Videos are not playing properly',
            answer: 'Try clearing your browser cache, checking your internet connection, or using a different browser. Make sure you have the latest version of your browser installed.',
            helpful: 28
        },
        {
            id: 5,
            category: 'courses',
            question: 'Can I download course materials?',
            answer: 'Yes, most courses include downloadable materials like PDFs, slides, and other resources. Look for the download button in each lesson.',
            helpful: 67
        },
        {
            id: 6,
            category: 'general',
            question: 'How do I contact customer support?',
            answer: 'You can reach our support team through the contact form on this page, via email at support@Infinite.com, or through our live chat feature.',
            helpful: 89
        }
    ];

    const recentTickets = [
        {
            id: 1,
            subject: 'Issue with course access',
            category: 'courses',
            status: 'resolved',
            created_at: '2024-03-01',
            response: 'Your course access has been restored. Please try logging in again.'
        },
        {
            id: 2,
            subject: 'Payment verification',
            category: 'payments',
            status: 'in-progress',
            created_at: '2024-03-02',
            response: 'We are verifying your payment. You should receive an update within 24 hours.'
        },
        {
            id: 3,
            subject: 'Certificate not received',
            category: 'courses',
            status: 'resolved',
            created_at: '2024-02-28',
            response: 'Your certificate has been generated and sent to your email.'
        }
    ];

    const filteredFaqs = faqItems.filter(item => 
        selectedCategory === 'all' || item.category === selectedCategory
    ).filter(item =>
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getCategoryColor = (category) => {
        const cat = faqCategories.find(c => c.id === category);
        return cat ? cat.color : 'gray';
    };

    return (
        <>
            {/* <Head title="Support - Infinite Education" />
            <Navbar /> */}
            
            <div className="min-h-screen bg-gray-50 flex">
                <UserSidebar />
                
                <div className="flex-1 lg:ml-0">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                        <div className="container mx-auto px-4 py-12">
                            <div className="max-w-4xl mx-auto">
                                <div className="flex items-center space-x-6">
                                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                        <Headphones className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl lg:text-4xl font-bold mb-2">Help & Support</h1>
                                        <p className="text-blue-100 text-lg">We're here to help you succeed in your learning journey</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Support Content */}
                    <div className="container mx-auto px-4 py-8">
                        <div className="max-w-6xl mx-auto space-y-8">
                            
                            {/* Quick Contact Options */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                            <MessageCircle className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="font-semibold text-gray-900">Live Chat</h3>
                                            <p className="text-sm text-gray-600">Chat with our support team</p>
                                        </div>
                                    </div>
                                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                                        <MessageCircle className="w-4 h-4 mr-2" />
                                        Start Chat
                                    </button>
                                </div>

                                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                            <Mail className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="font-semibold text-gray-900">Email Support</h3>
                                            <p className="text-sm text-gray-600">Get help via email</p>
                                        </div>
                                    </div>
                                    <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                                        <Mail className="w-4 h-4 mr-2" />
                                        Send Email
                                    </button>
                                </div>

                                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                            <Phone className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="font-semibold text-gray-900">Phone Support</h3>
                                            <p className="text-sm text-gray-600">Call us directly</p>
                                        </div>
                                    </div>
                                    <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center">
                                        <Phone className="w-4 h-4 mr-2" />
                                        Call Now
                                    </button>
                                </div>
                            </div>

                            {/* Submit Ticket Form */}
                            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                    <MessageSquare className="w-6 h-6 mr-2 text-blue-600" />
                                    Submit a Support Ticket
                                </h2>
                                
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                            <input
                                                type="text"
                                                value={formData.subject}
                                                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                                placeholder="Brief description of your issue"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                            <select
                                                value={formData.category}
                                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="general">General</option>
                                                <option value="account">Account</option>
                                                <option value="courses">Courses</option>
                                                <option value="payments">Payments</option>
                                                <option value="technical">Technical</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                                        <div className="flex space-x-4">
                                            {['low', 'medium', 'high'].map((priority) => (
                                                <label key={priority} className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        value={priority}
                                                        checked={formData.priority === priority}
                                                        onChange={(e) => setFormData({...formData, priority: e.target.value})}
                                                        className="mr-2"
                                                    />
                                                    <span className="text-gray-700 capitalize">{priority}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                        <textarea
                                            value={formData.message}
                                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                                            placeholder="Describe your issue in detail..."
                                            rows={6}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        ></textarea>
                                    </div>
                                    
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                                    >
                                        <Send className="w-5 h-5 mr-2" />
                                        Submit Ticket
                                    </button>
                                </form>
                            </div>

                            {/* Recent Tickets */}
                            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                    <Clock className="w-6 h-6 mr-2 text-blue-600" />
                                    Recent Support Tickets
                                </h2>
                                
                                <div className="space-y-4">
                                    {recentTickets.map((ticket) => (
                                        <div key={ticket.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center mb-2">
                                                        <h3 className="font-semibold text-gray-900">{ticket.subject}</h3>
                                                        <span className={`ml-3 px-2 py-1 text-xs font-medium rounded-full ${
                                                            ticket.status === 'resolved' 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                            {ticket.status}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center text-sm text-gray-600 mb-2">
                                                        <Calendar className="w-4 h-4 mr-1" />
                                                        Created: {new Date(ticket.created_at).toLocaleDateString()}
                                                    </div>
                                                    <div className="text-sm text-gray-700">
                                                        <span className="font-medium">Response:</span> {ticket.response}
                                                    </div>
                                                </div>
                                                <ChevronRight className="w-5 h-5 text-gray-400 mt-2" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* FAQ Section */}
                            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                    <HelpCircle className="w-6 h-6 mr-2 text-blue-600" />
                                    Frequently Asked Questions
                                </h2>
                                
                                {/* Search and Filter */}
                                <div className="mb-6 space-y-4">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Search FAQs..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-2">
                                        {faqCategories.map((category) => (
                                            <button
                                                key={category.id}
                                                onClick={() => setSelectedCategory(category.id)}
                                                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${
                                                    selectedCategory === category.id
                                                        ? `bg-${category.color}-100 text-${category.color}-800 border-${category.color}-300`
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                            >
                                                <category.icon className="w-4 h-4 mr-2" />
                                                {category.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* FAQ Items */}
                                <div className="space-y-4">
                                    {filteredFaqs.map((item) => (
                                        <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                                            <div className="p-6">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex-1">
                                                        <div className="flex items-center mb-2">
                                                            <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${getCategoryColor(item.category)}-100 text-${getCategoryColor(item.category)}-800`}>
                                                                {item.category}
                                                            </span>
                                                            <div className="ml-3 flex items-center text-sm text-gray-500">
                                                                <Star className="w-4 h-4 mr-1" />
                                                                {item.helpful}% helpful
                                                            </div>
                                                        </div>
                                                        <h3 className="font-semibold text-gray-900 text-lg">{item.question}</h3>
                                                    </div>
                                                </div>
                                                <div className="text-gray-700 leading-relaxed">
                                                    {item.answer}
                                                </div>
                                                <div className="mt-4 flex items-center justify-between">
                                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                        <button className="flex items-center hover:text-blue-600">
                                                            <CheckCircle className="w-4 h-4 mr-1" />
                                                            Helpful
                                                        </button>
                                                        <button className="flex items-center hover:text-blue-600">
                                                            <AlertCircle className="w-4 h-4 mr-1" />
                                                            Not Helpful
                                                        </button>
                                                    </div>
                                                    <ExternalLink className="w-4 h-4 text-gray-400" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Resources */}
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Resources</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <a href="/user/courses" className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow flex items-center group">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                            <BookOpen className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">My Courses</h3>
                                            <p className="text-sm text-gray-600">View enrolled courses</p>
                                        </div>
                                    </a>
                                    <a href="/user/tests" className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow flex items-center group">
                                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                            <FileText className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 group-hover:text-green-600">Test Results</h3>
                                            <p className="text-sm text-gray-600">View test scores</p>
                                        </div>
                                    </a>
                                    <a href="/user/study-materials" className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow flex items-center group">
                                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                            <BookOpen className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 group-hover:text-purple-600">Study Materials</h3>
                                            <p className="text-sm text-gray-600">Download resources</p>
                                        </div>
                                    </a>
                                    <a href="/user/progress" className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow flex items-center group">
                                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                                            <TrendingUp className="w-5 h-5 text-orange-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 group-hover:text-orange-600">My Progress</h3>
                                            <p className="text-sm text-gray-600">Track learning progress</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
