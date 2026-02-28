import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import InstructorLayout from '../../../Components/InstructorLayout';

function EditTest({ test, categories }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        title: test.title || '',
        description: test.description || '',
        category_id: test.category_id || '',
        duration: test.duration || '',
        total_questions: test.total_questions || '',
        start_time: test.start_time || '',
        end_time: test.end_time || '',
        is_active: test.is_active || true,
        passing_score: test.passing_score || '',
        instructions: test.instructions || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/instructor/tests/${test.id}`, {
            onSuccess: () => {
                // Optional: Show success message
            },
        });
    };

    return (
        <InstructorLayout title={`Edit ${test.title}`}>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Test</h1>
                <p className="text-gray-600">Update test information and settings</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Title */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Test Title *
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                required
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                            )}
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category *
                            </label>
                            <select
                                value={data.category_id}
                                onChange={(e) => setData('category_id', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                required
                            >
                                <option value="">Select Category</option>
                                {categories?.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category_id && (
                                <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Test Description *
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                required
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                            )}
                        </div>

                        {/* Duration */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Duration (minutes) *
                            </label>
                            <input
                                type="number"
                                value={data.duration}
                                onChange={(e) => setData('duration', e.target.value)}
                                min="1"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                required
                            />
                            {errors.duration && (
                                <p className="mt-1 text-sm text-red-600">{errors.duration}</p>
                            )}
                        </div>

                        {/* Total Questions */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Total Questions *
                            </label>
                            <input
                                type="number"
                                value={data.total_questions}
                                onChange={(e) => setData('total_questions', e.target.value)}
                                min="1"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                required
                            />
                            {errors.total_questions && (
                                <p className="mt-1 text-sm text-red-600">{errors.total_questions}</p>
                            )}
                        </div>

                        {/* Start Time */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Start Time *
                            </label>
                            <input
                                type="datetime-local"
                                value={data.start_time}
                                onChange={(e) => setData('start_time', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                required
                            />
                            {errors.start_time && (
                                <p className="mt-1 text-sm text-red-600">{errors.start_time}</p>
                            )}
                        </div>

                        {/* End Time */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                End Time *
                            </label>
                            <input
                                type="datetime-local"
                                value={data.end_time}
                                onChange={(e) => setData('end_time', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                required
                            />
                            {errors.end_time && (
                                <p className="mt-1 text-sm text-red-600">{errors.end_time}</p>
                            )}
                        </div>

                        {/* Passing Score */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Passing Score (%)
                            </label>
                            <input
                                type="number"
                                value={data.passing_score}
                                onChange={(e) => setData('passing_score', e.target.value)}
                                min="0"
                                max="100"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                            {errors.passing_score && (
                                <p className="mt-1 text-sm text-red-600">{errors.passing_score}</p>
                            )}
                        </div>

                        {/* Instructions */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Test Instructions
                            </label>
                            <textarea
                                value={data.instructions}
                                onChange={(e) => setData('instructions', e.target.value)}
                                rows={4}
                                placeholder="Special instructions for students taking this test"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                            {errors.instructions && (
                                <p className="mt-1 text-sm text-red-600">{errors.instructions}</p>
                            )}
                        </div>

                        {/* Active Status */}
                        <div className="md:col-span-2">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">Test is active</span>
                            </label>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                        <Link
                            href={`/instructor/tests/${test.id}`}
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                        >
                            Cancel
                        </Link>
                        
                        <div className="space-x-3">
                            <button
                                type="button"
                                onClick={() => reset()}
                                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                            >
                                Reset
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                            >
                                {processing ? 'Updating...' : 'Update Test'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </InstructorLayout>
    );
}

export default EditTest;
