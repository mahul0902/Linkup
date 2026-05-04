import { Comment } from "../models/comment.js";
import { Post } from "../models/posts.js";

export const createComment = async (req, res) => {
    let post = await Post.findById(req.params.id);
    let author = req.user._id;
    let newComment = new Comment({
        author: author,
        content: req.body.content
    });
    await newComment.save();
    post.comments.push(newComment._id);
    await post.save();

    const populatedComment = await newComment.populate('author', 'username profileImage');
    return res.status(201).json({ 
      message: "Comment added successfully!", 
      comment: populatedComment 
    });
}

export const destroyComment = async (req, res) => {
    const { id, commentId } = req.params;
    await Post.findByIdAndUpdate(id, {$pull: {comments: commentId}});
    await Comment.findByIdAndDelete(commentId);
    return res.status(200).json({ message: "Comment deleted successfully!" });
}