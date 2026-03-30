import dotenv from 'dotenv';
import mongoose from "mongoose";
import { sampleComments } from "./data.js";
import { Comment } from "../models/comment.js";

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const dbUrl = "mongodb://127.0.0.1:27017/linkup";

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

const initDB = async () => {
    await Comment.deleteMany({});
    await Comment.insertMany(sampleComments);
    console.log("data is initialized");
}

initDB();