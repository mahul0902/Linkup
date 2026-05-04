import express from 'express';
const router = express.Router({mergeParams: true});
import { wrapAsync } from '../utils/wrapAsync.js';
import * as commentController from "../controllers/comments.js"
import { isLoggedIn, validateComment, isCommentOwner } from '../middleware.js';

router.route("/")
.post(isLoggedIn, validateComment, wrapAsync(commentController.createComment)) //Create Comment

router.route("/:commentId")
.delete(isLoggedIn, isCommentOwner, wrapAsync(commentController.destroyComment)) //Delete Comment

export default router;