import React,{useState, useEffect,useRef} from 'react'
import Post from '../post/Post';

function commentModal({ onClose, post, onAddComment }) {

  const commentModalRef = useRef(null);
  const [comment, setComment] = useState('');
  const currentUser = {
    id: 3,
    name: 'Ayush Sahu',
    username: 'samosaPaglu',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face',
  };
  const commentsList = post.commentsList || []; // This will now correctly re-render when `post` prop changes from parent
    
  
  

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
          <Post post={post}  />
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
            {commentsList.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-2">
                <img
                  src={comment.author.avatar}
                  alt={comment.author.name}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="font-semibold">{comment.author.name}</p>
                  <p>{comment.content}</p>
                  <p className="text-xs text-gray-500">{comment.time}</p>
                </div>
              </div>
            ))} 

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