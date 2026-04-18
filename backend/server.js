import 'dotenv/config';

import express from 'express'
import mongoose from 'mongoose';
import {ExpressError} from './utils/ExpressError.js'
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import {User} from './models/user.js';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import postRouter from "./routes/posts.js";
import commentRouter from "./routes/comments.js";
import userRouter from "./routes/users.js";
import likeRouter from "./routes/likes.js";
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

app.use("/posts", postRouter);
app.use("/posts/:id/comments", commentRouter);
app.use("/users", userRouter);
app.use("/posts/:id/likes", likeRouter);

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