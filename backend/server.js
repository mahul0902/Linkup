import 'dotenv/config';

import express from 'express'
import mongoose from 'mongoose';
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

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(8080, () => {
  console.log(`Server is running on http://localhost:8080`);
});