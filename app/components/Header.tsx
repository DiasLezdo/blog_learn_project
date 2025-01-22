import React from "react";
import { FaBlog } from "react-icons/fa6";
import NavBtn from "./NavBtn";

const Header: React.FC = () => {
  return (
    <div className="flex justify-between items-center w-full h-20 px-4 bg-opacity-80 lg:border-b lg:border-slate-900/10 dark:border-slate-600 transform backdrop-blur-lg backdrop-saturate-[180%] fixed top-0 z-10">
      <div>
        <h1 className="text-5xl dark:text-cyan-500 font-signature ml-2">
          <a
            className="link-underline link-underline-black"
            href=""
            target="_blank"
            rel="noreferrer"
          >
            {/* Logo */}
            <FaBlog />
          </a>
        </h1>
      </div>
      <NavBtn />
    </div>
  );
};

export default Header;
