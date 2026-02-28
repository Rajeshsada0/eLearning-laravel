import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

export default function UserTests({ testResults, filters }) {
    return (
        <>
            <Head title="My Tests - Mindpyxle Academy" />
            <Navbar />
            
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Tests</h1>
                        <p className="text-gray-600">View your test results and performance</p>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <div className="flex flex-wrap gap-4">
                            <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                <option value="">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>

                    {/* Test Results */}
                    <div className="space-y-6">
                        {testResults?.data?.map(result => (
                            <div key={result.id} className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{result.mock_test?.title}</h3>
                                        <p className="text-gray-600 text-sm">{result.mock_test?.category?.name}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                            result.status === 'completed' 
                                                ? 'bg-green-100 text-green-800'
                                                : result.status === 'in_progress'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {result.status === 'completed' ? 'Completed' : 
                                             result.status === 'in_progress' ? 'In Progress' : 'Pending'}
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {new Date(result.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                {result.status === 'completed' ? (
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-gray-900">{result.percentage || 0}%</div>
                                            <div className="text-sm text-gray-600">Score</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-gray-900">{result.correct_answers || 0}</div>
                                            <div className="text-sm text-gray-600">Correct</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-gray-900">{result.total_questions || 0}</div>
                                            <div className="text-sm text-gray-600">Total Questions</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-gray-900">{result.time_taken || 'N/A'}</div>
                                            <div className="text-sm text-gray-600">Time Taken</div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mb-4">
                                        <p className="text-gray-600">
                                            {result.status === 'in_progress' 
                                                ? 'Test is in progress. Complete it to see your results.'
                                                : 'Test not started yet. Click below to begin.'}
                                        </p>
                                    </div>
                                )}

                                <div className="flex space-x-4">
                                    {result.status === 'completed' ? (
                                        <>
                                            <Link
                                                href={`/tests/${result.mock_test_id}/results/${result.id}`}
                                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                                            >
                                                View Results
                                            </Link>
                                            <Link
                                                href={`/tests/${result.mock_test_id}/review/${result.id}`}
                                                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
                                            >
                                                Review Answers
                                            </Link>
                                        </>
                                    ) : result.status === 'in_progress' ? (
                                        <Link
                                            href={`/tests/${result.mock_test_id}/continue/${result.id}`}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                                        >
                                            Continue Test
                                        </Link>
                                    ) : (
                                        <Link
                                            href={`/tests/${result.mock_test_id}/start`}
                                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                                        >
                                            Start Test
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {(!testResults?.data || testResults.data.length === 0) && (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No tests yet</h3>
                            <p className="text-gray-600 mb-4">Take a mock test to evaluate your knowledge</p>
                            <Link
                                href="/tests"
                                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                            >
                                Browse Tests
                            </Link>
                        </div>
                    )}

                    {/* Pagination */}
                    {testResults?.links && (
                        <div className="mt-8 flex justify-center">
                            <div className="flex space-x-2">
                                {testResults.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className={`px-3 py-2 rounded-md ${
                                            link.active
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}
