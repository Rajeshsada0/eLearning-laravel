import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    Home,
    BookOpen,
    FileText,
    TrendingUp,
    Users,
    Settings,
    HelpCircle,
    LogOut,
    Menu,
    X,
    GraduationCap,
    Globe,
    Brain
} from 'lucide-react';

export default function UserSidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { auth } = usePage().props;

    const menuItems = [
        {
            title: 'Dashboard',
            icon: Home,
            href: '/user/dashboard'
        },
        {
            title: 'My Courses',
            icon: BookOpen,
            href: '/user/courses'
        },
        {
            title: 'Tests',
            icon: FileText,
            href: '/user/tests'
        },
        {
            title: 'Current Affairs',
            icon: Globe,
            href: '/user/current-affairs'
        },
        {
            title: 'Study Materials',
            icon: Brain,
            href: '/user/study-materials'
        },
        {
            title: 'Progress',
            icon: TrendingUp,
            href: '/user/progress'
        },
        {
            title: 'Profile',
            icon: Users,
            href: '/user/profile'
        },
        {
            title: 'Settings',
            icon: Settings,
            href: '/user/settings'
        },
        {
            title: 'Support',
            icon: HelpCircle,
            href: '/user/support'
        }
    ];

    const isActive = (href) => {
        return window.location.pathname === href;
    };

    return (
        <>
            {/* Mobile Menu Toggle */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                    {isSidebarOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
                </button>
            </div>

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:inset-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="p-6 bg-white border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <GraduationCap className="w-5 h-5 text-gray-700" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Infinite</h2>
                                <p className="text-sm text-gray-500">Student Portal</p>
                            </div>
                        </div>
                    </div>

                    {/* User Info */}
                    {/* <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                <Users className="w-4 h-4 text-gray-600" />
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-900">{auth?.user?.name || 'Student'}</div>
                                <div className="text-xs text-gray-500">{auth?.user?.email || 'student@example.com'}</div>
                            </div>
                        </div>
                    </div> */}

                    {/* Navigation Menu */}
                    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    isActive(item.href)
                                        ? 'bg-gray-100 text-gray-900 border-l-2 border-gray-900'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                            >
                                <item.icon className="w-4 h-4" />
                                <span>{item.title}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Logout Button */}
                    <div className="p-4 border-t border-gray-100">
                        <Link
                            href="/logout"
                            method="post"
                            className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all duration-200"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </>
    );
}
