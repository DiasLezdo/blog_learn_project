"use client";
import Link from "next/link";
import React, { MouseEvent, useState } from "react";
import { navToOtp } from "../signup/actions";
import { PiSpinnerGapThin } from "react-icons/pi";

const SignUpComp = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const submitHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (data.firstName.length < 3) {
      return setError("FirstName should be atleast 3 char");
    }

    if (data.lastName.length < 3) {
      return setError("LastName should be atleast 3 char");
    }

    if (data.email.length < 3) {
      return setError("EnterValid Email");
    }

    if (data.password.length < 6) {
      return setError("password should be atleast 7 char");
    }

    setError("");
    setLoading(true);

    const res = await fetch("api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    setLoading(false);

    if (res.status == 200) {
      return navToOtp(result.user.email);
    } else if (res.status == 201) {
      return navToOtp(result.user);
    } else {
      setError(result.error);
    }
    console.log("res", res);

    console.log(result);
  };

  return (
    <div className="p-5 border rounded text-gray-500 max-w-lg mx-auto flex flex-col gap-3 mt-10">
      <form className="max-w-lg flex flex-col gap-3">
        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="firstName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="..."
            required
            value={data.firstName}
            onChange={onChange}
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="lastName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="..."
            required
            value={data.lastName}
            onChange={onChange}
          />
        </div>
        <div>
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="small-input"
            value={data.email}
            onChange={onChange}
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="small-input"
            value={data.password}
            onChange={onChange}
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          onClick={submitHandler}
          className="block text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mt-2 dark:bg-cyan-500 dark:hover:bg-cyan-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          {loading ? (
            <PiSpinnerGapThin className="inline text-center" />
          ) : (
            "Sign up"
          )}
        </button>
      </form>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <Link
          href="/signin"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Login here
        </Link>
      </p>
      <p className="text-red-600">{error}</p>
    </div>
  );
};

export default SignUpComp;
