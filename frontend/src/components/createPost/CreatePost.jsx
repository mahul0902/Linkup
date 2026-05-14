import { useState, useRef } from "react";
// import { Image, Smile } from 'lucide-react'
import { Image as ImageIcon, X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext.jsx";

function CreatePost({ onPost }) {
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef(null);
  const { authUser } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL;

  // Handle the user selecting an image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Creates a local preview URL
    }
  };

  // Remove the selected image
  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    if (!content.trim() && !imageFile) return;

    setIsSubmitting(true);

    // 1. Package the data. We MUST use FormData to send files to the backend.
    const formData = new FormData();
    formData.append("content", content);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      // 2. Send to backend
      const response = await axios.post(`${apiUrl}/posts`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" }, // Required for files!
      });

      if (response.status === 201) {
        toast.success("Post created!");

        // 3. Reset UI
        setContent("");
        clearImage();

        // 4. Update the feed
        if (onPost) {
          onPost(response.data.post);
        }
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error(error.response?.data?.error || "Failed to create post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex gap-3">
        <img
          src={
            authUser?.profileImage ||
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face"
          }
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

          {/* Image Preview Area */}
          {imagePreview && (
            <div className="relative mt-2 w-full max-w-md">
              <img
                src={imagePreview}
                alt="Upload preview"
                className="w-full h-auto rounded-xl object-cover border border-gray-200"
              />
              <button
                onClick={clearImage}
                className="absolute top-2 right-2 p-1.5 bg-gray-900/70 text-white rounded-full hover:bg-gray-900 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-2">
              {/* Hidden file input */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
              {/* Button that triggers the hidden input */}
              <button
                onClick={() => fileInputRef.current.click()}
                className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
              >
                <ImageIcon className="w-5 h-5" />
              </button>
              {/* <button className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors">
                <Smile className="w-5 h-5" />
              </button> */}
            </div>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || (!content.trim() && !imageFile)}
              className="
               w-12
                bg-linear-to-r
                from-blue-500
                to-indigo-600
                text-white
               font-semibold 
               rounded-full 
               hover:bg-slate-700 
               transition-colors"
            >
              {isSubmitting ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
