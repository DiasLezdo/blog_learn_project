import Link from "next/link";
import React from "react";

interface Props {
  isAdmin: boolean;
}

const AdminHeader = async ({ isAdmin }: Props) => {
  return (
    <div className="flex flex-row items-center gap-3">
      {isAdmin && <Link href={"/admin/posts"}>Ad Posts</Link>}
      {isAdmin && <Link href={"/admin/users"}>Ad Users</Link>}
    </div>
  );
};

export default AdminHeader;
