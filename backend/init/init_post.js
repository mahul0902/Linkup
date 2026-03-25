import dotenv from 'dotenv';
import mongoose from "mongoose";
import { samplePosts } from "./data.js";
import { Post } from "../models/posts.js";

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

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

const initDB = async () => {
    await Post.deleteMany({});
    await Post.insertMany(samplePosts);
    console.log("data is initialized");
}

initDB();