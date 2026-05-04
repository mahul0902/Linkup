import express from 'express';
const router = express.Router({mergeParams: true});
import { wrapAsync } from '../utils/wrapAsync.js';
import { isLoggedIn } from '../middleware.js';
import * as likeController from "../controllers/likes.js";

router.route("/")
.post(isLoggedIn, wrapAsync(likeController.like)); //Like

export default router;