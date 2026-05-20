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

const allowedOrigins = [
    "http://localhost:5173",
    "https://linkup-five-drab.vercel.app" // Your Vercel URL (NO trailing slash!)
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }, 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
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
  secret: process.env.SECRET, 
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
    if (res.headersSent) {
        return next(err); // Let Express's default error handler take over
    }
    
    let{statusCode=500, message = "Something Went Wrong!"} = err;
    res.status(statusCode).json({error: message});
    // res.status(statusCode).send(message);
})

app.listen(8080, () => {
  console.log(`Server is running on https://linkup-lqr0.onrender.com`);
});