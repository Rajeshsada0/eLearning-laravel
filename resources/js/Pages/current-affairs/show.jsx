import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

export default function CurrentAffairShow({ currentAffair, related }) {
    return (
        <>
            <Head title={`${currentAffair.title} - Current Affairs - Mindpyxle Academy`} />
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                
                {/* Article Header */}
                <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center space-x-2 mb-4">
                                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                                    {currentAffair.category}
                                </span>
                                {currentAffair.is_featured && (
                                    <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                                        Featured
                                    </span>
                                )}
                            </div>
                            <h1 className="text-4xl font-bold mb-4">{currentAffair.title}</h1>
                            <div className="flex items-center space-x-6">
                                <div className="flex items-center space-x-2">
                                    <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
                                        <span className="text-lg">👤</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold">{currentAffair.author?.name || 'Admin'}</div>
                                        <div className="text-sm opacity-90">Author</div>
                                    </div>
                                </div>
                                <div className="text-sm opacity-90">
                                    {new Date(currentAffair.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Article Content */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white rounded-lg shadow-lg p-8">
                                <div className="prose max-w-none">
                                    <div className="text-lg leading-relaxed text-gray-800 whitespace-pre-wrap">
                                        {currentAffair.content}
                                    </div>
                                </div>
                                
                                {/* Tags */}
                                {currentAffair.tags && (
                                    <div className="mt-8 pt-8 border-t border-gray-200">
                                        <h3 className="text-lg font-semibold mb-4">Tags</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {currentAffair.tags.split(',').map((tag, index) => (
                                                <span key={index} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                                                    {tag.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                                {/* Share Section */}
                                <div className="mt-8 pt-8 border-t border-gray-200">
                                    <h3 className="text-lg font-semibold mb-4">Share this article</h3>
                                    <div className="flex space-x-4">
                                        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                                            Share on Facebook
                                        </button>
                                        <button className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 transition">
                                            Share on Twitter
                                        </button>
                                        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                                            Share on WhatsApp
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Articles */}
                {related.length > 0 && (
                    <section className="py-16 bg-white">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl font-bold text-center mb-12">Related Articles</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {related.map(article => (
                                    <div key={article.id} className="bg-gray-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                                        <div className="h-48 bg-gradient-to-r from-purple-500 to-pink-500 relative">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-6xl">📰</span>
                                            </div>
                                            {article.is_featured && (
                                                <span className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                                                    Featured
                                                </span>
                                            )}
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm text-purple-600 font-semibold">
                                                    {article.category}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    {new Date(article.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                                            <p className="text-gray-600 mb-4 line-clamp-2">{article.content}</p>
                                            <Link 
                                                href={`/current-affairs/${article.id}`}
                                                className="text-purple-600 hover:text-purple-800 font-semibold"
                                            >
                                                Read More →
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Call to Action */}
                <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                        <p className="text-xl mb-8">
                            Get daily current affairs delivered to your inbox
                        </p>
                        <div className="max-w-md mx-auto flex space-x-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                            />
                            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
