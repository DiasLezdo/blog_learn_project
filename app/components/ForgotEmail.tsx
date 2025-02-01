"use client";
import React, { MouseEvent, useState } from "react";
import { PiSpinnerGapThin } from "react-icons/pi";
import { navToOtp } from "../signup/actions";

const ForgotEmail = () => {
  const [error, setError] = useState<string | boolean>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const submitHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (email.length < 5) {
      return setError("Enter valid Email");
    }

    setLoading(true);
    setError("");
    const res = await fetch("/api/user/forget/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const result = await res.json();

    setLoading(false);

    if (res.status == 200) {
      return navToOtp(result.user, "password");
    } else {
      setError(result.error);
    }
  };
  return (
    <div>
      <form>
        <div className="mb-6">
          <input
            type="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="example@mail.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <h6 className="text-sm text-red-600">{error}</h6>}
        </div>
        <button
          type="submit"
          className="block text-white bg-gray-800 hover:bg-gray-900 text-center focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-cyan-500 dark:hover:bg-cyan-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={submitHandler}
        >
          {loading ? (
            <PiSpinnerGapThin className="inline text-center" />
          ) : (
            "Enter"
          )}
        </button>
      </form>
    </div>
  );
};

export default ForgotEmail;
