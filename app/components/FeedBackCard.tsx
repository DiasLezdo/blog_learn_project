import React from "react";

interface Props {
  email: string;
  subject: string;
  message: string;
  date: Date;
}

const FeedBackCard = ({ email, subject, message, date }: Props) => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div id="defaultTabContent">
        <div className=" p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800">
          <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white break-words">
            {subject}
          </h2>
          <p className="mb-3 text-gray-500 dark:text-gray-400">{message}</p>
          <span className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700">
            {email} -{" "}
            {date.toLocaleDateString("en-us", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeedBackCard;
