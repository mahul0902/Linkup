import mongoose from "mongoose"
const Schema = mongoose.Schema

const commentSchema = new Schema({
    author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true,
    maxLength: 500 // Comments are usually shorter, so 500 is a safe limit
  },
  created_at: {
    type: Date,
    default: Date.now // Automatically stamps the exact time if a user adds a new comment
  }
})

export const Comment = mongoose.model('Comment', commentSchema)