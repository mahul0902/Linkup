import React,{useState, useEffect,useRef} from 'react'
import Post from '../post/Post';
import axios from 'axios'; // Added Axios
import toast from 'react-hot-toast'; // Added toast for feedback
import { useAuth } from '../../context/AuthContext.jsx'; // Grab the logged in user
import { Trash2 } from 'lucide-react';

function commentModal({ onClose, post, onAddComment, onDeleteComment }) {
  const commentModalRef = useRef(null);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState(null);

  const { authUser } = useAuth(); // Get current user
  const apiUrl = import.meta.env.VITE_API_URL;
  
  const commentsList = post.comments || []; // This will now correctly re-render when `post` prop changes from parent

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (commentModalRef.current && !commentModalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // ADD COMMENT HANDLER
  const handleCommentSubmit = async () => {
    if (!comment.trim() || isSubmitting) return;
    if (!authUser) {
      return toast.error("You must be logged in to comment.");
    }

    setIsSubmitting(true);

    try {
      // 1. Send the comment to the backend
      const response = await axios.post(`${apiUrl}/posts/${post._id}/comments`, 
        { content: comment }, // The payload
        { withCredentials: true } // Prove who is making the request
      );

      if (response.status === 201) {
        // 2. If successful, clear the input
        setComment('');
        toast.success("Comment added!");
        
        // 3. Call the parent handler to update the UI instantly
        // Pass the shiny new comment object (which is populated with author info from the backend)
        if (onAddComment) {
          onAddComment(post._id, response.data.comment); 
        }
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error(error.response?.data?.error || "Failed to add comment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // DELETE COMMENT HANDLER
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;

    setDeletingCommentId(commentId);

    try {
      // Send DELETE request to backend
      const response = await axios.delete(`${apiUrl}/posts/${post._id}/comments/${commentId}`, {
        withCredentials: true
      });

      if (response.status === 200) {
        toast.success("Comment deleted!");
        // Tell the parent to remove this comment from the UI instantly
        if (onDeleteComment) {
          onDeleteComment(post._id, commentId);
        }
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error(error.response?.data?.error || "Failed to delete comment.");
    } finally {
      setDeletingCommentId(null);
    }
  };

  return (
  <div className="fixed inset-0 z-999 bg-black/30 backdrop-blur-sm flex justify-center items-center">
      <div ref={commentModalRef} className="bg-white p-6  flex shadow-lg rounded-lg">        
        {/* LEFT SIDE (Post) */}
        <div className="flex-1 flex flex-col w-140">
         <div> 
          <Post post={post} onLike={() => {}} onAddComment={() => {}}  />
         </div>
        </div>

        {/* RIGHT SIDE (Comments) */}
        <div className="w-80 bg-[#e6c29f] flex flex-col rounded-r-lg ">
          {/* Header */}
          <div className="p-4 font-semibold border-b">
            Comments
          </div>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Comment */}
            {commentsList.map((comment) => {
              // Safely extract data with fallbacks
              const authorName = comment.author?.username || 'Unknown';
              const authorAvatar = comment.author?.profileImage || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
               
              // Parse the MongoDB timestamp
              const commentDate = new Date(comment.createdAt || comment.created_at).toLocaleDateString('en-US', {
              month: 'short', day: 'numeric'
            });

            // Check if the current user is the author of this comment
            const isCommentOwner = authUser && authUser._id === comment.author?._id;

            return (
              <div key={comment._id} className="flex items-start space-x-2">
                {/* Avatar & Content */}
                <div className="flex items-start space-x-2">
                  <img
                    src={authorAvatar}
                    alt={authorName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-sm">{authorName}</p>
                    <p className="text-sm text-gray-800">{comment.content}</p>
                    <p className="text-xs text-gray-500">{commentDate}</p>
                  </div>
                </div>

                {/* Delete Button (Only visible to the comment owner) */}
                {isCommentOwner && (
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    disabled={deletingCommentId === comment._id}
                    className="text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                    title="Delete Comment"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              )
            })} 
          </div>

          {/* Add Comment */}
          <div className="flex p-4 border-t">
            <input
              type="text"
              placeholder="Add Comment..."
              className="w-full p-2 rounded border"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit()} // Submits on Enter key!
              row={1}
            />
            <button
             onClick={handleCommentSubmit}    
             disabled={isSubmitting || !comment.trim()}         
             className="w-15 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
              {isSubmitting ? '...' : 'Post'}
            </button> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default commentModal