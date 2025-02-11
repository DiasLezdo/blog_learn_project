import Link from "next/link";
import React from "react";

const AdminHeader = async () => {
  return (
    <div className="flex flex-row items-center gap-3 nav-links px-4 cursor-pointer font-medium hover:scale-105 hover:text-black dark:hover:text-white duration-200 link-underline">
      <Link href={"/admin/posts"}>Ad Posts</Link>
      <Link href={"/admin/users"}>Ad Users</Link>
      <Link href={"/admin/feedbacks"}>Ad feedBack</Link>
    </div>
  );
};

export default AdminHeader;
