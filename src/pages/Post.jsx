import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (slug) {
            setLoading(true);
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                }
                else {
                    navigate("/");
                }
                setLoading(false);
            }).catch(error => {
                console.error("Error fetching post:", error);
                navigate("/");
                setLoading(false);
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    // More explicit check for author status
    const checkIsAuthor = () => {
        if (!post || !userData) return false;
        return post.userId === userData.$id;
    };

    const deletePost = () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            appwriteService.deletePost(post.$id).then((status) => {
                if (status) {
                    appwriteService.deleteFile(post.featuredImage);
                    navigate("/");
                }
            }).catch(error => {
                console.error("Error deleting post:", error);
            });
        }
    };

    if (loading) {
        return (
            <div className="w-full flex-1 flex flex-col bg-gray-900 text-white py-8">
                <Container>
                    <div className="flex-1 flex items-center justify-center py-20">
                        <div className="animate-pulse flex flex-col items-center">
                            <div className="h-12 w-12 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent animate-spin"></div>
                            <p className="mt-4 text-blue-400">Loading post...</p>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return post ? (
        <div className="w-full flex-1 flex flex-col bg-gray-900 text-white py-8">
            <Container>
                <div className="w-full flex justify-center mb-8 relative rounded-xl overflow-hidden shadow-xl">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="w-full max-h-96 object-cover rounded-xl"
                    />

                    {/* Debug information to help diagnose the issue */}
                    {userData && (
                        <div className="absolute left-6 top-6 bg-black bg-opacity-70 p-2 rounded text-xs">
                            {checkIsAuthor() ? "You are the author" : "Not author"}
                        </div>
                    )}

                    {/* Fixed button layout with improved visibility */}
                    {checkIsAuthor() && (
                        <div className="absolute right-6 top-6 flex space-x-3 bg-black bg-opacity-70 p-2 rounded">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-600 hover:bg-green-700" className="px-4 py-2">
                                    Edit
                                </Button>
                            </Link>
                            <Button 
                                bgColor="bg-red-600 hover:bg-red-700" 
                                className="px-4 py-2"
                                onClick={deletePost}
                            >
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-3xl font-bold">{post.title}</h1>
                    
                    {/* Alternative position for buttons if top overlay doesn't work */}
                    {checkIsAuthor() && (
                        <div className="flex mt-4 space-x-3">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-600 hover:bg-green-700" className="px-4 py-2">
                                    Edit
                                </Button>
                            </Link>
                            <Button 
                                bgColor="bg-red-600 hover:bg-red-700" 
                                className="px-4 py-2"
                                onClick={deletePost}
                            >
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="browser-css bg-gray-800 p-6 rounded-xl shadow-lg">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}