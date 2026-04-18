import { Comment } from "../models/comment.js";
import { Post } from "../models/posts.js";

export const createComment = async (req, res) => {
    let post = await Post.findById(req.params.id);
    let author = req.user._id;
    let newComment = new Comment({
        author: author,
        content: req.body.content
    });
    post.comments.push(newComment);
    await newComment.save();
    await post.save();
    res.status(201).json({ 
      message: "Comment added successfully!", 
      comment: newComment 
    });
}

export const destroyComment = async (req, res) => {
    const { id, commentId } = req.params;
    await Post.findByIdAndUpdate(id, {$pull: {comments: commentId}});
    await Comment.findByIdAndDelete(commentId);
    res.json({ message: "Comment deleted successfully!" });
}