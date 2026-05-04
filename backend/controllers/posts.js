import { Post } from "../models/posts.js";
import { v2 as cloudinary } from 'cloudinary';

export const getAllPosts = async (req, res) => {
  const allPosts = await Post.find({})
      .sort({created_at: -1})
      .populate({path: 'author'})
      .populate({path: 'likes'})
      .populate({
        path: 'comments',
        populate: {
            path: 'author',
        }
      })
  // console.log(allPosts);
  return res.status(200).json(allPosts);
}

export const createPost = async (req, res) => {
    let author = req.user._id;
    let {content} = req.body;
    const newPost = new Post({
      author: author,
      content: content
    });
    if (req.file) {
      newPost.image = req.file.path;
    }
    await newPost.save();
    const populatedPost = await Post.findById(newPost._id).populate({
        path: 'author',
        select: 'username profileImage'
    });
    return res.status(201).json({ message: "Post created successfully!", post: populatedPost });
}

export const editPost = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  const post = await Post.findById(id);
  post.content = content;

  if (req.file) {
    // A. If the post already had an image on Cloudinary, destroy it to save space!
    if (post.image && post.image.includes('cloudinary')) {
        const urlParts = post.image.split('/');
        const folderAndFile = urlParts.slice(-2).join('/'); 
        const publicId = folderAndFile.split('.')[0];       
        
        await cloudinary.uploader.destroy(publicId);
    }
    post.image = req.file.path;
  }
  await post.save();
  return res.status(200).json({
    message: "Post updated successfully",
    post: post
  })
}

export const destroyPost = async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (post.comments && post.comments.length > 0) {
      await Comment.deleteMany({ _id: { $in: post.comments } });
    }
    if (post.image && post.image.includes('cloudinary')) {
      const urlParts = post.image.split('/');
      const folderAndFile = urlParts.slice(-2).join('/'); 
      const publicId = folderAndFile.split('.')[0];       
      
      // Tell Cloudinary to destroy the file
      await cloudinary.uploader.destroy(publicId);
    }
    await post.deleteOne();
    return res.json({ message: "Post deleted successfully!" });
}