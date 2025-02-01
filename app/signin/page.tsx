import Link from "next/link";
import React from "react";
import SignInCom from "../components/SignInCom";

const page = () => {
  return (
    <div className="p-5 border rounded text-gray-500 max-w-lg mx-auto flex flex-col gap-3 mt-10">
      <SignInCom />
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Signup here
        </Link>
      </p>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Don&apos;t remember your{" "}
        <Link
          href="/password/email"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          password?
        </Link>
      </p>
    </div>
  );
};

export default page;
