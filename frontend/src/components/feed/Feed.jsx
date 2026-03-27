import { useState } from 'react'
import CreatePost from '../createPost/CreatePost.jsx'
import Post from '../post/Post.jsx'

function Feed() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Sarah Johnson',
      username: 'sarahj',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face',
      time: '2h ago',
      content: 'Beautiful sunset today! Nature never fails to amaze me',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
      likes: 234,
      comments: 12,
    },
    {
      id: 2,
      author: 'Alex Chen',
      username: 'alexc',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=50&h=50&fit=crop&crop=face',
      time: '4h ago',
      content: 'Morning coffee hits different',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop',
      likes: 89,
      comments: 5,
    },
  ])

  const handleNewPost = (content) => {
    const newPost = {
      id: Date.now(),
      author: 'Narendra Modi',
      username: 'Nmodu',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face',
      time: 'Just now',
      content: content,
      image: null,
      likes: 0,
      comments: 0,
    }
    setPosts([newPost, ...posts])
  }

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ))
  }

  return (
    <main className="flex-1 bg-white min-h-screen border-r border-gray-200">
      <div className="w-full ">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Feed</h1>
        </div>

        {/* Create Post */}
        <CreatePost onPost={handleNewPost} />

        {/* Posts */}
        <div>
          {posts.map((post) => (
            <Post key={post.id} post={post} onLike={handleLike} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default Feed
