// // pages/api/posts.ts
// import mongoose from "mongoose";
// import Post from "../../models/Post"; // Assuming Post model is in models/Post.ts

import { NextResponse } from "next/server";

// // Connect to MongoDB
// const connectToDatabase = async () => {
//   if (mongoose.connections[0].readyState) {
//     return;
//   }

//   await mongoose.connect("mongodb://localhost:27017/social-app", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// };

// export default async function handler(req, res) {
//   await connectToDatabase();

//   if (req.method === "POST") {
//     const {
//       title,
//       description,
//       visible,
//       content,
//       createdUser,
//       comments,
//       likes,
//       rating,
//     } = req.body;

//     try {
//       const newPost = new Post({
//         title,
//         description,
//         visible,
//         content,
//         createdUser,
//         comments,
//         likes,
//         rating,
//       });

//       await newPost.save();

//       res
//         .status(201)
//         .json({ message: "Post created successfully", post: newPost });
//     } catch (err) {
//       res
//         .status(400)
//         .json({ message: "Error creating post", error: err.message });
//     }
//   } else {
//     res.status(405).json({ message: "Method not allowed" });
//   }
// }

export async function GET() {
  return NextResponse.json({ helo: "hello" });
}
