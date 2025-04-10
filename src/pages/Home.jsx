import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { PostCard } from '../components';
import { Container } from '../components';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
            setLoading(false);
        }).catch(error => {
            console.error("Error fetching posts:", error);
            setLoading(false);
        });
    }, []);

    return (
        <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white">
            <Container>
                {loading ? (
                    <div className="flex-grow flex items-center justify-center py-20">
                        <div className="animate-pulse flex flex-col items-center">
                            <div className="h-12 w-12 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent animate-spin"></div>
                            <p className="mt-4 text-blue-400">Loading posts...</p>
                        </div>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="flex-grow flex flex-col items-center justify-center py-20">
                        <h1 className="text-3xl font-bold text-center mb-4">
                            Welcome to the Blog
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 text-center max-w-md">
                            Sign in to view and create amazing posts
                        </p>
                        <button 
                            onClick={() => window.location.href = '/login'}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-all duration-300 font-medium"
                        >
                            Login to continue
                        </button>
                    </div>
                ) : (
                    <div className="flex-grow w-full py-8">
                        <h1 className="text-3xl font-bold mb-8 text-center">Latest Posts</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {posts.map((post) => (
                                <div
                                    key={post.$id}
                                    className="w-full"
                                >
                                    <PostCard
                                        {...post}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default Home;
