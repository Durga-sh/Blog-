import appwriteService from "../appwrite/config"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

function PostCard({ $id, title, featuredImage }) {
  const [imageUrl, setImageUrl] = useState(null)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (featuredImage) {
      // Get the image preview URL
      const url = appwriteService.getFilePreview(featuredImage)
      setImageUrl(url)
    }
  }, [featuredImage])

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700 hover:border-gray-600 hover:translate-y-[-5px] group">
        <div className="w-full mb-2 overflow-hidden h-48 bg-gray-700">
          {imageUrl && !imageError ? (
            <img
              src={imageUrl}
              alt={title}
              onError={handleImageError}
              className="rounded-t-xl w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-700">
              <svg className="w-12 h-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
            {title}
          </h2>
          <div className="mt-2 flex justify-between items-center">
            <span className="text-xs text-gray-400">Read more</span>
            <svg
              className="w-5 h-5 text-blue-500 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PostCard