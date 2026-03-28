import { Post } from "./models/posts.js";
import { ExpressError } from './utils/ExpressError.js';
import { postSchema, commentSchema } from './schema.js';
import { Comment } from "./models/comment.js";

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