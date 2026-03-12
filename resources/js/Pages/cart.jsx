import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { 
    ShoppingCart, 
    Trash2, 
    Plus, 
    Minus, 
    ArrowLeft,
    CreditCard,
    CheckCircle,
    BookOpen,
    User,
    Clock,
    Star
} from 'lucide-react';

export default function Cart({ cart, total, count }) {
    const handleRemoveFromCart = (courseId) => {
        router.post(`/cart/remove/${courseId}`, {}, {
            preserveScroll: true,
        });
    };

    const handleCheckout = () => {
        router.post('/cart/checkout', {}, {
            onSuccess: () => {
                // Redirect will happen automatically
            },
        });
    };

    return (
        <>
            <Head title="Shopping Cart - Infinite Education" />
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                    <ShoppingCart className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl lg:text-3xl font-bold">Shopping Cart</h1>
                                    <p className="text-blue-100">
                                        {count} {count === 1 ? 'course' : 'courses'} in your cart
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cart Content */}
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-4xl mx-auto">
                        {cart.length === 0 ? (
                            // Empty Cart
                            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <ShoppingCart className="w-10 h-10 text-gray-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                                <p className="text-gray-600 mb-8">Browse our courses and add them to your cart to get started!</p>
                                <Link 
                                    href="/courses"
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                    Browse Courses
                                </Link>
                            </div>
                        ) : (
                            // Cart with Items
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Cart Items */}
                                <div className="lg:col-span-2 space-y-4">
                                    {cart.map((item) => (
                                        <div key={item.id} className="bg-white rounded-xl shadow-lg p-6">
                                            <div className="flex gap-4">
                                                {/* Course Image */}
                                                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <BookOpen className="w-8 h-8 text-blue-600" />
                                                </div>
                                                
                                                {/* Course Info */}
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                                                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                                                <span className="flex items-center gap-1">
                                                                    <User className="w-3 h-3" />
                                                                    {item.instructor}
                                                                </span>
                                                                <span className="flex items-center gap-1">
                                                                    <BookOpen className="w-3 h-3" />
                                                                    {item.category}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => handleRemoveFromCart(item.id)}
                                                            className="text-red-500 hover:text-red-700 transition-colors"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                    
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex items-center gap-2">
                                                            {item.is_free ? (
                                                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                                                    Free
                                                                </span>
                                                            ) : (
                                                                <span className="text-xl font-bold text-gray-900">
                                                                    ₹{item.price}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            Added {new Date(item.added_at).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Order Summary */}
                                <div className="lg:col-span-1">
                                    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
                                        <h3 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h3>
                                        
                                        <div className="space-y-3 mb-6">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Subtotal ({count} items)</span>
                                                <span className="font-medium">₹{total}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Discount</span>
                                                <span className="font-medium text-green-600">₹0</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Tax</span>
                                                <span className="font-medium">₹0</span>
                                            </div>
                                            <div className="border-t pt-3">
                                                <div className="flex justify-between">
                                                    <span className="font-bold text-gray-900">Total</span>
                                                    <span className="text-xl font-bold text-gray-900">₹{total}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleCheckout}
                                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 font-medium"
                                        >
                                            <CreditCard className="w-5 h-5" />
                                            Proceed to Checkout
                                        </button>

                                        <Link 
                                            href="/courses"
                                            className="block w-full text-center mt-3 text-blue-600 hover:text-blue-800 transition-colors"
                                        >
                                            Continue Shopping
                                        </Link>

                                        {/* Security Badge */}
                                        <div className="mt-6 pt-6 border-t border-gray-200">
                                            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                                                <CheckCircle className="w-4 h-4 text-green-600" />
                                                <span>Secure Checkout</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}
