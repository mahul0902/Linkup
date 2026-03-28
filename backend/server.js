import 'dotenv/config';

import express from 'express'
import mongoose from 'mongoose';
import {Post} from './models/posts.js'
import {Comment} from './models/comment.js'
import {ExpressError} from './utils/ExpressError.js'
import { wrapAsync } from './utils/wrapAsync.js';
import { validateComment, validatePost } from './middleware.js';
import { v2 as cloudinary } from 'cloudinary';
import multer from "multer";
import {storage} from "./cloudConfig.js";
const upload = multer({storage});
const app = express()

const dbUrl = process.env.ATLASDB_URL;

main()
.then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect(dbUrl);
}

app.use(express.json());

//Root route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

//All Post/ Home Page Route
app.get("/posts", wrapAsync(async (req, res) => {
  const allPosts = await Post.find({}).populate('comments');
  // console.log(allPosts);
  res.json(allPosts);
}))

//Create Post Route
app.post("/posts", upload.single('image'), validatePost, wrapAsync(async (req, res) => {
    let author = "Asfaan";
    let {content} = req.body;
    let url = req.file.path;
    const newPost = new Post({
      author: author,
      content: content,
      image: url
    });
    await newPost.save();
    res.status(201).json({ message: "Post created successfully!", post: newPost });
}))

//Delete Post Route
app.delete("/posts/:id", wrapAsync(async (req, res) => {
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
    await Post.findByIdAndDelete(id);
    res.json({ message: "Post deleted successfully!" });
}))

//Create Comment Route
app.post("/posts/:id/comments", validateComment, wrapAsync(async (req, res) => {
    let post = await Post.findById(req.params.id);
    let author = "Ayush";
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
}))

//Delete Comment Route
app.delete("/posts/:id/comments/:commentId", wrapAsync(async (req, res) => {
    const { id, commentId } = req.params;
    await Post.findByIdAndUpdate(id, {$pull: {comments: commentId}});
    await Comment.findByIdAndDelete(commentId);
    res.json({ message: "Comment deleted successfully!" });
}))

//Create new post route
// app.get("/posts/new", (req,res) => {
//   res.send("New Post Form");
// })

//Show Route
// app.get("/posts/:id", async (req, res) => {
//   let {id} = req.params;
//   const post = await Post.findById(id).populate('comments');
//   res.json(post);
//   console.log(post);
// })

//ERROR HANDLING MIDDLEWARES
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
})

app.use((err, req, res, next) => {
    let{statusCode=500, message = "Something Went Wrong!"} = err;
    res.status(statusCode).json({error: message});
    // res.status(statusCode).send(message);
})

app.listen(8080, () => {
  console.log(`Server is running on http://localhost:8080`);
});