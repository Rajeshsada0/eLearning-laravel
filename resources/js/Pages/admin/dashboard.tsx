import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app/app-sidebar-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, FileText, TrendingUp, DollarSign, Clock, Award, Target } from 'lucide-react';

interface Stats {
    total_users: number;
    total_instructors: number;
    total_students: number;
    total_courses: number;
    total_tests: number;
    total_enrollments: number;
    total_revenue: number;
    active_tests_today: number;
}

interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
}

interface Course {
    id: number;
    title: string;
    enrollments_count: number;
}

interface Test {
    id: number;
    title: string;
    start_time: string;
}

interface Props {
    stats: Stats;
    recentUsers: User[];
    recentCourses: Course[];
    recentTests: Test[];
    monthlyRevenue: Record<string, number>;
    topCourses: Course[];
}

export default function AdminDashboard({ stats, recentUsers, recentCourses, recentTests, monthlyRevenue, topCourses }: Props) {
    const statCards = [
        { title: 'Total Users', value: stats.total_users, icon: Users, color: 'text-blue-600' },
        { title: 'Instructors', value: stats.total_instructors, icon: Award, color: 'text-purple-600' },
        { title: 'Students', value: stats.total_students, icon: Users, color: 'text-green-600' },
        { title: 'Courses', value: stats.total_courses, icon: BookOpen, color: 'text-indigo-600' },
        { title: 'Tests', value: stats.total_tests, icon: FileText, color: 'text-orange-600' },
        { title: 'Enrollments', value: stats.total_enrollments, icon: Target, color: 'text-pink-600' },
        { title: 'Revenue', value: `₹${stats.total_revenue.toFixed(2)}`, icon: DollarSign, color: 'text-emerald-600' },
        { title: 'Active Tests Today', value: stats.active_tests_today, icon: Clock, color: 'text-red-600' },
    ];

    return (
        <AppLayout>
            <Head title="Admin Dashboard" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                    <p className="text-gray-600">Manage your learning platform</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map((stat, index) => (
                        <Card key={index}>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                        <p className="text-2xl font-bold">{stat.value}</p>
                                    </div>
                                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Users */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Users</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {recentUsers.map((user) => (
                                    <div key={user.id} className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium">{user.name}</p>
                                            <p className="text-xs text-gray-500">{user.email}</p>
                                        </div>
                                        <span className="text-xs text-gray-400">
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Courses */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Courses</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {recentCourses.map((course) => (
                                    <div key={course.id} className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium">{course.title}</p>
                                            <p className="text-xs text-gray-500">{course.enrollments_count} enrollments</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Tests */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Tests</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {recentTests.map((test) => (
                                    <div key={test.id} className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium">{test.title}</p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(test.start_time).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Top Courses */}
                <Card>
                    <CardHeader>
                        <CardTitle>Top Courses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {topCourses.map((course) => (
                                <div key={course.id} className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium">{course.title}</p>
                                        <p className="text-xs text-gray-500">{course.enrollments_count} students</p>
                                    </div>
                                    <TrendingUp className="h-4 w-4 text-green-600" />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
