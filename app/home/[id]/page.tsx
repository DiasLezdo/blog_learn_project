import Post from "@/models/post";
import React from "react";
import PostProfile from "./PostProfile";
import Comments from "@/app/components/Comments";
import AddComment from "@/app/components/AddComment";

interface Props {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: Props) => {
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
              avatar={post.createdUser?.avatar}
              facebook={post.createdUser?.socialLinks?.facebook}
              twitter={post.createdUser?.socialLinks?.twitter}
              linkedin={post.createdUser?.socialLinks?.linkedin}
              profession={post.createdUser?.profession}
              updatedAt={post.updatedAt}
              title={post.title}
            />
            <div className="bg-white">
              {/* <pre>{post.content}</pre> */}
              <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
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
