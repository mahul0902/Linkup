import { useState } from 'react'
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react'
import CommentModal from '../comment/commentModal'
function Post({ post, onLike, onAddComment }) {
  const [liked, setLiked] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [showCommentModal, setShowCommentModal] = useState(false)
  const content = post.content || "";
  const isLong = post.content.length > 120
  const shortText = post.content.slice(0, 120)

  const handleLike = () => {
    if (!liked) {
      onLike(post.id)
      setLiked(true)
    }
  }

  const postDate = new Date(post.createdAt || post.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const authorUsername = post.author?.username || 'Unknown User';
  const authorAvatar = post.author?.profileImage || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

  return (
    <article className="p-4 border-b border-gray-200 w-full max-w-full overflow-hidden">
      {/* Post Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <img
            src={authorAvatar}
            alt={authorUsername}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">{authorUsername}</h3>
              <span className="text-gray-500">@{authorUsername}</span>
              <span className="text-gray-400">·</span>
              <span className="text-gray-500">{postDate}</span>
            </div>
          </div>
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      

      {/* Post Image */}
      {post.image && (
        <div className="my-4  px-4">
          <img
            src={post.image}
            alt="Post content"
            className="w-full max-w-full h-auto object-cover rounded-2xl"
          />
        </div>
      )}
      {/* Post Content */}
      <div className="mb-3">
        <p className="text-gray-800 leading-relaxed break-words">
          {expanded || !isLong ? content : shortText + '...'}
        </p>
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-500 hover:text-blue-600 text-sm font-medium"
          >
            {expanded ? 'Show Less' : 'More'}
          </button>
        )}
      </div>
      
      {/* Post Actions */}
      <div className="flex items-center justify-center gap-16 py-4 border-t border-gray-100 mt-2">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 transition-colors ${
            liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
          }`}
        >
          <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
          <span>{post.likes?.length}</span>
        </button>
        <button 
          onClick={() => setShowCommentModal(true)}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span>{post.comments?.length}</span>
        </button>
        {showCommentModal && (
          <CommentModal
            post={post}
            onClose={() => setShowCommentModal(false)}
            onAddComment={onAddComment}
          />
        )}

        <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors">
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </article>
  )
}

export default Post
