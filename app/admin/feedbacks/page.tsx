import React from "react";
import Link from "next/link";
import FeedBack from "@/models/feedback";
import FeedBackCard from "@/app/components/FeedBackCard";
import dbConnect from "@/libs/dbConn";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  await dbConnect();

  const feedBacks = await FeedBack.find()
    .sort({ timestamp: -1 })
    .limit(parseInt((await searchParams).page) ?? 9);

  return (
    <>
      <div className="dark:text-cyan-500 mt-2 flex flex-col flex-wrap justify-evenly gap-3">
        {feedBacks.map((e) => {
          return (
            <FeedBackCard
              key={e._id}
              email={e.email}
              subject={e.subject}
              message={e.message}
              date={e.createdAt}
            />
          );
        })}
      </div>
      {feedBacks.length > 9 && (
        <button
          type="button"
          className="w-full text-white bg-gray-800 hover:bg-gray-900 text-center focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-cyan-500 dark:hover:bg-cyan-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          <Link href={"?page=" + parseInt((await searchParams).page) + 6}>
            Load more
          </Link>
        </button>
      )}
    </>
  );
};

export default page;
