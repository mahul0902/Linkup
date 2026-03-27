import { useState } from 'react'
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react'

function Post({ post, onLike }) {
  const [liked, setLiked] = useState(false)

  const handleLike = () => {
    if (!liked) {
      onLike(post.id)
      setLiked(true)
    }
  }

  return (
    <article className="p-4 border-b border-gray-200">
      {/* Post Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <img
            src={post.avatar}
            alt={post.author}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">{post.author}</h3>
              <span className="text-gray-500">@{post.username}</span>
              <span className="text-gray-400">·</span>
              <span className="text-gray-500">{post.time}</span>
            </div>
          </div>
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Post Content */}
      <div className="mb-3">
        <p className="text-gray-800 leading-relaxed">{post.content}</p>
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="my-4  px-4">
          <img
            src={post.image}
            alt="Post content"
            className="w-full h-auto object-cover rounded-2xl"
          />
        </div>
      )}

      {/* Post Actions */}
      <div className="flex items-center justify-center gap-16 py-4 border-t border-gray-100 mt-2">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 transition-colors ${
            liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
          }`}
        >
          <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
          <span>{post.likes}</span>
        </button>
        <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
          <MessageCircle className="w-5 h-5" />
          <span>{post.comments}</span>
        </button>
        <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors">
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </article>
  )
}

export default Post
