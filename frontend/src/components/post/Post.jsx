import { useState } from 'react'
import { Heart, MessageCircle, Share2, MoreHorizontal, Trash2 } from 'lucide-react'
import CommentModal from '../comment/commentModal'
import axios from 'axios' // Added axios
import toast from 'react-hot-toast' // Added toast
import { useAuth } from '../../context/AuthContext.jsx' // Added useAuth
function Post({ post, onLike, onAddComment, onDelete, onDeleteComment }) {
  const { authUser } = useAuth() // Get current user
  const apiUrl = import.meta.env.VITE_API_URL

  // 1. Check if the current user already liked this post
  const initialHasLiked = authUser ? post.likes?.some(like => 
    like === authUser._id || like._id === authUser._id
  ) : false;

  const [liked, setLiked] = useState(initialHasLiked)
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0);
  const [isLiking, setIsLiking] = useState(false);

  const [expanded, setExpanded] = useState(false)
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false) // Added deleting state

  const content = post.content || "";
  const isLong = post.content.length > 120
  const shortText = post.content.slice(0, 120)

  // Check if the current logged-in user is the author of this post
  const isOwner = authUser && authUser._id === post.author?._id

  //Handle Like Function
  const handleLike = async () => {
    if (!authUser) {
      return toast.error("You must be logged in to like a post.");
    }
    if (isLiking) return; // Prevent double-clicks while request is sending

    setIsLiking(true);

    // Optimistic UI: Update instantly
    const previousLiked = liked;
    const previousCount = likeCount;

    setLiked(!previousLiked);
    setLikeCount((prev) => (previousLiked ? prev - 1 : prev + 1));

    try {
      // Send the request to your backend
      console.log("SENDING LIKE TO:", `${apiUrl}/posts/${post._id}/like`);
      const response = await axios.post(`${apiUrl}/posts/${post._id}/likes`, {}, {
        withCredentials: true
      });

      // Optional: Inform the parent Feed component if it needs to update its master state
      if (onLike && response.status === 200) {
        onLike(post._id, response.data.likes); 
      }
    } catch (error) {
      console.error("Error liking post:", error);
      toast.error("Failed to like post.");
      // Revert the UI back to normal if the backend fails
      setLiked(previousLiked);
      setLikeCount(previousCount);
    } finally {
      setIsLiking(false);
    }
  };

  // Handle Delete Function
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    setIsDeleting(true);

    try {
      const response = await axios.delete(`${apiUrl}/posts/${post._id}`, {
        withCredentials: true // Proves who is making the request
      });

      if (response.status === 200) {
        toast.success("Post deleted!");
        if (onDelete) {
          onDelete(post._id); // Update the feed instantly
        }
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error(error.response?.data?.error || "Failed to delete post.");
    } finally {
      setIsDeleting(false);
    }
  };

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

        {/* Actions Menu (Top Right) */}
        <div className="flex items-center gap-2">
          {/* Only show delete button if the user owns the post */}
          {isOwner && (
            <button 
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors disabled:opacity-50"
              title="Delete Post"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
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
        <p className="text-gray-500 leading-relaxed wrap-break-words">
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
          disabled={isLiking}
          className={`flex items-center gap-2 transition-colors ${
            liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
          }`}
        >
          <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
          <span>{likeCount}</span>
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
            onLike={onLike}
            
            onDeleteComment={onDeleteComment}
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
