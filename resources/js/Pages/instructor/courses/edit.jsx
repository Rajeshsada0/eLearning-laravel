import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import InstructorLayout from '../../../Components/InstructorLayout';

function EditCourse({ course, categories }) {
    const [topics, setTopics] = useState(course.topics || []);
    const [newTopic, setNewTopic] = useState({ 
        title: '', 
        description: '', 
        duration: '',
        video_url: '',
        notes: '',
        files: []
    });

    const { data, setData, put, processing, errors, reset } = useForm({
        title: course.title || '',
        description: course.description || '',
        category_id: course.category_id || '',
        price: course.price || '',
        is_free: course.is_free || false,
        is_active: course.is_active || true,
        requirements: course.requirements || '',
        what_you_learn: course.what_you_learn || '',
        target_audience: course.target_audience || '',
        language: course.language || 'english',
        level: course.level || 'beginner',
        duration_weeks: course.duration_weeks || '',
        topics: course.topics || [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/instructor/courses/${course.id}`, {
            onSuccess: () => {
                // Optional: Show success message
            },
        });
    };

    const addTopic = () => {
        if (newTopic.title.trim()) {
            const topicWithOrder = {
                ...newTopic,
                order: topics.length + 1,
                id: Date.now(), // Temporary ID for frontend
            };
            const updatedTopics = [...topics, topicWithOrder];
            setTopics(updatedTopics);
            setNewTopic({ 
                title: '', 
                description: '', 
                duration: '',
                video_url: '',
                notes: '',
                files: []
            });
            setData('topics', updatedTopics);
        }
    };

    const removeTopic = (index) => {
        const updatedTopics = topics.filter((_, i) => i !== index);
        setTopics(updatedTopics);
        setData('topics', updatedTopics);
    };

    const updateTopic = (index, field, value) => {
        const updatedTopics = topics.map((topic, i) => 
            i === index ? { ...topic, [field]: value } : topic
        );
        setTopics(updatedTopics);
        setData('topics', updatedTopics);
    };

    const handleFileUpload = (index, files) => {
        const updatedTopics = topics.map((topic, i) => 
            i === index ? { ...topic, files: [...topic.files, ...Array.from(files)] } : topic
        );
        setTopics(updatedTopics);
        setData('topics', updatedTopics);
    };

    const removeFile = (topicIndex, fileIndex) => {
        const updatedTopics = topics.map((topic, i) => {
            if (i === topicIndex) {
                const updatedFiles = topic.files.filter((_, j) => j !== fileIndex);
                return { ...topic, files: updatedFiles };
            }
            return topic;
        });
        setTopics(updatedTopics);
        setData('topics', updatedTopics);
    };

    const handleNewTopicFiles = (files) => {
        const updatedNewTopic = {
            ...newTopic,
            files: [...newTopic.files, ...Array.from(files)]
        };
        setNewTopic(updatedNewTopic);
    };

    const removeNewTopicFile = (fileIndex) => {
        const updatedFiles = newTopic.files.filter((_, i) => i !== fileIndex);
        setNewTopic({
            ...newTopic,
            files: updatedFiles
        });
    };

    return (
        <InstructorLayout title={`Edit ${course.title}`}>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Course</h1>
                <p className="text-gray-600">Update course information and manage topics</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Course Information */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Course Information</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Title */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Course Title *
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

                                {/* Level */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Level *
                                    </label>
                                    <select
                                        value={data.level}
                                        onChange={(e) => setData('level', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Select Level</option>
                                        <option value="beginner">Beginner</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="advanced">Advanced</option>
                                    </select>
                                    {errors.level && (
                                        <p className="mt-1 text-sm text-red-600">{errors.level}</p>
                                    )}
                                </div>

                                {/* Description */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Course Description *
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

                                {/* Price */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Price ($)
                                    </label>
                                    <input
                                        type="number"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        step="0.01"
                                        min="0"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        disabled={data.is_free}
                                    />
                                    {errors.price && (
                                        <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                                    )}
                                </div>

                                {/* Duration */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Duration (weeks)
                                    </label>
                                    <input
                                        type="number"
                                        value={data.duration_weeks}
                                        onChange={(e) => setData('duration_weeks', e.target.value)}
                                        min="1"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                    {errors.duration_weeks && (
                                        <p className="mt-1 text-sm text-red-600">{errors.duration_weeks}</p>
                                    )}
                                </div>

                                {/* Language */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Language *
                                    </label>
                                    <select
                                        value={data.language}
                                        onChange={(e) => setData('language', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="english">English</option>
                                        <option value="spanish">Spanish</option>
                                        <option value="french">French</option>
                                        <option value="german">German</option>
                                    </select>
                                    {errors.language && (
                                        <p className="mt-1 text-sm text-red-600">{errors.language}</p>
                                    )}
                                </div>

                                {/* Free Course */}
                                <div className="md:col-span-2">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.is_free}
                                            onChange={(e) => setData('is_free', e.target.checked)}
                                            className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Free Course</span>
                                    </label>
                                </div>

                                {/* Requirements */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Requirements
                                    </label>
                                    <textarea
                                        value={data.requirements}
                                        onChange={(e) => setData('requirements', e.target.value)}
                                        rows={3}
                                        placeholder="What students need to know before taking this course"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                    {errors.requirements && (
                                        <p className="mt-1 text-sm text-red-600">{errors.requirements}</p>
                                    )}
                                </div>

                                {/* What You Learn */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        What You'll Learn
                                    </label>
                                    <textarea
                                        value={data.what_you_learn}
                                        onChange={(e) => setData('what_you_learn', e.target.value)}
                                        rows={3}
                                        placeholder="What students will learn from this course"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                    {errors.what_you_learn && (
                                        <p className="mt-1 text-sm text-red-600">{errors.what_you_learn}</p>
                                    )}
                                </div>

                                {/* Target Audience */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Target Audience
                                    </label>
                                    <textarea
                                        value={data.target_audience}
                                        onChange={(e) => setData('target_audience', e.target.value)}
                                        rows={3}
                                        placeholder="Who this course is for"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                    {errors.target_audience && (
                                        <p className="mt-1 text-sm text-red-600">{errors.target_audience}</p>
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
                                        <span className="ml-2 text-sm text-gray-700">Course is active</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Course Topics Section */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-gray-900">Course Topics</h2>
                                <span className="text-sm text-gray-500">{topics.length} topics</span>
                            </div>

                            {/* Add New Topic */}
                            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                <h3 className="text-sm font-medium text-gray-700 mb-3">Add New Topic</h3>
                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        placeholder="Topic title"
                                        value={newTopic.title}
                                        onChange={(e) => setNewTopic({...newTopic, title: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                    <textarea
                                        placeholder="Topic description"
                                        value={newTopic.description}
                                        onChange={(e) => setNewTopic({...newTopic, description: e.target.value})}
                                        rows={2}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                    <input
                                        type="url"
                                        placeholder="YouTube video URL (optional)"
                                        value={newTopic.video_url}
                                        onChange={(e) => setNewTopic({...newTopic, video_url: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                    <textarea
                                        placeholder="Additional notes for this topic"
                                        value={newTopic.notes}
                                        onChange={(e) => setNewTopic({...newTopic, notes: e.target.value})}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                    
                                    {/* File Upload */}
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="text-sm font-medium text-gray-700">Upload Files (PDF, DOC, Images)</h4>
                                            <span className="text-xs text-gray-500">{newTopic.files.length} files</span>
                                        </div>
                                        <input
                                            type="file"
                                            multiple
                                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4,.avi,.mov"
                                            onChange={(e) => handleNewTopicFiles(e.target.files)}
                                            className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                                        />
                                        {newTopic.files.length > 0 && (
                                            <div className="mt-3 space-y-2">
                                                {newTopic.files.map((file, index) => (
                                                    <div key={index} className="flex items-center justify-between bg-white p-2 rounded border border-gray-200">
                                                        <div className="flex items-center space-x-2">
                                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                            </svg>
                                                            <span className="text-sm text-gray-700 truncate max-w-xs">{file.name}</span>
                                                            <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeNewTopicFile(index)}
                                                            className="text-red-600 hover:text-red-800 transition"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="flex space-x-3">
                                        <input
                                            type="number"
                                            placeholder="Duration (minutes)"
                                            value={newTopic.duration}
                                            onChange={(e) => setNewTopic({...newTopic, duration: e.target.value})}
                                            min="1"
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        <button
                                            type="button"
                                            onClick={addTopic}
                                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                                        >
                                            Add Topic
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Topics List */}
                            <div className="space-y-4">
                                {topics.map((topic, index) => (
                                    <div key={topic.id || index} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                    <span className="text-green-600 font-medium text-sm">{index + 1}</span>
                                                </div>
                                                <input
                                                    type="text"
                                                    value={topic.title}
                                                    onChange={(e) => updateTopic(index, 'title', e.target.value)}
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                    placeholder="Topic title"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeTopic(index)}
                                                className="text-red-600 hover:text-red-800 transition"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                        
                                        <textarea
                                            value={topic.description}
                                            onChange={(e) => updateTopic(index, 'description', e.target.value)}
                                            rows={2}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent mb-3"
                                            placeholder="Topic description"
                                        />
                                        
                                        {/* Video URL Input */}
                                        <div className="mb-3">
                                            <label className="block text-xs font-medium text-gray-700 mb-1">YouTube Video URL</label>
                                            <div className="flex space-x-2">
                                                <input
                                                    type="url"
                                                    value={topic.video_url || ''}
                                                    onChange={(e) => updateTopic(index, 'video_url', e.target.value)}
                                                    placeholder="https://youtube.com/watch?v=..."
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                                                />
                                                {topic.video_url && (
                                                    <a
                                                        href={topic.video_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
                                                    >
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545c-7.473 0-12.498 2.505-13.376 2.505a3.016 3.016 0 0 0-2.122 2.136C3.502 9.593 3 12.293 3 14.622s.502 5.03 2.502 6.436a3.016 3.016 0 0 0 2.122 2.136c.878.0 5.903 2.505 13.376 2.505 7.473 0 12.498-2.505 13.376-2.505a3.016 3.016 0 0 0 2.122-2.136C20.498 15.407 21 12.707 21 10.378s-.502-5.03-2.502-6.436zM9.545 10.378c0-1.414 1.122-2.565 2.505-2.565 1.383 0 2.505 1.151 2.505 2.565 0 1.414-1.122 2.565-2.505 2.565-1.383 0-2.505-1.151-2.505-2.565zm5.91 4.545c0-1.414 1.122-2.565 2.505-2.565 1.383 0 2.505 1.151 2.505 2.565 0 1.414-1.122 2.565-2.505 2.565-1.383 0-2.505-1.151-2.505-2.565z"/>
                                                        </svg>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {/* Notes Section */}
                                        <div className="mb-3">
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Additional Notes</label>
                                            <textarea
                                                value={topic.notes || ''}
                                                onChange={(e) => updateTopic(index, 'notes', e.target.value)}
                                                rows={2}
                                                placeholder="Additional notes or instructions for this topic"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                                            />
                                        </div>
                                        
                                        {/* Files Section */}
                                        <div className="mb-3">
                                            <div className="flex items-center justify-between mb-2">
                                                <label className="block text-xs font-medium text-gray-700">Topic Files</label>
                                                <div className="flex items-center space-x-2">
                                                    <input
                                                        type="file"
                                                        multiple
                                                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4,.avi,.mov"
                                                        onChange={(e) => handleFileUpload(index, e.target.files)}
                                                        className="text-xs text-gray-600 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                                                    />
                                                    <span className="text-xs text-gray-500">
                                                        {topic.files?.length || 0} files
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            {topic.files && topic.files.length > 0 && (
                                                <div className="space-y-2">
                                                    {topic.files.map((file, fileIndex) => (
                                                        <div key={fileIndex} className="flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-200">
                                                            <div className="flex items-center space-x-2">
                                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                </svg>
                                                                <span className="text-sm text-gray-700 truncate max-w-xs">{file.name}</span>
                                                                <span className="text-xs text-gray-500">
                                                                    {(file.size / 1024).toFixed(1)} KB
                                                                </span>
                                                                {file.type && (
                                                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                                                        {file.type.split('/')[1]?.toUpperCase() || 'FILE'}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => removeFile(index, fileIndex)}
                                                                className="text-red-600 hover:text-red-800 transition"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        
                                        <input
                                            type="number"
                                            value={topic.duration}
                                            onChange={(e) => updateTopic(index, 'duration', e.target.value)}
                                            min="1"
                                            placeholder="Duration (minutes)"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>
                                ))}
                            </div>

                            {topics.length === 0 && (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-600">No topics added yet</p>
                                    <p className="text-sm text-gray-500 mt-1">Add your first topic to structure your course</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Actions</h3>
                            
                            <div className="space-y-3">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                                >
                                    {processing ? 'Updating...' : 'Update Course'}
                                </button>
                                
                                <button
                                    type="button"
                                    onClick={() => reset()}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                                >
                                    Reset Changes
                                </button>
                                
                                <Link
                                    href={`/instructor/courses/${course.id}`}
                                    className="w-full block text-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </Link>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Links</h4>
                                <div className="space-y-2">
                                    <Link
                                        href={`/instructor/courses/${course.id}`}
                                        className="block text-sm text-blue-600 hover:text-blue-800"
                                    >
                                        View Course
                                    </Link>
                                    <Link
                                        href="/instructor/courses"
                                        className="block text-sm text-blue-600 hover:text-blue-800"
                                    >
                                        All Courses
                                    </Link>
                                    <Link
                                        href="/instructor/dashboard"
                                        className="block text-sm text-blue-600 hover:text-blue-800"
                                    >
                                        Dashboard
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </InstructorLayout>
    );
}

export default EditCourse;
