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

  <div className="
    fixed
    inset-0
    z-50
    bg-black/25
    backdrop-blur-sm
    flex
    justify-center
    items-center
    p-6
  ">

    {/* MODAL */}

    <div
      ref={commentModalRef}
      className="
        w-full
        max-w-7xl
        h-[90vh]
        bg-slate-900/95
        border
        border-slate-700/50
        rounded-4xl
        shadow-2xl
        overflow-hidden
        flex
      "
    >

      {/* LEFT SIDE */}

      <div className="
        flex-1
       
        flex
        items-center
        justify-center
        border-r
        border-slate-700/40
        overflow-y-auto
      ">

        <div className="
          w-full
          max-w-4xl
          p-6
          text-cyan-50
        ">

          <Post className="text-white"
            post={post}
            onLike={() => {}}
            
          />

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="
        w-105
        bg-slate-900/80
        backdrop-blur-xl
        flex
        flex-col
      ">

        {/* HEADER */}

        <div className="
          px-6
          py-5
          border-b
          border-slate-700/40
          flex
          items-center
          justify-between
          bg-linear-to-r
          from-blue-900/20
          to-transparent
        ">

          <h2 className="
            text-white
            text-3xl
            font-bold
            font-['Poppins']
            tracking-tight
          ">
            Comments
          </h2>

          <button
          onClick={onClose} 
          className="
            w-10
            h-10
            rounded-xl
            bg-slate-800/70
            hover:bg-slate-700
            text-slate-300
            hover:text-white
            transition-all
            duration-200
            flex
            items-center
            justify-center
            text-xl
          ">
            ✕
          </button>

        </div>

        {/* COMMENTS LIST */}

        <div className="
          flex-1
          overflow-y-auto
          px-5
          py-5
          space-y-5
        ">

          {commentsList.map((comment) => {

            const authorName =
              comment.author?.username || "Unknown";

            const authorAvatar =
              comment.author?.profileImage ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

            const commentDate = new Date(
              comment.createdAt || comment.created_at
            ).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            });

            const isCommentOwner =
              authUser &&
              authUser._id === comment.author?._id;

            return (

              <div
                key={comment._id}
                className="
                  flex
                  gap-4
                "
              >

                {/* AVATAR */}

                <img
                  src={authorAvatar}
                  alt={authorName}
                  className="
                    w-11
                    h-11
                    rounded-full
                    object-cover
                    border-2
                    border-slate-700
                    shadow-md
                  "
                />

                {/* COMMENT BODY */}

                <div className="
                  flex-1
                  bg-slate-800/70
                  border
                  border-slate-700/50
                  rounded-2xl
                  px-5
                  py-4
                ">

                  {/* TOP */}

                  <div className="
                    flex
                    items-center
                    justify-between
                    mb-2
                  ">

                    <div className="
                      flex
                      items-center
                      gap-3
                    ">

                      <h3 className="
                        text-slate-100
                        font-semibold
                        text-sm
                      ">
                        {authorName}
                      </h3>

                      <span className="
                        text-slate-400
                        text-xs
                      ">
                        {commentDate}
                      </span>

                    </div>

                    {isCommentOwner && (

                      <button
                        onClick={() =>
                          handleDeleteComment(comment._id)
                        }
                        disabled={
                          deletingCommentId === comment._id
                        }
                        className="
                          text-slate-500
                          hover:text-red-400
                          transition-colors
                          disabled:opacity-50
                        "
                      >

                        <Trash2 className="w-4 h-4" />

                      </button>

                    )}

                  </div>

                  {/* CONTENT */}

                  <p className="
                    text-slate-100
                    text-sm
                    leading-relaxed
                  ">
                    {comment.content}
                  </p>

                </div>

              </div>

            )
          })}

        </div>

        {/* INPUT SECTION */}

        <div className="
          border-t
          border-slate-700/40
          p-5
          bg-slate-900/90
        ">

          <div className="
            flex
            items-center
            gap-4
          ">

            <input
              type="text"
              placeholder="Write a comment..."
              className="
                flex-1
                bg-slate-800/80
                border
                border-slate-700
                rounded-2xl
                px-5
                py-4
                text-white
                placeholder:text-slate-400
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                transition-all
              "
              value={comment}
              onChange={(e) =>
                setComment(e.target.value)
              }
              onKeyDown={(e) =>
                e.key === 'Enter' &&
                handleCommentSubmit()
              }
            />

            <button
              onClick={handleCommentSubmit}
              disabled={
                isSubmitting ||
                !comment.trim()
              }
              className="
                px-7
                py-4
                rounded-2xl
                bg-linear-to-r
                from-blue-500
                to-indigo-600
                text-white
                font-semibold
                hover:opacity-90
                transition-all
                duration-200
                hover:scale-[1.03]
                active:scale-[0.98]
                disabled:opacity-50
                shadow-lg
              "
            >

              {isSubmitting ? "..." : "Post"}

            </button>

          </div>

        </div>

      </div>

    </div>

  </div>
)
}

export default commentModal