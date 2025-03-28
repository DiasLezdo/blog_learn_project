import Post from "@/models/post";
import React from "react";
import PostProfile from "./PostProfile";
import Comments from "@/app/components/Comments";
import AddComment from "@/app/components/AddComment";
import { Metadata } from "next";

// The error indicates that Mongoose doesn't know about the "User" model when you try to populate it in your Post query.
// Even though you've defined and exported the User model, you need to make sure it's imported (and therefore registered)
// somewhere in your app before you try to use it in a population.

import "@/models/user";
import dbConnect from "@/libs/dbConn";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  await dbConnect();

  const post = await Post.findById((await params).id);
  return {
    metadataBase: new URL(
      `${process.env.NEXT_PUBLIC_URL!}/home/${(await params).id}`
    ),
    title: post?.title || "Default Title",
    // Here we're using the first 150 characters of the post content for the description.
    description: post?.description
      ? post.description.substring(0, 150)
      : "Default description",
    icons: {
      icon: [
        {
          url: "/favicon/blog.ico",
        },
      ],
    },
    openGraph: {
      title: post?.title || "Welcome to Blogoo",
      description: post?.description
        ? post.description.substring(0, 150)
        : "Unlock your full potential with expert-led insights and tips. Explore new skills and elevate your knowledge, one blog at a time.",

      url: `${process.env.NEXT_PUBLIC_URL!}/home/${(await params).id}`,
      images: [
        {
          url: post?.thumbnail
            ? post?.thumbnail
            : "/favicon/freepik__the-style-is-candid-image-photography-with-natural__70521.png",
          secureUrl: post?.thumbnail
            ? post?.thumbnail
            : "/favicon/freepik__the-style-is-candid-image-photography-with-natural__70521.png",
          width: 1200,
          height: 630,
          alt: "blogoo preview",
        },
      ],
      type: "website",
      siteName: `${process.env.NEXT_PUBLIC_URL!}/home/${(await params).id}`,
    },
  };
}

const page = async ({ params }: Props) => {
  await dbConnect();

  const postId = (await params).id;

  const post = await Post.findById(postId)
    .populate({
      path: "createdUser",
      select: "firstName avatar socialLinks profession",
    })
    .populate({
      path: "comments.user",
      select: "firstName avatar socialLinks profession",
    });
  // .populate({
  //   path: "likes.user",
  //   select: "firstName avatar socialLinks profession",
  // });

  // console.log("para", post);

  return (
    <>
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <PostProfile
              firstName={post.createdUser?.firstName}
              avatar={post.createdUser?.avatar || ""}
              facebook={post.createdUser?.socialLinks?.facebook}
              twitter={post.createdUser?.socialLinks?.twitter}
              linkedin={post.createdUser?.socialLinks?.linkedin}
              profession={post.createdUser?.profession}
              updatedAt={post.updatedAt}
              title={post.title}
            />
            <div className="bg-gray-300 p-2 rounded-sm">
              {/* <pre>{post.content}</pre> */}
              {/* <p dangerouslySetInnerHTML={{ __html: post.content }}></p> */}
              <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
            </div>

            <section className="not-format">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                  Discussion ({post.comments.length})
                </h2>
              </div>
              <AddComment postId={postId} />
              <Comments
                postId={postId}
                commentsData={post.comments}
                userId={post.createdUser?._id}
              />
            </section>
          </article>
        </div>
      </main>
    </>
  );
};

export default page;
