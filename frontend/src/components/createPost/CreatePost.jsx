import { useState } from 'react'
import { Image, Smile } from 'lucide-react'

function CreatePost({ onPost }) {
  const [content, setContent] = useState('')

  const handleSubmit = () => {
    if (content.trim()) {
      onPost(content)
      setContent('')
    }
  }

  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex gap-3">
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face"
          alt="Your avatar"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1">
          <textarea
            placeholder="What's happening?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            className="w-full p-3 text-gray-700 placeholder-gray-500 bg-gray-50 border border-gray-200 rounded-xl outline-none text-lg resize-none focus:border-blue-400 focus:bg-white transition-colors"
          />
          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-2">
              <button className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors">
                <Image className="w-5 h-5"   />
              </button>
              <button className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors">
                <Smile className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={handleSubmit}
              className=" w-12 bg-slate-800 text-white font-semibold rounded-full hover:bg-slate-700 transition-colors"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
