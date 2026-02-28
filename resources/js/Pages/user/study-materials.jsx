import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

export default function UserStudyMaterials({ materials, filters }) {
    return (
        <>
            <Head title="Study Materials - Mindpyxle Academy" />
            <Navbar />
            
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Materials</h1>
                        <p className="text-gray-600">Access your course resources and study materials</p>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <div className="flex flex-wrap gap-4">
                            <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                <option value="">All Types</option>
                                <option value="pdf">PDF</option>
                                <option value="video">Video</option>
                                <option value="document">Document</option>
                                <option value="presentation">Presentation</option>
                            </select>
                            <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                <option value="">All Courses</option>
                                {/* Course options would be populated here */}
                            </select>
                        </div>
                    </div>

                    {/* Materials Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {materials?.data?.map(material => (
                            <div key={material.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                                <div className="flex items-center mb-4">
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${
                                        material.type === 'pdf' ? 'bg-red-100' :
                                        material.type === 'video' ? 'bg-blue-100' :
                                        material.type === 'document' ? 'bg-green-100' :
                                        'bg-gray-100'
                                    }`}>
                                        <svg className={`w-6 h-6 ${
                                            material.type === 'pdf' ? 'text-red-600' :
                                            material.type === 'video' ? 'text-blue-600' :
                                            material.type === 'document' ? 'text-green-600' :
                                            'text-gray-600'
                                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            {material.type === 'pdf' ? (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                            ) : material.type === 'video' ? (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            ) : (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            )}
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 mb-1">{material.title}</h3>
                                        <p className="text-sm text-gray-600">{material.topic?.course?.title}</p>
                                    </div>
                                </div>
                                
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {material.description}
                                </p>
                                
                                <div className="flex items-center justify-between mb-4">
                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                        material.type === 'pdf' ? 'bg-red-100 text-red-800' :
                                        material.type === 'video' ? 'bg-blue-100 text-blue-800' :
                                        material.type === 'document' ? 'bg-green-100 text-green-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                        {material.type?.toUpperCase()}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {material.file_size || 'Unknown size'}
                                    </span>
                                </div>
                                
                                <div className="flex space-x-2">
                                    <Link
                                        href={`/materials/${material.id}/download`}
                                        className="flex-1 bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition text-sm"
                                    >
                                        Download
                                    </Link>
                                    <Link
                                        href={`/materials/${material.id}/view`}
                                        className="flex-1 bg-gray-600 text-white text-center py-2 rounded-md hover:bg-gray-700 transition text-sm"
                                    >
                                        View
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {(!materials?.data || materials.data.length === 0) && (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No study materials found</h3>
                            <p className="text-gray-600 mb-4">Enroll in courses to access study materials</p>
                            <Link
                                href="/courses"
                                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                            >
                                Browse Courses
                            </Link>
                        </div>
                    )}

                    {/* Pagination */}
                    {materials?.links && (
                        <div className="mt-8 flex justify-center">
                            <div className="flex space-x-2">
                                {materials.links.map((link, index) => (
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
