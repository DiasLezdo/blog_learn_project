import { decrypt } from "@/libs/session";
import Post from "@/models/post";
import { NextRequest, NextResponse } from "next/server";

import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  //   secure_distribution: "mydomain.com",  // add after host
  //   upload_prefix: "myprefix.com",
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const postId = (await params).id;

  const gg = await req.cookies.get("session");

  if (!gg) {
    return NextResponse.json({ error: "Not Authorized" }, { status: 400 });
  }

  // Decrypt session cookie value
  const sessionValue = await decrypt(gg?.value);
  if (!sessionValue) {
    return NextResponse.json({ error: "invalid Session" }, { status: 400 });
  }

  const post = await Post.findById(postId);

  if (!post) {
    return NextResponse.json({ error: "Post not valid" }, { status: 400 });
  }

  if (
    post.createdUser.toString() == sessionValue._id ||
    sessionValue.role == 1
  ) {
    return NextResponse.json(
      { post: post, message: "User Verified" },
      { status: 200 }
    );
  } else {
    return NextResponse.json({ error: "Not Auth" }, { status: 400 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const postId = (await params).id;
    const data = await req.formData();

    const gg = await req.cookies.get("session");

    if (!gg) {
      return NextResponse.json({ error: "Not Authorized" }, { status: 400 });
    }

    // Decrypt session cookie value
    const sessionValue = await decrypt(gg?.value);
    if (!sessionValue) {
      return NextResponse.json({ error: "invalid Session" }, { status: 400 });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json({ error: "Post not valid" }, { status: 400 });
    }

    if (data.get("thumbnail")) {
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
        post.title = data.get("title") || post.title;
        post.description = data.get("description") || post.description;
        post.visible = data.get("visible") || post.visible;
        post.content = data.get("content") || post.content;
        post.thumbnail = uploadResult.secure_url || post.thumbnail;

        try {
          await post.save();
        } catch (error) {
          return NextResponse.json(
            { error: "Post Not updated", errorCatch: error },
            { status: 401 }
          );
        }
      } else {
        return NextResponse.json(
          { error: "Thumbnail Not Uploaded" },
          { status: 401 }
        );
      }

      // Update user avatar

      // console.log("Post saved:", result);
    } else {
      post.title = data.get("title") || post.title;
      post.description = data.get("description") || post.description;
      post.visible = data.get("visible") || post.visible;
      post.content = data.get("content") || post.content;
      try {
        await post.save();
      } catch (error) {
        return NextResponse.json(
          { error: "Post Not updated", errorCatch: error },
          { status: 401 }
        );
      }
    }
    return new Response(JSON.stringify({ message: "Post Updated" }), {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Not Auth", errorCatch: error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const postId = (await params).id;

  const gg = await req.cookies.get("session");

  if (!gg) {
    return NextResponse.json({ error: "Not Authorized" }, { status: 400 });
  }

  // Decrypt session cookie value
  const sessionValue = await decrypt(gg?.value);
  if (!sessionValue) {
    return NextResponse.json({ error: "invalid Session" }, { status: 400 });
  }

  const post = await Post.findById(postId);

  if (!post) {
    return NextResponse.json({ error: "Post not valid" }, { status: 400 });
  }

  if (
    post.createdUser.toString() == sessionValue._id ||
    sessionValue.role == 1
  ) {
    try {
      await Post.findByIdAndDelete(postId);
    } catch (error) {
      return NextResponse.json(
        { error: "post not Deleted", errorCatch: error },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Post Deleted" }, { status: 200 });
  } else {
    return NextResponse.json({ error: "Not Auth" }, { status: 400 });
  }
}
