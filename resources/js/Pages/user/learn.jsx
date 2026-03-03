import React, { useState, useRef, useEffect } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { 
    Play, 
    FileText, 
    Download, 
    CheckCircle, 
    Circle, 
    Clock, 
    BookOpen, 
    ArrowLeft,
    ExternalLink,
    Youtube,
    File,
    Loader2
} from 'lucide-react';

export default function LearnCourse({ course, enrollment, progress }) {
    const [activeTopic, setActiveTopic] = useState(null);
    const [isMarkingComplete, setIsMarkingComplete] = useState(false);
    const [videoProgress, setVideoProgress] = useState({});
    const videoRefs = useRef({});
    const startTimeRef = useRef({});
    const { props } = usePage();

    const markAsComplete = async (topicId, timeSpent = 0) => {
        setIsMarkingComplete(true);
        try {
            router.post(`/user/courses/${course.id}/topics/${topicId}/complete`, {
                time_spent: timeSpent
            }, {
                onSuccess: (page) => {
                    // Show success message
                    setIsMarkingComplete(false);
                    // Update local state to reflect completion
                    setVideoProgress(prev => ({ ...prev, [topicId]: { ...prev[topicId], completed: true } }));
                },
                onError: (errors) => {
                    console.error('Error marking topic complete:', errors);
                    setIsMarkingComplete(false);
                },
                preserveState: true // Keep current scroll position
            });
        } catch (error) {
            console.error('Error:', error);
            setIsMarkingComplete(false);
        }
    };

    const isYouTubeUrl = (url) => {
        return url && (url.includes('youtube.com') || url.includes('youtu.be'));
    };

    const getYouTubeEmbedUrl = (url) => {
        if (!url) return null;
        const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
        return videoId ? `https://www.youtube.com/embed/${videoId[1]}?enablejsapi=1` : null;
    };

    const handleVideoPlay = (topicId) => {
        startTimeRef.current[topicId] = Date.now();
        setVideoProgress(prev => ({ ...prev, [topicId]: { playing: true, completed: false } }));
    };

    const handleVideoEnded = (topicId) => {
        const timeSpent = Math.floor((Date.now() - (startTimeRef.current[topicId] || Date.now())) / 1000);
        setVideoProgress(prev => ({ ...prev, [topicId]: { playing: false, completed: true } }));
        
        // Auto-mark as complete when video finishes
        markAsComplete(topicId, timeSpent);
    };

    const handleTimeUpdate = (topicId, videoElement) => {
        if (videoElement && videoElement.duration) {
            const currentProgress = (videoElement.currentTime / videoElement.duration) * 100;
            setVideoProgress(prev => ({ 
                ...prev, 
                [topicId]: { 
                    ...prev[topicId], 
                    currentTime: videoElement.currentTime,
                    duration: videoElement.duration,
                    percentage: currentProgress 
                } 
            }));
        }
    };

    // YouTube API integration
    useEffect(() => {
        if (activeTopic && window.YT && window.YT.Player) {
            const topic = course.topics?.find(t => t.id === activeTopic);
            if (topic && isYouTubeUrl(topic.video_url)) {
                const videoId = topic.video_url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
                if (videoId) {
                    new window.YT.Player(`youtube-player-${activeTopic}`, {
                        videoId: videoId[1],
                        events: {
                            onStateChange: (event) => {
                                if (event.data === window.YT.PlayerState.PLAYING) {
                                    startTimeRef.current[activeTopic] = Date.now();
                                } else if (event.data === window.YT.PlayerState.ENDED) {
                                    const timeSpent = Math.floor((Date.now() - (startTimeRef.current[activeTopic] || Date.now())) / 1000);
                                    markAsComplete(activeTopic, timeSpent);
                                }
                            }
                        }
                    });
                }
            }
        }
    }, [activeTopic]);

    // Load YouTube API
    useEffect(() => {
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
    }, []);

    return (
        <>
            <Head title={`${course.title} - Learning - Mindpyxle Academy`} />
            
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <Link 
                                href="/user/courses"
                                className="flex items-center text-gray-600 hover:text-gray-900"
                            >
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                Back to Courses
                            </Link>
                            <div className="text-sm text-gray-600">
                                Enrolled: {new Date(enrollment.created_at).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Course Content Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
                                <h3 className="font-bold text-lg mb-4 flex items-center">
                                    <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                                    Course Content
                                </h3>
                                
                                <div className="space-y-2">
                                    {course.topics?.map((topic, index) => (
                                        <div key={topic.id}>
                                            <button
                                                onClick={() => setActiveTopic(activeTopic === topic.id ? null : topic.id)}
                                                className={`w-full text-left p-3 rounded-lg border transition-all ${
                                                    activeTopic === topic.id 
                                                        ? 'border-blue-500 bg-blue-50' 
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <div className="mr-3">
                                                            {progress[topic.id]?.completed || videoProgress[topic.id]?.completed ? (
                                                                <CheckCircle className="w-5 h-5 text-green-600" />
                                                            ) : (
                                                                <Circle className="w-5 h-5 text-gray-400" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-gray-900">
                                                                {index + 1}. {topic.title}
                                                            </div>
                                                            <div className="text-sm text-gray-600">
                                                                {topic.duration ? `${topic.duration} min` : 'No duration'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {progress[topic.id]?.time_spent > 0 && (
                                                        <div className="text-xs text-gray-500">
                                                            <Clock className="w-3 h-3 inline mr-1" />
                                                            {Math.round(progress[topic.id].time_spent / 60)}m
                                                        </div>
                                                    )}
                                                </div>
                                            </button>
                                            
                                            {/* Materials for this topic */}
                                            {activeTopic === topic.id && topic.materials?.length > 0 && (
                                                <div className="ml-8 mt-2 space-y-1">
                                                    {topic.materials.map(material => (
                                                        <div key={material.id} className="text-sm p-2 bg-gray-50 rounded">
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center">
                                                                    {material.type === 'video' ? (
                                                                        <Youtube className="w-4 h-4 mr-2 text-red-600" />
                                                                    ) : (
                                                                        <File className="w-4 h-4 mr-2 text-blue-600" />
                                                                    )}
                                                                    <span className="text-gray-700">{material.title}</span>
                                                                </div>
                                                                {material.file_path && (
                                                                    <a
                                                                        href={material.download_url}
                                                                        className="text-blue-600 hover:text-blue-800"
                                                                        target="_blank"
                                                                    >
                                                                        <Download className="w-4 h-4" />
                                                                    </a>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="lg:col-span-3">
                            {activeTopic ? (
                                <div className="bg-white rounded-lg shadow-lg p-6">
                                    {course.topics?.find(t => t.id === activeTopic) && (
                                        <>
                                            {/* Topic Header */}
                                            <div className="mb-6">
                                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                                    {course.topics.find(t => t.id === activeTopic).title}
                                                </h2>
                                                {course.topics.find(t => t.id === activeTopic).description && (
                                                    <p className="text-gray-600">
                                                        {course.topics.find(t => t.id === activeTopic).description}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Video Content */}
                                            {course.topics.find(t => t.id === activeTopic).video_url && (
                                                <div className="mb-6">
                                                    <h3 className="text-lg font-semibold mb-3">Video Content</h3>
                                                    {isYouTubeUrl(course.topics.find(t => t.id === activeTopic).video_url) ? (
                                                        <div className="aspect-w-16 aspect-h-9">
                                                            <div 
                                                                id={`youtube-player-${activeTopic}`}
                                                                className="w-full h-[500px] rounded-lg overflow-hidden"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <video
                                                            ref={el => videoRefs.current[activeTopic] = el}
                                                            onPlay={() => handleVideoPlay(activeTopic)}
                                                            onEnded={() => handleVideoEnded(activeTopic)}
                                                            onTimeUpdate={() => handleTimeUpdate(activeTopic, videoRefs.current[activeTopic])}
                                                            controls
                                                            className="w-full h-[500px] rounded-lg"
                                                        >
                                                            <source src={course.topics.find(t => t.id === activeTopic).video_url} />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    )}
                                                    
                                                    {/* Video Progress Indicator */}
                                                    {videoProgress[activeTopic] && (
                                                        <div className="mt-2">
                                                            <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                                                                <span>Video Progress</span>
                                                                <span>{Math.round(videoProgress[activeTopic].percentage || 0)}%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                                <div 
                                                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                                                                    style={{ width: `${videoProgress[activeTopic].percentage || 0}%` }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* Materials */}
                                            {course.topics.find(t => t.id === activeTopic).materials?.length > 0 && (
                                                <div className="mb-6">
                                                    <h3 className="text-lg font-semibold mb-3">Study Materials</h3>
                                                    <div className="space-y-3">
                                                        {course.topics.find(t => t.id === activeTopic).materials.map(material => (
                                                            <div key={material.id} className="border rounded-lg p-4">
                                                                <div className="flex items-center justify-between">
                                                                    <div className="flex items-center">
                                                                        {material.type === 'video' ? (
                                                                            <Youtube className="w-5 h-5 mr-3 text-red-600" />
                                                                        ) : (
                                                                            <FileText className="w-5 h-5 mr-3 text-blue-600" />
                                                                        )}
                                                                        <div>
                                                                            <h4 className="font-medium text-gray-900">{material.title}</h4>
                                                                            {material.duration_minutes && (
                                                                                <p className="text-sm text-gray-600">
                                                                                    Duration: {material.duration_minutes} minutes
                                                                                </p>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center space-x-2">
                                                                        {material.url && (
                                                                            <a
                                                                                href={material.url}
                                                                                target="_blank"
                                                                                className="text-blue-600 hover:text-blue-800"
                                                                            >
                                                                                <ExternalLink className="w-5 h-5" />
                                                                            </a>
                                                                        )}
                                                                        {material.download_url && (
                                                                            <a
                                                                                href={material.download_url}
                                                                                className="text-blue-600 hover:text-blue-800"
                                                                                target="_blank"
                                                                            >
                                                                                <Download className="w-5 h-5" />
                                                                            </a>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Notes */}
                                            {course.topics.find(t => t.id === activeTopic).notes && (
                                                <div className="mb-6">
                                                    <h3 className="text-lg font-semibold mb-3">Notes</h3>
                                                    <div className="bg-gray-50 rounded-lg p-4">
                                                        <p className="text-gray-700 whitespace-pre-wrap">
                                                            {course.topics.find(t => t.id === activeTopic).notes}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Action Buttons */}
                                            <div className="flex items-center justify-between pt-4 border-t">
                                                <button
                                                    onClick={() => markAsComplete(activeTopic)}
                                                    disabled={isMarkingComplete || progress[activeTopic]?.completed || videoProgress[activeTopic]?.completed}
                                                    className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center ${
                                                        progress[activeTopic]?.completed || videoProgress[activeTopic]?.completed
                                                            ? 'bg-green-600 text-white'
                                                            : 'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed'
                                                    }`}
                                                >
                                                    {isMarkingComplete ? (
                                                        <>
                                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                            Processing...
                                                        </>
                                                    ) : progress[activeTopic]?.completed || videoProgress[activeTopic]?.completed ? (
                                                        <>
                                                            <CheckCircle className="w-5 h-5 mr-2" />
                                                            Completed
                                                        </>
                                                    ) : (
                                                        <>
                                                            <CheckCircle className="w-5 h-5 mr-2" />
                                                            Mark as Complete
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                // Welcome Screen
                                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <BookOpen className="w-10 h-10 text-blue-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                        Welcome to {course.title}
                                    </h2>
                                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                                        Select a topic from the sidebar to start learning. Track your progress as you complete each topic.
                                    </p>
                                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                                        <div className="flex items-center">
                                            <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                                            {course.topics?.filter(t => progress[t.id]?.completed).length || 0} Completed
                                        </div>
                                        <div className="flex items-center">
                                            <Circle className="w-4 h-4 mr-1 text-gray-400" />
                                            {course.topics?.filter(t => !progress[t.id]?.completed).length || 0} Remaining
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
