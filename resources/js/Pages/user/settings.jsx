import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import { 
    Settings, 
    User, 
    Mail, 
    Bell, 
    Shield, 
    Eye, 
    EyeOff,
    Save,
    Lock,
    Globe,
    Smartphone
} from 'lucide-react';

export default function Settings() {
    const { user } = usePage().props;
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        current_password: '',
        new_password: '',
        confirm_password: '',
        email_notifications: true,
        push_notifications: false,
        two_factor_auth: false,
        language: 'en',
        timezone: 'UTC',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Settings saved:', formData);
    };

    return (
        <>
            <Head title="Settings - Mindpyxle Academy" />
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                
                {/* Header */}
                <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white py-12">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                    <Settings className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl lg:text-3xl font-bold">Settings</h1>
                                    <p className="text-gray-300">Manage your account settings and preferences</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Settings Content */}
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Settings */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Profile Settings */}
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        <User className="w-5 h-5 text-blue-600" />
                                        Profile Settings
                                    </h2>
                                    
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                {/* Security Settings */}
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-green-600" />
                                        Security Settings
                                    </h2>
                                    
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                                                    <div className="relative">
                                                        <input
                                                            type={showPassword ? "text" : "password"}
                                                            value={formData.current_password}
                                                            onChange={(e) => setFormData({...formData, current_password: e.target.value})}
                                                            className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                        >
                                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                                    <input
                                                        type="password"
                                                        value={formData.new_password}
                                                        onChange={(e) => setFormData({...formData, new_password: e.target.value})}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                                                    <input
                                                        type="password"
                                                        value={formData.confirm_password}
                                                        onChange={(e) => setFormData({...formData, confirm_password: e.target.value})}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Notification Settings */}
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        <Bell className="w-5 h-5 text-purple-600" />
                                        Notification Settings
                                    </h2>
                                    
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Mail className="w-4 h-4 text-gray-600" />
                                                <span className="text-gray-700">Email Notifications</span>
                                            </div>
                                            <button
                                                onClick={() => setFormData({...formData, email_notifications: !formData.email_notifications})}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                                    formData.email_notifications ? 'bg-blue-600' : 'bg-gray-200'
                                                }`}
                                            >
                                                <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                                                    formData.email_notifications ? 'translate-x-6' : 'translate-x-1'
                                                }`} />
                                            </button>
                                        </div>
                                        
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Smartphone className="w-4 h-4 text-gray-600" />
                                                <span className="text-gray-700">Push Notifications</span>
                                            </div>
                                            <button
                                                onClick={() => setFormData({...formData, push_notifications: !formData.push_notifications})}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                                    formData.push_notifications ? 'bg-blue-600' : 'bg-gray-200'
                                                }`}
                                            >
                                                <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                                                    formData.push_notifications ? 'translate-x-6' : 'translate-x-1'
                                                }`} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Quick Links */}
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Globe className="w-5 h-5 text-blue-600" />
                                        Quick Links
                                    </h3>
                                    
                                    <div className="space-y-3">
                                        <a href="/user/profile" className="block w-full text-left px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                                            My Profile
                                        </a>
                                        <a href="/user/courses" className="block w-full text-left px-4 py-3 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors">
                                            My Courses
                                        </a>
                                        <a href="/user/tests" className="block w-full text-left px-4 py-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                                            Test Results
                                        </a>
                                    </div>
                                </div>

                                {/* Account Actions */}
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Lock className="w-5 h-5 text-red-600" />
                                        Account Actions
                                    </h3>
                                    
                                    <div className="space-y-3">
                                        <button className="block w-full text-left px-4 py-3 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors">
                                            Download My Data
                                        </button>
                                        <button className="block w-full text-left px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                                            Delete Account
                                        </button>
                                    </div>
                                </div>

                                {/* Save Button */}
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <button
                                        onClick={handleSubmit}
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <Save className="w-5 h-5" />
                                        Save Settings
                                    </button>
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
