import { Post } from "../models/posts.js";

export const like = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id; // Get the logged-in user securely from Passport

  // 1. Find the specific post
  const post = await Post.findById(id);
  if (!post) {
      return res.status(404).json({ error: "Post not found." });
  }

  // 2. Check if the user's ID is already inside the likes array
  const hasLiked = post.likes.includes(userId);

  if (hasLiked) {
      // UNLIKE: If they already liked it, remove their ID from the array
      post.likes.pull(userId);
  } else {
      // LIKE: If they haven't liked it, add their ID to the array
      post.likes.push(userId);
  }

  // 3. Save the updated post to the database
  await post.save();

  // 4. Send the updated likes array back to React so the UI can update instantly!
  res.status(200).json({ 
      message: hasLiked ? "Post unliked" : "Post liked",
      likes: post.likes 
  });
}