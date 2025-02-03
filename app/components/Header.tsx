import React from "react";
import { FaBlog } from "react-icons/fa6";
import NavBtn from "./NavBtn";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <div className="flex justify-between items-center w-full h-20 px-4 bg-opacity-80 lg:border-b lg:border-slate-900/10 dark:border-slate-600 transform backdrop-blur-lg backdrop-saturate-[180%] fixed top-0 z-10">
      <div>
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
      </div>
      <NavBtn />
    </div>
  );
};

export default Header;
