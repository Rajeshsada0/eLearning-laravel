import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function About() {
    return (
        <>
            <Head title="About Us - Mindpyxle Academy" />
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                
                {/* Header */}
                <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl font-bold text-center mb-4">About Mindpyxle Academy</h1>
                        <p className="text-xl text-center">
                            Empowering students to achieve their academic dreams
                        </p>
                    </div>
                </section>

                {/* Mission */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-8">
                                At Mindpyxle Academy, we are committed to providing high-quality education and comprehensive 
                                exam preparation to help students achieve their goals.
                            </p>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
