import React from 'react';
import { Link } from '@inertiajs/react';
import InstructorLayout from '../../../Components/InstructorLayout';

function ShowTest({ test, testResults }) {
    const formatDateTime = (dateTime) => {
        return new Date(dateTime).toLocaleString();
    };

    return (
        <InstructorLayout title={test.title}>
            <div className="mb-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{test.title}</h1>
                        <p className="text-gray-600">Test details and management</p>
                    </div>
                    <div className="space-x-3">
                        <Link
                            href={`/instructor/tests/${test.id}/edit`}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Edit Test
                        </Link>
                        <Link
                            href="/instructor/tests"
                            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
                        >
                            Back to Tests
                        </Link>
                    </div>
                </div>
            </div>

            {/* Test Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Overview</h2>
                        
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
                                <p className="text-gray-700">{test.description || 'No description provided'}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-2">Duration</h3>
                                    <p className="text-gray-900 font-semibold">{test.duration || 'N/A'} minutes</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-2">Total Questions</h3>
                                    <p className="text-gray-900 font-semibold">{test.total_questions || 0}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-2">Start Time</h3>
                                    <p className="text-gray-900">{test.start_time ? formatDateTime(test.start_time) : 'Not set'}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-2">End Time</h3>
                                    <p className="text-gray-900">{test.end_time ? formatDateTime(test.end_time) : 'Not set'}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-2">Passing Score</h3>
                                    <p className="text-gray-900 font-semibold">{test.passing_score || 'N/A'}%</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                        test.is_active 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {test.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {test.instructions && (
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <h3 className="text-sm font-medium text-gray-700 mb-2">Test Instructions</h3>
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <p className="text-gray-700">{test.instructions}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Statistics</h3>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Total Submissions</span>
                                <span className="text-lg font-semibold text-gray-900">{testResults?.length || 0}</span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Average Score</span>
                                <span className="text-lg font-semibold text-gray-900">
                                    {testResults?.length > 0 
                                        ? Math.round(testResults.reduce((acc, result) => acc + result.percentage, 0) / testResults.length) + '%'
                                        : 'N/A'
                                    }
                                </span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Pass Rate</span>
                                <span className="text-lg font-semibold text-green-600">
                                    {testResults?.length > 0 
                                        ? Math.round((testResults.filter(r => r.status === 'passed').length / testResults.length) * 100) + '%'
                                        : 'N/A'
                                    }
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                        
                        <div className="space-y-3">
                            <Link
                                href={`/instructor/tests/${test.id}/edit`}
                                className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Edit Test
                            </Link>
                            
                            <Link
                                href={`/instructor/tests/${test.id}/results`}
                                className="block w-full text-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                            >
                                View Results
                            </Link>
                            
                            <Link
                                href={`/instructor/tests/${test.id}/questions`}
                                className="block w-full text-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                            >
                                Manage Questions
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Test Results */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Test Results</h2>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed At</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {testResults && testResults.length > 0 ? (
                                testResults.slice(0, 10).map((result) => (
                                    <tr key={result.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <span className="text-blue-600 font-medium text-sm">
                                                        {result.user?.name?.charAt(0)?.toUpperCase() || 'S'}
                                                    </span>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{result.user?.name}</div>
                                                    <div className="text-sm text-gray-500">{result.user?.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-gray-900">{result.score || 0}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`text-sm font-medium ${
                                                result.percentage >= 70 ? 'text-green-600' : 
                                                result.percentage >= 50 ? 'text-yellow-600' : 'text-red-600'
                                            }`}>
                                                {result.percentage || 0}%
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                result.status === 'passed' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : result.status === 'failed' 
                                                        ? 'bg-red-100 text-red-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {result.status || 'pending'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {result.completed_at ? formatDateTime(result.completed_at) : 'Not completed'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <Link
                                                href={`/instructor/tests/${test.id}/results/${result.id}`}
                                                className="text-blue-600 hover:text-blue-800 transition"
                                            >
                                                View Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center">
                                        <div className="text-gray-500">
                                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <p className="text-gray-600 mt-2">No test results yet</p>
                                            <p className="text-sm text-gray-500">Students will appear here once they complete the test</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </InstructorLayout>
    );
}

export default ShowTest;
