import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

export default function CurrentAffairsIndex({ currentAffairs, categories, filters }) {
    const [searchParams, setSearchParams] = useState(filters);

    const handleFilterChange = (key, value) => {
        const newParams = { ...searchParams, [key]: value };
        setSearchParams(newParams);
        
        const queryString = new URLSearchParams(
            Object.entries(newParams).filter(([_, v]) => v !== null && v !== '')
        ).toString();
        
        window.location.href = `/current-affairs${queryString ? '?' + queryString : ''}`;
    };

    return (
        <>
            <Head title="Current Affairs - Mindpyxle Academy" />
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                
                {/* Header */}
                <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl font-bold text-center mb-4">Current Affairs</h1>
                        <p className="text-xl text-center">
                            Stay updated with the latest news and events important for your exams
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
                                    placeholder="Search current affairs..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    value={searchParams.search || ''}
                                    onChange={(e) => handleFilterChange('search', e.target.value)}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                </label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    value={searchParams.category || ''}
                                    onChange={(e) => handleFilterChange('category', e.target.value)}
                                >
                                    <option value="">All Categories</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    value={searchParams.date || ''}
                                    onChange={(e) => handleFilterChange('date', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Current Affairs List */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        {currentAffairs.data.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">📰</div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">No current affairs found</h3>
                                <p className="text-gray-600">Try adjusting your filters or search terms</p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {currentAffairs.data.map(affair => (
                                        <div key={affair.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                                            <div className="h-48 bg-gradient-to-r from-purple-500 to-pink-500 relative">
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-6xl">📰</span>
                                                </div>
                                                {affair.is_featured && (
                                                    <span className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                                                        Featured
                                                    </span>
                                                )}
                                            </div>
                                            <div className="p-6">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm text-purple-600 font-semibold">
                                                        {affair.category}
                                                    </span>
                                                    <span className="text-sm text-gray-500">
                                                        {new Date(affair.date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <h3 className="text-xl font-bold mb-2">{affair.title}</h3>
                                                <p className="text-gray-600 mb-4 line-clamp-3">{affair.content}</p>
                                                
                                                <div className="flex items-center justify-between">
                                                    <div className="text-sm text-gray-500">
                                                        {affair.author?.name || 'Admin'}
                                                    </div>
                                                    <Link 
                                                        href={`/current-affairs/${affair.id}`}
                                                        className="text-purple-600 hover:text-purple-800 font-semibold"
                                                    >
                                                        Read More →
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                {/* Pagination */}
                                {currentAffairs.links && (
                                    <div className="mt-12 flex justify-center">
                                        <nav className="flex space-x-2">
                                            {currentAffairs.links.map((link, index) => (
                                                <Link
                                                    key={index}
                                                    href={link.url || '#'}
                                                    className={`px-4 py-2 rounded ${link.active ? 'bg-purple-600 text-white' : 'bg-white text-purple-600 border border-purple-600'} ${!link.url ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-50'}`}
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

                {/* Categories Overview */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {categories.map((category, index) => (
                                <Link 
                                    key={index}
                                    href={`/current-affairs?category=${category}`}
                                    className="bg-gray-100 p-6 rounded-lg text-center hover:bg-purple-100 transition"
                                >
                                    <div className="text-3xl mb-3">
                                        {category === 'National' ? '🇮🇳' :
                                         category === 'International' ? '🌍' :
                                         category === 'Economy' ? '💰' :
                                         category === 'Science' ? '🔬' :
                                         category === 'Sports' ? '⚽' :
                                         category === 'Awards' ? '🏆' : '📰'}
                                    </div>
                                    <h3 className="font-semibold text-gray-800">{category}</h3>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
