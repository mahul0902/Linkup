import { Post } from "./models/posts.js";
import { ExpressError } from './utils/ExpressError.js';
import { postSchema, commentSchema } from './schema.js';
import { Comment } from "./models/comment.js";

//IS POST OWNER
export const isPostOwner = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found." });
        }

        if (!post.author.equals(req.user._id)) {
            return res.status(403).json({ error: "You do not have permission to edit or delete this post." });
        }

        next();
        
    } catch (error) {
        console.error("Authorization error:", error);
        return res.status(500).json({ error: "Something went wrong while checking permissions." });
    }
}

//IS COMMENT OWNER
export const isCommentOwner = async (req, res, next) => {
    try {
        const { commentId } = req.params; 
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ error: "Comment not found." });
        }

        if (!comment.author.equals(req.user._id)) {
            return res.status(403).json({ error: "You do not have permission to delete this comment." });
        }

        next();
        
    } catch (error) {
        console.error("Authorization error:", error);
        return res.status(500).json({ error: "Something went wrong while checking permissions." });
    }
};

//IS LOGGED IN MIDDLEWARE
export const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "You must be logged in to perform this action." });
    }
    // If they are logged in, let them proceed to the controller!
    next(); 
};

//POST VALIDATION MIDDLEWARE
export const validatePost = (req, res, next) => {
    let {error} = postSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

//COMMENT VALIDATION MMIDDLEWARE
export const validateComment = (req, res, next) => {
    let {error} = commentSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}