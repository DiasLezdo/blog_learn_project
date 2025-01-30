"use client";
import React, { MouseEvent, useState } from "react";

const ConfirmPass = () => {
  const [error, setError] = useState<string | boolean>("");

  const submitHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("Invaild Otp");
  };
  return (
    <div>
      <form>
        <div>
          <label
            htmlFor="small-input"
            className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            New Password
          </label>
          <input
            type="password"
            id="small-input"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {error && <h6 className="text-sm text-red-600">{error}</h6>}
        </div>
        <div className="mt-2">
          <label
            htmlFor="small-input"
            className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="small-input"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {error && <h6 className="text-sm text-red-600">{error}</h6>}
        </div>
        <button
          type="submit"
          className="block mt-2 text-white bg-gray-800 hover:bg-gray-900 text-center focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-cyan-500 dark:hover:bg-cyan-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={submitHandler}
        >
          Enter
        </button>
      </form>
    </div>
  );
};

export default ConfirmPass;
