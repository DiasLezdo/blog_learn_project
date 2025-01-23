import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  id: string;
  title?: string;
  content?: string;
  img?: string;
}

const PostCard = ({
  id,
  title = "Noteworthy technology acquisitions 2021",
  content = "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
  img = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg/800px-Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg",
}: Props) => {
  return (
    <div
      key={id}
      className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-2 m-2"
    >
      <Link href={`/home/${id}`}>
        <div className="relative w-full h-[240px] overflow-hidden mx-auto group">
          <Image
            src={img}
            width={640}
            height={360}
            alt={title}
            className="transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {content}
        </p>

        <Link
          href={"/home/" + id}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white dark:bg-cyan-500 bg-gray-800 hover:bg-gray-500 rounded-lg dark:hover:bg-cyan-800 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
