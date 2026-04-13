import React,{useState, useEffect,useRef} from 'react'
import Post from '../post/Post';

function commentModal({ onClose, post, onAddComment }) {

  const commentModalRef = useRef(null);
  const [comment, setComment] = useState('');
  
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

const handleCommentSubmit = () => {
    if (comment.trim()) {
      const newComment = {
        id: Date.now(),
        content: comment,
        author: currentUser, // Use the currentUser object directly
        time: new Date().toLocaleTimeString(),
      };
      onAddComment(post.id, newComment); // Call the parent's handler
      setComment('');
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

               return (
                  <div key={comment._id} className="flex items-start space-x-2">
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
               row={1}

              

            /><button
             
             onClick={handleCommentSubmit}

            
             
             className="w-15 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
              Post
            </button>
           
          </div>
 
        </div>



      </div>
    </div>
  )
}

export default commentModal