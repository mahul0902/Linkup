import express from 'express';
const router = express.Router();
import { wrapAsync } from '../utils/wrapAsync.js';
import * as postController from "../controllers/posts.js"
import { isLoggedIn, isPostOwner, validatePost } from '../middleware.js';
import multer from "multer";
import {storage} from "../cloudConfig.js";
const upload = multer({storage});

router.route("/")
.get(wrapAsync(postController.getAllPosts)) //Get All Posts
.post(isLoggedIn, upload.single('image'), validatePost, wrapAsync(postController.createPost)) //Create New Post

router.route("/:id")
.put(isLoggedIn, isPostOwner, upload.single('image'), validatePost, wrapAsync(postController.editPost)) //Edit Post
.delete(isLoggedIn, isPostOwner, wrapAsync(postController.destroyPost))

export default router;