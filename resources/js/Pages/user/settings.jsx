import React, { useState } from 'react';
import { Head, usePage, router, Link } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import UserSidebar from '../../Components/UserSidebar';
import { 
    Settings as SettingsIcon, 
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

export default function UserSettings() {
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
            {/* <Head title="Settings - Infinite Education" />
            <Navbar /> */}
            
            <div className="min-h-screen bg-gray-50 flex">
                <UserSidebar />
                
                <div className="flex-1 lg:ml-0">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white py-12">
                        <div className="container mx-auto px-4">
                            <div className="max-w-4xl mx-auto">
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                        <SettingsIcon className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-bold">Settings</h1>
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
                                            <SettingsIcon className="w-5 h-5 text-gray-600" />
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
                                            <Shield className="w-5 h-5 text-gray-600" />
                                            Security Settings
                                        </h2>
                                        
                                        <form className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                                                    <input
                                                        type="password"
                                                        value={formData.current_password}
                                                        onChange={(e) => setFormData({...formData, current_password: e.target.value})}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                                    <div className="relative">
                                                        <input
                                                            type={showPassword ? "text" : "password"}
                                                            value={formData.new_password}
                                                            onChange={(e) => setFormData({...formData, new_password: e.target.value})}
                                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                                                        >
                                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                                                    <input
                                                        type="password"
                                                        value={formData.confirm_password}
                                                        onChange={(e) => setFormData({...formData, confirm_password: e.target.value})}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    </div>

                                    {/* Notification Settings */}
                                    <div className="bg-white rounded-xl shadow-lg p-6">
                                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                            <Bell className="w-5 h-5 text-gray-600" />
                                            Notification Settings
                                        </h2>
                                        
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-medium text-gray-900">Email Notifications</h3>
                                                    <p className="text-sm text-gray-600">Receive email updates about your courses</p>
                                                </div>
                                                <button
                                                    onClick={() => setFormData({...formData, email_notifications: !formData.email_notifications})}
                                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                                        formData.email_notifications ? 'bg-blue-600' : 'bg-gray-200'
                                                    }`}
                                                >
                                                    <span
                                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                            formData.email_notifications ? 'translate-x-6' : 'translate-x-1'
                                                        }`}
                                                    />
                                                </button>
                                            </div>
                                            
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-medium text-gray-900">Push Notifications</h3>
                                                    <p className="text-sm text-gray-600">Receive push notifications on your device</p>
                                                </div>
                                                <button
                                                    onClick={() => setFormData({...formData, push_notifications: !formData.push_notifications})}
                                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                                        formData.push_notifications ? 'bg-blue-600' : 'bg-gray-200'
                                                    }`}
                                                >
                                                    <span
                                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                            formData.push_notifications ? 'translate-x-6' : 'translate-x-1'
                                                        }`}
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Preferences */}
                                    <div className="bg-white rounded-xl shadow-lg p-6">
                                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                            <Globe className="w-5 h-5 text-gray-600" />
                                            Preferences
                                        </h2>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                                                <select
                                                    value={formData.language}
                                                    onChange={(e) => setFormData({...formData, language: e.target.value})}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                >
                                                    <option value="en">English</option>
                                                    <option value="es">Spanish</option>
                                                    <option value="fr">French</option>
                                                    <option value="de">German</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                                                <select
                                                    value={formData.timezone}
                                                    onChange={(e) => setFormData({...formData, timezone: e.target.value})}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                >
                                                    <option value="UTC">UTC</option>
                                                    <option value="EST">Eastern Time</option>
                                                    <option value="PST">Pacific Time</option>
                                                    <option value="GMT">Greenwich Mean Time</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Save Button */}
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            onClick={handleSubmit}
                                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                                        >
                                            <Save className="w-5 h-5" />
                                            Save Settings
                                        </button>
                                    </div>
                                </div>

                                {/* Quick Links */}
                                <div className="space-y-6">
                                    <div className="bg-white rounded-xl shadow-lg p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
                                        <div className="space-y-3">
                                            <Link
                                                href="/user/profile"
                                                className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
                                            >
                                                <User className="w-4 h-4" />
                                                View Profile
                                            </Link>
                                            <Link
                                                href="/user/support"
                                                className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
                                            >
                                                <Shield className="w-4 h-4" />
                                                Get Support
                                            </Link>
                                            <Link
                                                href="/logout"
                                                method="post"
                                                className="flex items-center gap-3 text-red-600 hover:text-red-700 transition-colors"
                                            >
                                                <Lock className="w-4 h-4" />
                                                Logout
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-xl shadow-lg p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h3>
                                        <div className="space-y-3">
                                            <button className="w-full text-left px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <Smartphone className="w-4 h-4" />
                                                    Connected Devices
                                                </div>
                                            </button>
                                            <button className="w-full text-left px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <Lock className="w-4 h-4" />
                                                    Privacy Settings
                                                </div>
                                            </button>
                                        </div>
                                    </div>
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
