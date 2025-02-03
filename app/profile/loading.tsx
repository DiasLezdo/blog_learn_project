import React from "react";

const loading = () => {
  return (
    <div className="p-5 border rounded mt-2 text-center text-gray-500 max-w-lg mx-auto flex flex-col gap-3">
      <div role="status" className="max-w-lg rounded-sm animate-pulse">
        <div className="flex items-center justify-center mb-4">
          <svg
            className="w-24 h-24 me-3 text-gray-200 dark:text-gray-700"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
        </div>
        <div className="flex justify-center">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        </div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        <div className="flex justify-center flex-row gap-4 mt-2">
          <div className="h-6 w-6 bg-gray-200 rounded-full dark:bg-gray-700  mb-4"></div>
          <div className="h-6 w-6 bg-gray-200 rounded-full dark:bg-gray-700  mb-4"></div>
          <div className="h-6 w-6 bg-gray-200 rounded-full dark:bg-gray-700  mb-4"></div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default loading;
