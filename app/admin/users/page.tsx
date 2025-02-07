import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decrypt } from "@/libs/session";
import AdminUsers from "@/app/components/AdminUsers";
import User from "@/models/user";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const gg = (await cookies()).get("session");

  if (!gg) {
    return redirect("/signin");
  }

  const decrp = await decrypt(gg?.value);

  if (decrp?.role !== 1) {
    return redirect("/error/other");
  }
  const users = await User.find()
    .sort("createdAt")
    .limit(parseInt((await searchParams).page) ?? 9);

  return (
    <>
      <div className="dark:text-cyan-500 mt-2 flex flex-row flex-wrap justify-evenly">
        {users.map((e, i) => {
          return (
            <AdminUsers
              key={i}
              _id={e._id}
              firstName={e.firstName}
              lastName={e.lastName}
              avatar={e.avatar}
              twitter={e.twitter}
              facebook={e.facebook}
              linkedin={e.linkedin}
              bio={e.bio}
              profession={e.profession}
              email={e.email}
            />
          );
        })}
      </div>
      {users.length > 9 && (
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
