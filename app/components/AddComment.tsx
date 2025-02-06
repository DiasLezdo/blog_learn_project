"use client";
import { useRouter } from "next/navigation";
import React, { MouseEvent, useState } from "react";
import { PiSpinnerGapThin } from "react-icons/pi";

interface Props {
  postId: string;
}

const AddComment = ({ postId }: Props) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const submitHandler = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (comment.length < 3) {
      return setError("Enter Comment");
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/post/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment, postId }),
      });

      const result = await res.json();

      setLoading(false);

      console.log("res", res);

      if (res.status == 200) {
        setComment("");
        return router.refresh();
      } else if (res.status == 400) {
        return router.push("/signin");
      } else {
        return setError(result.error);
      }
    } catch (error) {
      console.log("error", error);
      return router.push("/signin");
    }
  };

  return (
    <form className="mb-6">
      <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <label htmlFor="comment" className="sr-only">
          Your comment
        </label>
        <textarea
          id="comment"
          rows={6}
          className="px-0 w-full text-sm text-gray-900 border-0 outline-none focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
          placeholder="Write a comment..."
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        {error && <p className="text-red-600">{error}</p>}
      </div>
      <button
        type="button"
        onClick={submitHandler}
        className="block text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mt-2 dark:bg-cyan-500 dark:hover:bg-cyan-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        {loading ? <PiSpinnerGapThin className="inline text-center" /> : "post"}
      </button>
    </form>
  );
};

export default AddComment;
