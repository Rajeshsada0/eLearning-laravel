import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

export default function TestsIndex({ tests, categories, filters }) {
    const [searchParams, setSearchParams] = useState(filters);

    const handleFilterChange = (key, value) => {
        const newParams = { ...searchParams, [key]: value };
        setSearchParams(newParams);
        
        const queryString = new URLSearchParams(
            Object.entries(newParams).filter(([_, v]) => v !== null && v !== '')
        ).toString();
        
        window.location.href = `/tests${queryString ? '?' + queryString : ''}`;
    };

    return (
        <>
            <Head title="Mock Tests - Mindpyxle Academy" />
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                
                {/* Header */}
                <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl font-bold text-center mb-4">Mock Tests</h1>
                        <p className="text-xl text-center">
                            Practice with our comprehensive test series and track your progress
                        </p>
                    </div>
                </section>

                {/* Filters */}
                <section className="py-8 bg-white shadow-sm">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Search
                                </label>
                                <input
                                    type="text"
                                    placeholder="Search tests..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    value={searchParams.search || ''}
                                    onChange={(e) => handleFilterChange('search', e.target.value)}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                </label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    value={searchParams.category || ''}
                                    onChange={(e) => handleFilterChange('category', e.target.value)}
                                >
                                    <option value="">All Categories</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Price
                                </label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    value={searchParams.type || ''}
                                    onChange={(e) => handleFilterChange('type', e.target.value)}
                                >
                                    <option value="">All Tests</option>
                                    <option value="free">Free</option>
                                    <option value="paid">Paid</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tests Grid */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        {tests.data.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">📝</div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">No tests found</h3>
                                <p className="text-gray-600">Try adjusting your filters or search terms</p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {tests.data.map(test => (
                                        <div key={test.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                                            <div className="h-48 bg-gradient-to-r from-green-500 to-blue-500 relative">
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-6xl">📝</span>
                                                </div>
                                                {new Date(test.start_time) > new Date() ? (
                                                    <span className="absolute top-4 right-4 bg-orange-400 text-orange-900 px-3 py-1 rounded-full text-sm font-semibold">
                                                        Upcoming
                                                    </span>
                                                ) : (
                                                    <span className="absolute top-4 right-4 bg-green-400 text-green-900 px-3 py-1 rounded-full text-sm font-semibold">
                                                        Available
                                                    </span>
                                                )}
                                            </div>
                                            <div className="p-6">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm text-green-600 font-semibold">
                                                        {test.category?.name}
                                                    </span>
                                                    <span className="text-sm text-gray-500">
                                                        {test.duration || '60'} mins
                                                    </span>
                                                </div>
                                                <h3 className="text-xl font-bold mb-2">{test.title}</h3>
                                                <p className="text-gray-600 mb-4 line-clamp-3">{test.description}</p>
                                                
                                                <div className="space-y-3 mb-4">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-gray-600">Questions:</span>
                                                        <span className="font-semibold">{test.questions_count || 50}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-gray-600">Duration:</span>
                                                        <span className="font-semibold">{test.duration || 60} minutes</span>
                                                    </div>
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-gray-600">Start Time:</span>
                                                        <span className="font-semibold">
                                                            {new Date(test.start_time).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="text-2xl font-bold text-green-600">
                                                        {test.is_free ? 'Free' : `₹${test.price}`}
                                                    </span>
                                                </div>
                                                
                                                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full">
                                                    {new Date(test.start_time) > new Date() ? 'Register Now' : 'Start Test'}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                {/* Pagination */}
                                {tests.links && (
                                    <div className="mt-12 flex justify-center">
                                        <nav className="flex space-x-2">
                                            {tests.links.map((link, index) => (
                                                <Link
                                                    key={index}
                                                    href={link.url || '#'}
                                                    className={`px-4 py-2 rounded ${link.active ? 'bg-green-600 text-white' : 'bg-white text-green-600 border border-green-600'} ${!link.url ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-50'}`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ))}
                                        </nav>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Test Series?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="text-4xl mb-4">🎯</div>
                                <h3 className="text-xl font-bold mb-2">Exam Pattern</h3>
                                <p className="text-gray-600">Tests designed as per latest exam patterns</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-4">📊</div>
                                <h3 className="text-xl font-bold mb-2">Detailed Analysis</h3>
                                <p className="text-gray-600">Get comprehensive performance analysis</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-4">🏆</div>
                                <h3 className="text-xl font-bold mb-2">Leaderboard</h3>
                                <p className="text-gray-600">Compete with other aspirants</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-4">🔄</div>
                                <h3 className="text-xl font-bold mb-2">Unlimited Attempts</h3>
                                <p className="text-gray-600">Practice till you perfect</p>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
