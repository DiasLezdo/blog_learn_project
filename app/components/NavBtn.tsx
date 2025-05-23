"use client";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeButton from "./ThemeButton";

interface LinkItem {
  id: number;
  link: string;
}

const NavBtn = () => {
  const [nav, setNav] = useState<boolean>(false);

  const currentPath = usePathname();

  const links: LinkItem[] = [
    { id: 2, link: "home" },
    { id: 4, link: "post" },
    { id: 3, link: "profile" },
  ];

  return (
    <>
      <ul className="hidden md:flex items-center">
        {links.map(({ id, link }) => (
          <li
            key={id}
            className={`nav-links px-4 cursor-pointer font-medium hover:scale-105 hover:text-black dark:hover:text-white duration-200 link-underline
                  ${
                    currentPath == `/${link}`
                      ? "text-black dark:text-white"
                      : "text-gray-500"
                  }`}
          >
            <Link className="capitalize" href={"/" + link}>
              {link}
            </Link>
          </li>
        ))}
        <li>
          <ThemeButton />
        </li>
      </ul>
      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-white dark:bg-gradient-to-b from-black to-gray-800 text-gray-500">
          {links.map(({ id, link }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-6 text-4xl"
            >
              <Link onClick={() => setNav(!nav)} href={link}>
                {link}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default NavBtn;
