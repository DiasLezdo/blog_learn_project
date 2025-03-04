import React from "react";
import PostCard from "../components/PostCard";
import Footer from "../components/Footer";
import Post from "@/models/post";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decrypt } from "@/libs/session";
import dbConnect from "@/libs/dbConn";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const gg = (await cookies()).get("session");

  if (!gg) {
    return redirect("/signin");
  }

  await dbConnect();
  const decrp = await decrypt(gg?.value);

  const post = await Post.find({ createdUser: decrp?._id })
    .sort("createdAt")
    .limit(parseInt((await searchParams).page) ?? 9)
    .select({ title: 1, thumbnail: 1, description: 1 });

  return (
    <>
      <div className="dark:text-cyan-500 mt-2 flex flex-row flex-wrap justify-evenly">
        {post.map((e, i) => {
          return (
            <PostCard
              key={i}
              id={e._id}
              img={e.thumbnail}
              title={e.title}
              content={e.description}
              edit={true}
            />
          );
        })}
      </div>
      {post.length > 9 && (
        <button
          type="button"
          className="w-full text-white bg-gray-800 hover:bg-gray-900 text-center focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-cyan-500 dark:hover:bg-cyan-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          <Link href={"?page=" + parseInt((await searchParams).page) + 6}>
            Load more
          </Link>
        </button>
      )}
      <Footer />
    </>
  );
};

export default page;
