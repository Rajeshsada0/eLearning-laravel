import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app/app-sidebar-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, FileText, TrendingUp, Clock, Award, Target, Play, Calendar } from 'lucide-react';

interface Course {
    id: number;
    title: string;
    thumbnail?: string;
    instructor: {
        name: string;
    };
    course: {
        title: string;
        thumbnail?: string;
    };
}

interface Test {
    id: number;
    title: string;
    percentage: number;
    status: string;
    mockTest: {
        title: string;
        category: {
            name: string;
        };
    };
}

interface Progress {
    id: number;
    course: {
        title: string;
    };
    completed_at: string;
}

interface Stats {
    enrolled_courses: number;
    completed_courses: number;
    tests_taken: number;
    average_score: number;
}

interface Props {
    enrolledCourses: Course[];
    recentTests: Test[];
    progress: Progress[];
    stats: Stats;
    recommendedCourses: Course[];
    upcomingTests: any[];
}

export default function UserDashboard({ 
    enrolledCourses, 
    recentTests, 
    progress, 
    stats, 
    recommendedCourses, 
    upcomingTests 
}: Props) {
    const quickActions = [
        { title: 'Browse Courses', href: '/courses', icon: BookOpen, color: 'bg-blue-600' },
        { title: 'Take Test', href: '/tests', icon: FileText, color: 'bg-green-600' },
        { title: 'Current Affairs', href: '/current-affairs', icon: Calendar, color: 'bg-purple-600' },
        { title: 'Study Materials', href: '/study-materials', icon: Play, color: 'bg-orange-600' },
    ];

    const statCards = [
        { title: 'Enrolled Courses', value: stats.enrolled_courses, icon: BookOpen, color: 'text-blue-600' },
        { title: 'Completed Courses', value: stats.completed_courses, icon: Award, color: 'text-green-600' },
        { title: 'Tests Taken', value: stats.tests_taken, icon: FileText, color: 'text-purple-600' },
        { title: 'Average Score', value: `${stats.average_score.toFixed(1)}%`, icon: Target, color: 'text-orange-600' },
    ];

    return (
        <AppLayout>
            <Head title="Student Dashboard" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
                    <p className="text-gray-600">Continue your learning journey</p>
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
                    {/* Enrolled Courses */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Continue Learning</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {enrolledCourses.map((enrollment) => (
                                    <div key={enrollment.id} className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                                <BookOpen className="h-5 w-5 text-gray-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">{enrollment.course.title}</p>
                                                <p className="text-xs text-gray-500">by {enrollment.course.instructor?.name}</p>
                                            </div>
                                        </div>
                                        <Button size="sm">Continue</Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Progress */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Progress</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {progress.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium">{item.course.title}</p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(item.completed_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <Award className="h-4 w-4 text-green-600" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                                            <p className="text-sm font-medium">{test.mockTest.title}</p>
                                            <p className="text-xs text-gray-500">{test.mockTest.category.name}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold">{test.percentage.toFixed(1)}%</p>
                                            <p className="text-xs text-gray-500">{test.status}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recommended Courses */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recommended</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {recommendedCourses.map((course) => (
                                    <div key={course.id} className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium">{course.title}</p>
                                            <p className="text-xs text-gray-500">by {course.instructor?.name}</p>
                                        </div>
                                        <Button size="sm">View</Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
