import React from 'react';
import { Link } from '@inertiajs/react';
import InstructorLayout from '../../Components/InstructorLayout';

function InstructorTests({ tests, filters }) {
    return (
        <InstructorLayout title="My Tests">
            <div className="mb-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Tests</h1>
                        <p className="text-gray-600">Create and manage assessment tests</p>
                    </div>
                    <Link
                        href="/instructor/tests/create"
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                        Create New Test
                    </Link>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                        <input
                            type="text"
                            placeholder="Search tests..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                            <option value="">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="draft">Draft</option>
                        </select>
                    </div>
                    <div className="flex items-end">
                        <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
                            Filter
                        </button>
                    </div>
                </div>
            </div>

            {/* Tests Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tests?.data?.map(test => (
                    <div key={test.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="h-32 bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
                            <span className="text-white font-bold text-3xl">
                                {test.title?.charAt(0)?.toUpperCase() || 'T'}
                            </span>
                        </div>
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{test.title}</h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{test.description}</p>
                            
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-2">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    <span className="text-sm text-gray-600">{test.total_questions || 0} questions</span>
                                </div>
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                    test.is_active 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {test.is_active ? 'Active' : 'Inactive'}
                                </span>
                            </div>

                            <div className="flex items-center justify-between mb-4">
                                <div className="text-sm text-gray-600">
                                    <span className="font-medium">{test.duration || 60}</span>
                                    <span className="text-xs"> minutes</span>
                                </div>
                                <div className="text-sm text-gray-600">
                                    <span className="font-medium">{test.test_results_count || 0}</span>
                                    <span className="text-xs"> submissions</span>
                                </div>
                            </div>

                            <div className="flex space-x-2">
                                <Link 
                                    href={`/instructor/tests/${test.id}`}
                                    className="flex-1 text-center px-3 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition text-sm font-medium"
                                >
                                    View
                                </Link>
                                <Link 
                                    href={`/instructor/tests/${test.id}/edit`}
                                    className="flex-1 text-center px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition text-sm font-medium"
                                >
                                    Edit
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {(!tests?.data || tests.data.length === 0) && (
                <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No tests found</h3>
                    <p className="text-gray-600 mb-4">Get started by creating your first test</p>
                    <Link
                        href="/instructor/tests/create"
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                        Create Your First Test
                    </Link>
                </div>
            )}

            {/* Pagination */}
            {tests?.links && (
                <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-8">
                    <div className="flex-1 flex justify-between sm:hidden">
                        {tests.prev_page_url && (
                            <Link href={tests.prev_page_url} className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                Previous
                            </Link>
                        )}
                        {tests.next_page_url && (
                            <Link href={tests.next_page_url} className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                Next
                            </Link>
                        )}
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{tests.from || 0}</span> to{' '}
                                <span className="font-medium">{tests.to || 0}</span> of{' '}
                                <span className="font-medium">{tests.total || 0}</span> results
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                {tests.links?.map((link, index) => (
                                    link.url && (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                link.active
                                                    ? 'z-10 bg-green-50 border-green-500 text-green-600'
                                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    )
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </InstructorLayout>
    );
}

export default InstructorTests;
