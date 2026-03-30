import 'dotenv/config';

import express from 'express'
import mongoose from 'mongoose';
import {Post} from './models/posts.js'
import {Comment} from './models/comment.js'
import {ExpressError} from './utils/ExpressError.js'
import { wrapAsync } from './utils/wrapAsync.js';
import { validateComment, validatePost, isLoggedIn, isPostOwner, isCommentOwner } from './middleware.js';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import {User} from './models/user.js';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';
import multer from "multer";
import {storage} from "./cloudConfig.js";
const upload = multer({storage});
const app = express()

const dbUrl = process.env.ATLASDB_URL;

const corsOptions = {
    // Replace this with the exact URL your React app runs on! 
    // (If you use Vite, it's usually http://localhost:5173)
    origin: 'http://localhost:5173', 
    
    // THIS IS THE MOST IMPORTANT LINE FOR PASSPORT!
    // It tells Express to accept the session cookies React sends it.
    credentials: true 
};

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

app.use(cors(corsOptions));
app.use(express.json());

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600
});

store.on("error", (err) => {
    console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET, // Add this to your .env later!
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // Cookie expires in 1 week
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
};

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Root route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

//All Post/ Home Page Route
app.get("/posts", wrapAsync(async (req, res) => {
  const allPosts = await Post.find({})
      .sort({created_at: -1})
      .populate({path: 'author'})
      .populate({path: 'likes'})
      .populate({path: 'comments'})
  // console.log(allPosts);
  res.status(200).json(allPosts);
}))

//Create Post Route
app.post("/posts",isLoggedIn, upload.single('image'), validatePost, wrapAsync(async (req, res) => {
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
    await newPost.populate('author');
    res.status(201).json({ message: "Post created successfully!", post: newPost });
}))

//Delete Post Route
app.delete("/posts/:id", isLoggedIn, isPostOwner, wrapAsync(async (req, res) => {
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
app.post("/posts/:id/comments", isLoggedIn, validateComment, wrapAsync(async (req, res) => {
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
}))

//Delete Comment Route
app.delete("/posts/:id/comments/:commentId", isLoggedIn, isCommentOwner, wrapAsync(async (req, res) => {
    const { id, commentId } = req.params;
    await Post.findByIdAndUpdate(id, {$pull: {comments: commentId}});
    await Comment.findByIdAndDelete(commentId);
    res.json({ message: "Comment deleted successfully!" });
}))

//Signup User Route
app.post("/users/signup", wrapAsync(async (req, res, next) => {
  try {
    let { email, username, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(201).json({
        message: "Welcome to the application!",
        user: registeredUser // Send the user data so React can display their profile
      });
    });
  } catch (e) {
    return res.status(400).json({ 
      error: e.message 
    });
  }
}))

//Login Route
app.post("/users/login", passport.authenticate("local"), wrapAsync(async (req, res) => {
  res.status(200).json({
    message: "Welcome back!",
    user: req.user 
    });
}))

//Logout route
app.get("/users/logout", wrapAsync(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err); 
    }
    res.status(200).json({ message: "You logged out successfully!" });
  });
}))

//Delete Account Route
app.delete("/users", isLoggedIn, wrapAsync(async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
        
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    if (user.profileImage && user.profileImage.includes('cloudinary')) {
      const urlParts = user.profileImage.split('/');
      const folderAndFile = urlParts.slice(-2).join('/'); 
      const publicId = folderAndFile.split('.')[0];       
            
      await cloudinary.uploader.destroy(publicId);
    }
    await User.findByIdAndDelete(userId);
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ message: "Account deleted successfully." });
    });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ error: "Failed to delete account." });
  }
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