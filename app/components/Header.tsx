import React from "react";
import { FaBlog } from "react-icons/fa6";
import NavBtn from "./NavBtn";
import Link from "next/link";
import { cookies } from "next/headers";
import { decrypt } from "@/libs/session";
import AdminHeader from "./AdminHeader";

const Header: React.FC = async () => {
  const cookie = await (await cookies()).get("session");

  const value = await decrypt(cookie?.value);

  const isAdmin = value?.role == 1 ? true : false;

  return (
    <div className="flex justify-between items-center w-full h-20 px-4 bg-opacity-80 lg:border-b lg:border-slate-900/10 dark:border-slate-600 transform backdrop-blur-lg backdrop-saturate-[180%] fixed top-0 z-10">
      <div className="flex flex-row items-center gap-3">
        <h1 className="text-5xl dark:text-cyan-500 font-signature ml-2">
          <Link
            className="link-underline link-underline-black"
            href="/home"
            target="_blank"
            rel="noreferrer"
          >
            {/* Logo */}
            <FaBlog />
          </Link>
        </h1>
        {isAdmin && <AdminHeader />}
      </div>
      <NavBtn />
    </div>
  );
};

export default Header;
