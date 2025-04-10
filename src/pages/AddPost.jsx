import { PostForm } from "../components"
import { Container } from "../components"

function AddPost() {
  return (
    <div className="w-full flex-1 flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white py-10">
      <Container>
        <div className="max-w-4xl mx-auto w-full">
          <h1 className="text-3xl font-bold mb-8 text-center">Create New Post</h1>
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
            <PostForm />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default AddPost