import appwriteService from "../appwrite/config"
import { Link } from "react-router-dom"

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700 hover:border-gray-600 hover:translate-y-[-5px] group">
        <div className="w-full mb-2 overflow-hidden">
          <img
            src={appwriteService.getFilePreview(featuredImage) || "/placeholder.svg"}
            alt={title}
            className="rounded-t-xl w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
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
