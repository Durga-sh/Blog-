"use client"

import { useState, useEffect } from "react"
import { Container, PostCard } from "../components"
import appwriteService from "../appwrite/config"

function AllPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    appwriteService
      .getPosts([])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents)
        }
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching posts:", error)
        setLoading(false)
      })
  }, [])

  return (
    <div className="w-full flex-1 flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white py-10">
      <Container>
        <h1 className="text-3xl font-bold mb-8 text-center">All Posts</h1>

        {loading ? (
          <div className="flex-1 flex items-center justify-center py-20">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent animate-spin"></div>
              <p className="mt-4 text-blue-400">Loading posts...</p>
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className="flex-1 text-center py-20">
            <p className="text-xl text-gray-300">No posts found</p>
            <button
              onClick={() => (window.location.href = "/add-post")}
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-full transition-all duration-300"
            >
              Create your first post
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <div key={post.$id} className="w-full">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}

export default AllPosts