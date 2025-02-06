import { decrypt } from "@/libs/session";
import Post, { IPost } from "@/models/post";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { comment, postId } = await req.json();

  try {
    const post = ((await Post.findById(postId)) as IPost) || null;

    console.log("post", post);

    if (!post) {
      return new Response(JSON.stringify({ message: "Post not found" }), {
        status: 401,
      });
    }

    // Get session cookie
    const gg = await req.cookies.get("session");

    console.log('gg', gg)

    if (!gg) {
      return new Response(JSON.stringify({ error: "Session not found" }), {
        status: 400,
      });
    }

    // Decrypt session cookie value
    const sessionValue = await decrypt(gg?.value);
    if (!sessionValue) {
      return new Response(JSON.stringify({ message: "Invalid session" }), {
        status: 400,
      });
    }

    const newComment = {
      user: sessionValue._id,
      text: comment,
      createdAt: new Date(),
    };

    try {
      await Post.findByIdAndUpdate(
        post._id,
        { $push: { comments: newComment } },
        { new: true, upsert: true }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ errorCatch: error, error: "Comment Not Update" }),
        {
          status: 401,
        }
      );
    }

    return NextResponse.json(
      {
        message: "User Comment added Successfully",
      },
      { status: 200 }
    );
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

export async function DELETE(req: NextRequest) {
  const { commentId, postId } = await req.json();

  const gg = await req.cookies.get("session");

  if (!gg) {
    return new Response(JSON.stringify({ message: "Session not found" }), {
      status: 401,
    });
  }

  try {
    // Use the $pull operator to remove the comment with the specified _id from the comments array
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );

    if (!updatedPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Comment deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
