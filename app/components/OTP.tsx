"use client";
import React, { MouseEvent, useState } from "react";

const OTP = () => {
  const [error, setError] = useState<string | boolean>("");

  const submitHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("Invaild Otp");
  };
  return (
    <div>
      <div className="mb-6">
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="ex:jbdsc#235%)925552"
          required
        />
        {error && <h6 className="text-sm text-red-600">{error}</h6>}
      </div>
      <button
        type="button"
        className="block text-white bg-gray-800 hover:bg-gray-900 text-center focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-cyan-500 dark:hover:bg-cyan-700 dark:focus:ring-gray-700 dark:border-gray-700"
        onClick={submitHandler}
      >
        Enter
      </button>
    </div>
  );
};

export default OTP;
