import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { PostCard } from '../components';
import { Container } from '../components';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [featuredCourse, setFeaturedCourse] = useState(null);

    useEffect(() => {
        setLoading(true);
        appwriteService.getPosts().then((posts) => {
            if (posts && posts.documents.length > 0) {
                setPosts(posts.documents);
                setFeaturedCourse(posts.documents[0]); // Set first post as featured course
            }
            setLoading(false);
        }).catch(error => {
            console.error("Error fetching posts:", error);
            setLoading(false);
        });
    }, []);

    // Sample educational categories
    const categories = [
        { name: "Programming", icon: "💻", count: 15, color: "bg-blue-600" },
        { name: "Web Development", icon: "📐", count: 10, color: "bg-green-600" },
        { name: "Data Structure", icon: "🔬", count: 12, color: "bg-purple-600" },
        { name: "Machine Learning", icon: "📚", count: 8, color: "bg-orange-600" },
    ];

    const HeroSection = () => (
        <div className="relative overflow-hidden py-16 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 rounded-xl mb-12">
            <div className="absolute inset-0 bg-opacity-20 bg-pattern"></div>
            <div className="relative z-10 px-8 flex flex-col items-center text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                    Learn, Grow, Succeed
                </h1>
                <p className="text-xl text-gray-200 mb-8 max-w-2xl">
                    Discover a world of knowledge with our expertly crafted courses and educational resources.
                    Start your learning journey today!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                        onClick={() => window.location.href = '/signup'}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-all duration-300 font-medium"
                    >
                        Start Learning
                    </button>
                    <button 
                        onClick={() => window.location.href = '/courses'}
                        className="px-6 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white rounded-full transition-all duration-300 font-medium"
                    >
                        Explore Courses
                    </button>
                </div>
            </div>
        </div>
    );

    const FeaturedCourseSection = () => {
        if (!featuredCourse) return null;
        
        return (
            <div className="mb-12 bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-blue-300">Featured Course</h2>
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/2 rounded-lg overflow-hidden">
                        {featuredCourse.featuredImage && (
                            <img 
                                src={appwriteService.getFilePreview(featuredCourse.featuredImage)} 
                                alt={featuredCourse.title}
                                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                            />
                        )}
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold mb-2 text-white">{featuredCourse.title}</h3>
                        <p className="text-gray-300 mb-4 line-clamp-3">
                            {featuredCourse.content}
                        </p>
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-sm text-blue-400">4.8 ★ (1,234 reviews)</span>
                            <span className="text-sm text-gray-400">• 12 hours</span>
                        </div>
                        <button 
                            onClick={() => window.location.href = `/course/${featuredCourse.$id}`}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 font-medium w-fit"
                        >
                            Enroll Now
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const CategoriesSection = () => (
        <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-blue-300">Popular Subjects</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((category) => (
                    <div 
                        key={category.name}
                        className={`${category.color} p-4 rounded-lg hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col items-center`}
                    >
                        <span className="text-3xl mb-2">{category.icon}</span>
                        <h3 className="font-medium text-lg text-white">{category.name}</h3>
                        <p className="text-gray-200 text-sm">{category.count} courses</p>
                    </div>
                ))}
            </div>
        </div>
    );

    const WhyChooseUsSection = () => (
        <div className="mb-12 bg-gray-800 p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-blue-300 text-center">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                    <span className="text-4xl mb-4 block">📖</span>
                    <h3 className="font-semibold text-lg mb-2">Expert-Led Content</h3>
                    <p className="text-gray-300">Learn from industry professionals and academic experts.</p>
                </div>
                <div className="text-center p-4">
                    <span className="text-4xl mb-4 block">⏰</span>
                    <h3 className="font-semibold text-lg mb-2">Flexible Learning</h3>
                    <p className="text-gray-300">Study at your own pace, anytime, anywhere.</p>
                </div>
                <div className="text-center p-4">
                    <span className="text-4xl mb-4 block">🏆</span>
                    <h3 className="font-semibold text-lg mb-2">Certificates</h3>
                    <p className="text-gray-300">Earn recognized credentials for your achievements.</p>
                </div>
            </div>
        </div>
    );

    const TestimonialSection = () => (
        <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-blue-300 text-center">What Our Students Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg">
                    <p className="text-gray-300 mb-4">"This platform transformed my career. The courses are well-structured and engaging!"</p>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full"></div>
                        <div>
                            <p className="font-medium">Sarah J.</p>
                            <p className="text-sm text-gray-400">Web Developer</p>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                    <p className="text-gray-300 mb-4">"I love the flexibility and quality of content. Highly recommended!"</p>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-600 rounded-full"></div>
                        <div>
                            <p className="font-medium">Michael R.</p>
                            <p className="text-sm text-gray-400">Data Analyst</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const LearningPathsSection = () => (
        <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-blue-300 text-center">Learning Paths</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg hover:shadow-lg transition-all duration-300">
                    <h3 className="text-xl font-semibold mb-2 text-white">Beginner to Pro Coder</h3>
                    <p className="text-gray-300 mb-4">Master programming from scratch with this comprehensive path.</p>
                    <button 
                        onClick={() => window.location.href = '/learning-paths/coding'}
                        className="text-blue-400 hover:text-blue-300 font-medium"
                    >
                        Start Path →
                    </button>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg hover:shadow-lg transition-all duration-300">
                    <h3 className="text-xl font-semibold mb-2 text-white">Data Science Essentials</h3>
                    <p className="text-gray-300 mb-4">Dive into data analysis, visualization, and machine learning.</p>
                    <button 
                        onClick={() => window.location.href = '/learning-paths/data-science'}
                        className="text-blue-400 hover:text-blue-300 font-medium"
                    >
                        Start Path →
                    </button>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg hover:shadow-lg transition-all duration-300">
                    <h3 className="text-xl font-semibold mb-2 text-white">Academic Excellence</h3>
                    <p className="text-gray-300 mb-4">Boost your grades with core subject mastery.</p>
                    <button 
                        onClick={() => window.location.href = '/learning-paths/academics'}
                        className="text-blue-400 hover:text-blue-300 font-medium"
                    >
                        Start Path →
                    </button>
                </div>
            </div>
        </div>
    );

    const ResourcesSection = () => (
        <div className="mb-12 bg-gradient-to-r from-blue-900 to-indigo-900 p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-white text-center">Free Learning Resources</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                    <span className="text-3xl mb-2 block">📝</span>
                    <p className="text-gray-200 font-medium">Study Guides</p>
                    <a href="#" className="text-blue-300 hover:text-blue-200 text-sm">Download Now</a>
                </div>
                <div className="text-center">
                    <span className="text-3xl mb-2 block">🎥</span>
                    <p className="text-gray-200 font-medium">Video Tutorials</p>
                    <a href="#" className="text-blue-300 hover:text-blue-200 text-sm">Watch Now</a>
                </div>
                <div className="text-center">
                    <span className="text-3xl mb-2 block">❓</span>
                    <p className="text-gray-200 font-medium">Practice Quizzes</p>
                    <a href="#" className="text-blue-300 hover:text-blue-200 text-sm">Try Now</a>
                </div>
                <div className="text-center">
                    <span className="text-3xl mb-2 block">📊</span>
                    <p className="text-gray-200 font-medium">Cheat Sheets</p>
                    <a href="#" className="text-blue-300 hover:text-blue-200 text-sm">Get Now</a>
                </div>
            </div>
        </div>
    );

    return (
        <div className="w-full flex-1 flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen">
            <Container>
                {loading ? (
                    <div className="flex-1 flex items-center justify-center py-20">
                        <div className="animate-pulse flex flex-col items-center">
                            <div className="h-12 w-12 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent animate-spin"></div>
                            <p className="mt-4 text-blue-400">Loading educational content...</p>
                        </div>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="flex-1 flex flex-col py-12">
                        <HeroSection />
                        <div className="text-center py-20">
                            <h1 className="text-3xl font-bold mb-4">Welcome to EduPlatform</h1>
                            <p className="text-xl text-gray-300 mb-8 max-w-md mx-auto">
                                Sign in to access premium courses and educational resources.
                            </p>
                            <button 
                                onClick={() => window.location.href = '/login'}
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-all duration-300 font-medium"
                            >
                                Login to Start Learning
                            </button>
                        </div>
                        <CategoriesSection />
                        <ResourcesSection />
                    </div>
                ) : (
                    <div className="flex-1 w-full py-8">
                        <HeroSection />
                        <FeaturedCourseSection />
                        <CategoriesSection />
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold mb-6 text-blue-300">Latest Courses</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {posts.map((post) => (
                                    <div key={post.$id} className="w-full">
                                        <PostCard {...post} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <WhyChooseUsSection />
                        <TestimonialSection />
                        <LearningPathsSection />
                        <ResourcesSection />
                    </div>
                )}
            </Container>
        </div>
    );
}

export default Home;