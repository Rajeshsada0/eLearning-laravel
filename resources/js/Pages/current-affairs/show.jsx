import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

export default function CurrentAffairShow({ currentAffair, related }) {
    return (
        <>
            <Head title={`${currentAffair.title} - Current Affairs - Mindpyxle Academy`} />
            <Navbar />
            
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    {/* Breadcrumb */}
                    <nav className="mb-8">
                        <ol className="flex items-center space-x-2 text-sm text-gray-600">
                            <li>
                                <Link href="/" className="hover:text-blue-600">Home</Link>
                            </li>
                            <li>/</li>
                            <li>
                                <Link href="/current-affairs" className="hover:text-blue-600">Current Affairs</Link>
                            </li>
                            <li>/</li>
                            <li className="text-gray-900">{currentAffair.title}</li>
                        </ol>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <article className="bg-white rounded-lg shadow-md p-8">
                                <header className="mb-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
                                            {currentAffair.category}
                                        </span>
                                        <time className="text-sm text-gray-500">
                                            {new Date(currentAffair.date).toLocaleDateString()}
                                        </time>
                                    </div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                        {currentAffair.title}
                                    </h1>
                                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                                        <span>By {currentAffair.author?.name || 'Admin'}</span>
                                        <span>•</span>
                                        <span>5 min read</span>
                                    </div>
                                </header>

                                <div className="prose prose-lg max-w-none">
                                    <div 
                                        className="text-gray-700 leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: currentAffair.content }}
                                    />
                                </div>

                                {/* Tags */}
                                {currentAffair.tags && (
                                    <div className="mt-8 pt-8 border-t border-gray-200">
                                        <h3 className="text-sm font-medium text-gray-900 mb-3">Tags</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {currentAffair.tags.split(',').map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-block px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full"
                                                >
                                                    {tag.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </article>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            {/* Related Articles */}
                            {related && related.length > 0 && (
                                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Articles</h3>
                                    <div className="space-y-4">
                                        {related.map(article => (
                                            <div key={article.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                                                <Link
                                                    href={`/current-affairs/${article.id}`}
                                                    className="block hover:text-blue-600 transition"
                                                >
                                                    <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
                                                        {article.title}
                                                    </h4>
                                                    <p className="text-sm text-gray-600 line-clamp-2">
                                                        {article.description}
                                                    </p>
                                                    <time className="text-xs text-gray-500">
                                                        {new Date(article.date).toLocaleDateString()}
                                                    </time>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Categories */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                                <div className="space-y-2">
                                    <Link
                                        href="/current-affairs?category=National"
                                        className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition"
                                    >
                                        National
                                    </Link>
                                    <Link
                                        href="/current-affairs?category=International"
                                        className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition"
                                    >
                                        International
                                    </Link>
                                    <Link
                                        href="/current-affairs?category=Economy"
                                        className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition"
                                    >
                                        Economy
                                    </Link>
                                    <Link
                                        href="/current-affairs?category=Science"
                                        className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition"
                                    >
                                        Science & Technology
                                    </Link>
                                    <Link
                                        href="/current-affairs?category=Sports"
                                        className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition"
                                    >
                                        Sports
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
