"use client";
import { useRouter } from "next/navigation";
import React, { MouseEvent, useState } from "react";
import { PiSpinnerGapThin } from "react-icons/pi";

interface Props {
  commentId: string;
  postId: string;
}

const CommentAction = ({ commentId, postId }: Props) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const deleteHandler = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/post/comment", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentId, postId }),
      });
      const result = await res.json();

      console.log("result", result);

      setLoading(false);

      if (res.status == 200) {
        return router.refresh();
      } else {
        console.error("Somthing Wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button
        id="dropdownComment1Button"
        onClick={deleteHandler} // Toggle dropdown visibility on button click
        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:text-gray-400 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        type="button"
      >
        {loading ? (
          <PiSpinnerGapThin className="inline text-center" />
        ) : (
          <svg
            className="text-gray-400 dark:text-gray-500 w-5 h-5 mx-auto"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        )}
      </button>
    </>
  );
};

export default CommentAction;
