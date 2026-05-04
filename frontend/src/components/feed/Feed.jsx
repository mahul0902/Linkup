import { useState, useEffect } from 'react'
import CreatePost from '../createPost/CreatePost.jsx'
import Post from '../post/Post.jsx'
import axios from 'axios'
import CommentModal from '../comment/commentModal.jsx'

function Feed() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [posts, setPosts] = useState([]);

  const fetchAllPosts = async () => {
    try {
        const response = await axios.get(`${apiUrl}/posts`, {
            // CRITICAL: This is what forces Axios to attach your session cookie!
            withCredentials: true 
        });

        // Axios automatically parses the JSON, so the data is ready immediately
        setPosts(response.data);
        setLoading(false);
    } catch (err) {
        console.error("Error fetching posts:", err);
        // Axios nests the backend's error message inside err.response.data
        setError(err.response?.data?.error || "Failed to load feed.");
        setLoading(false);
    }
  };

  // 3. Run the fetch function exactly once when the component mounts
  useEffect(() => {
      fetchAllPosts();
  }, []);

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  }

  const handlePostDeleted = (deletedPostId) => {
    // Keep all posts EXCEPT the one that matches the deleted ID
    setPosts(prevPosts => prevPosts.filter(post => post._id !== deletedPostId));
  };

  const handleLike = (postId, updatedLikesArray) => {
    setPosts(posts.map(post => 
        // 1. Use _id instead of id
        post._id === postId 
            // 2. Replace the old array with the brand new array from the backend
            ? { ...post, likes: updatedLikesArray }
            : post
    ));
  }

  const handleAddComment = (postId, newComment) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        // 1. Use _id for MongoDB
        post._id === postId
          ? {
              ...post,
              // 2. Just add the new comment directly to the existing comments array!
              comments: [...(post.comments || []), newComment]
            }
          : post
      )
    );
  };

  const handleDeleteComment = (postId, commentId) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post._id === postId
          ? {
              ...post,
              // Filter out the deleted comment!
              comments: post.comments.filter(comment => comment._id !== commentId)
            }
          : post
      )
    );
  };

  return (
    <main className="flex-1 min-w-80 bg-white min-h-screen border-r border-gray-200 overflow-x-hidden">
      
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Feed</h1>
      </div>

      {/* Create Post */}
      <CreatePost onPost={handleNewPost} />

      {/* Posts */}
      <div className="w-full">
        {posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            onLike={handleLike}
            onAddComment={handleAddComment} // Pass the new handler
            onDelete={handlePostDeleted}
            onDeleteComment={handleDeleteComment}
          />
        ))}
      </div>

    </main>
  )
}

export default Feed
