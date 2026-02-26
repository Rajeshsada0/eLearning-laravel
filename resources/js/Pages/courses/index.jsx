import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

export default function CoursesIndex({ courses, categories, filters }) {
    const { url } = usePage();
    const [searchParams, setSearchParams] = useState(filters);

    const handleFilterChange = (key, value) => {
        const newParams = { ...searchParams, [key]: value };
        setSearchParams(newParams);
        
        const queryString = new URLSearchParams(
            Object.entries(newParams).filter(([_, v]) => v !== null && v !== '')
        ).toString();
        
        window.location.href = `/courses${queryString ? '?' + queryString : ''}`;
    };

    return (
        <>
            <Head title="Courses - Mindpyxle Academy" />
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                
                {/* Header */}
                <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl font-bold text-center mb-4">Our Courses</h1>
                        <p className="text-xl text-center">
                            Choose from our comprehensive range of exam preparation courses
                        </p>
                    </div>
                </section>

                {/* Filters */}
                <section className="py-8 bg-white shadow-sm">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Search
                                </label>
                                <input
                                    type="text"
                                    placeholder="Search courses..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={searchParams.search || ''}
                                    onChange={(e) => handleFilterChange('search', e.target.value)}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                </label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                    Course Type
                                </label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={searchParams.type || ''}
                                    onChange={(e) => handleFilterChange('type', e.target.value)}
                                >
                                    <option value="">All Types</option>
                                    <option value="Live">Live</option>
                                    <option value="Recorded">Recorded</option>
                                    <option value="Online">Online</option>
                                    <option value="Offline">Offline</option>
                                    <option value="Test Series">Test Series</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Price
                                </label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={searchParams.price || ''}
                                    onChange={(e) => handleFilterChange('price', e.target.value)}
                                >
                                    <option value="">All Prices</option>
                                    <option value="free">Free</option>
                                    <option value="paid">Paid</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Courses Grid */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        {courses.data.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">📚</div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">No courses found</h3>
                                <p className="text-gray-600">Try adjusting your filters or search terms</p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {courses.data.map(course => (
                                        <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                                            <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-500 relative">
                                                {course.is_featured && (
                                                    <span className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                                                        Featured
                                                    </span>
                                                )}
                                            </div>
                                            <div className="p-6">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm text-blue-600 font-semibold">
                                                        {course.category?.name}
                                                    </span>
                                                    <span className="text-sm text-gray-500">
                                                        {course.type}
                                                    </span>
                                                </div>
                                                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                                                <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
                                                
                                                <div className="flex items-center justify-between mb-4">
                                                    <div>
                                                        <span className="text-2xl font-bold text-green-600">
                                                            {course.is_free ? 'Free' : `₹${course.price}`}
                                                        </span>
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {course.enrollments?.length || 0} students enrolled
                                                    </div>
                                                </div>
                                                
                                                <Link 
                                                    href={`/courses/${course.id}`}
                                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full block text-center"
                                                >
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                {/* Pagination */}
                                {courses.links && (
                                    <div className="mt-12 flex justify-center">
                                        <nav className="flex space-x-2">
                                            {courses.links.map((link, index) => (
                                                <Link
                                                    key={index}
                                                    href={link.url || '#'}
                                                    className={`px-4 py-2 rounded ${link.active ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-600'} ${!link.url ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-50'}`}
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

                <Footer />
            </div>
        </>
    );
}
