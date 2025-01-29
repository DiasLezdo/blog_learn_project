// // pages/api/users.ts
// import mongoose from "mongoose";
// import User from "../../models/User"; // Assuming User model is in models/User.ts

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
//     const { firstName, lastName, email, password, avatar, socialLinks } =
//       req.body;

//     try {
//       const newUser = new User({
//         firstName,
//         lastName,
//         email,
//         password,
//         avatar,
//         socialLinks,
//       });

//       await newUser.save();

//       res
//         .status(201)
//         .json({ message: "User created successfully", user: newUser });
//     } catch (err) {
//       res
//         .status(400)
//         .json({ message: "Error creating user", error: err.message });
//     }
//   } else {
//     res.status(405).json({ message: "Method not allowed" });
//   }
// }
