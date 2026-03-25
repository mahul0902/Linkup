import mongoose from 'mongoose'
const Schema = mongoose.Schema

const postSchema = new Schema({
    author: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true,
    maxLength: 1000
  },
  image: {
    type: String,
    default: "https://picsum.photos/id/866/800/600"
  },
  likes: {
    type: Number,
    default: 0
  },
  created_at: {
    type: Date,
    default: Date.now // If a user makes a new post, it defaults to exactly right now
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment' // Keeps the connection to your Comment model
  }]
})

export const Post = mongoose.model("Post", postSchema)