import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app/app-sidebar-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, FileText, TrendingUp, Users, DollarSign, Clock, Award, Target, Plus } from 'lucide-react';

interface Course {
    id: number;
    title: string;
    enrollments_count: number;
    created_at: string;
}

interface Test {
    id: number;
    title: string;
    start_time: string;
    is_active: boolean;
}

interface Stats {
    total_courses: number;
    published_courses: number;
    total_students: number;
    total_revenue: number;
    total_tests: number;
    active_tests: number;
}

interface Props {
    stats: Stats;
    recentCourses: Course[];
    recentTests: Test[];
    topCourses: Course[];
    monthlyRevenue: Record<string, number>;
}

export default function InstructorDashboard({ 
    stats, 
    recentCourses, 
    recentTests, 
    topCourses, 
    monthlyRevenue 
}: Props) {
    const quickActions = [
        { title: 'Create Course', href: '/instructor/courses/create', icon: Plus, color: 'bg-blue-600' },
        { title: 'Manage Courses', href: '/instructor/courses', icon: BookOpen, color: 'bg-green-600' },
        { title: 'Create Test', href: '/instructor/tests/create', icon: FileText, color: 'bg-purple-600' },
        { title: 'View Students', href: '/instructor/students', icon: Users, color: 'bg-orange-600' },
    ];

    const statCards = [
        { title: 'Total Courses', value: stats.total_courses, icon: BookOpen, color: 'text-blue-600' },
        { title: 'Published', value: stats.published_courses, icon: Award, color: 'text-green-600' },
        { title: 'Students', value: stats.total_students, icon: Users, color: 'text-purple-600' },
        { title: 'Revenue', value: `₹${stats.total_revenue.toFixed(2)}`, icon: DollarSign, color: 'text-emerald-600' },
        { title: 'Tests', value: stats.total_tests, icon: FileText, color: 'text-orange-600' },
        { title: 'Active Tests', value: stats.active_tests, icon: Clock, color: 'text-red-600' },
    ];

    return (
        <AppLayout>
            <Head title="Instructor Dashboard" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Instructor Dashboard</h1>
                    <p className="text-gray-600">Manage your courses and track student progress</p>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickActions.map((action, index) => (
                        <Link key={index} href={action.href}>
                            <Card className="hover:shadow-md transition-shadow cursor-pointer">
                                <CardContent className="p-6 text-center">
                                    <div className={`mx-auto h-12 w-12 rounded-xl ${action.color} flex items-center justify-center mb-3`}>
                                        <action.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <p className="text-sm font-medium">{action.title}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    {/* Recent Courses */}
                    <Card className="lg:col-span-2">
                        <CardHeader className="flex items-center justify-between">
                            <CardTitle>Recent Courses</CardTitle>
                            <Link href="/instructor/courses">
                                <Button variant="outline" size="sm">View All</Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentCourses.map((course) => (
                                    <div key={course.id} className="flex items-center justify-between p-3 border rounded-lg">
                                        <div>
                                            <p className="text-sm font-medium">{course.title}</p>
                                            <p className="text-xs text-gray-500">
                                                {course.enrollments_count} students • {new Date(course.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <Link href={`/instructor/courses/${course.id}/edit`}>
                                            <Button variant="outline" size="sm">Edit</Button>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Top Courses */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Top Performing</CardTitle>
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

                {/* Recent Tests */}
                <Card>
                    <CardHeader className="flex items-center justify-between">
                        <CardTitle>Recent Tests</CardTitle>
                        <Link href="/instructor/tests">
                            <Button variant="outline" size="sm">Manage</Button>
                        </Link>
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
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                        test.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {test.is_active ? 'Active' : 'Draft'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
