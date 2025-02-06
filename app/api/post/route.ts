import { decrypt } from "@/libs/session";
import Post, { IPost } from "@/models/post";
import { HydratedDocument } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  //   secure_distribution: "mydomain.com",  // add after host
  //   upload_prefix: "myprefix.com",
});

export async function POST(req: NextRequest) {
  try {
    // Access form data from the request
    const data = await req.formData(); // Correcting formData() usage

    // Get session cookie
    const gg = await req.cookies.get("session");

    if (!gg) {
      return new Response(JSON.stringify({ message: "Session not found" }), {
        status: 401,
      });
    }

    // Decrypt session cookie value
    const sessionValue = await decrypt(gg?.value);
    if (!sessionValue) {
      return new Response(JSON.stringify({ message: "Invalid session" }), {
        status: 401,
      });
    }

    const file = data.get("thumbnail") as File;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const uploadResult = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "next-beloogo",
          },
          (error, result) => {
            if (error || !result) {
              reject(error || new Error("Upload failed"));
              return;
            }
            resolve(result);
          }
        );

        uploadStream.end(buffer);
      }
    );

    // Update user avatar
    if (uploadResult.secure_url) {
      const post: HydratedDocument<IPost> = new Post({
        content: data.get("content"),
        description: data.get("description"),
        visible: data.get("visible"),
        title: data.get("title"),
        createdUser: sessionValue._id,
        thumbnail: uploadResult.secure_url,
      });

      await post.save();
      // console.log("Post saved:", result);
    }

    return new Response(JSON.stringify({ message: "Post Added" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Authentication error:", error);
    new Response(
      JSON.stringify({ errorCatch: error, error: "Internal Server Error." }),
      {
        status: 500,
      }
    );
    return NextResponse.redirect(new URL("/error/server", req.url));
  }
}
