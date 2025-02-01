import React from "react";
import SignUpComp from "../components/SignUpComp";

const page = () => {
  return (
    // <div className="p-5 border rounded text-gray-500 max-w-lg mx-auto flex flex-col gap-3 mt-10">
    //   <form
    //     className="max-w-lg flex flex-col gap-3"
    //     action={"api/user"}
    //     method="POST"
    //   >
    //     <div className="col-span-2 sm:col-span-1">
    //       <label
    //         htmlFor="firstName"
    //         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //       >
    //         First Name
    //       </label>
    //       <input
    //         type="text"
    //         name="firstName"
    //         id="firstName"
    //         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
    //         placeholder="..."
    //         required
    //       />
    //     </div>
    //     <div className="col-span-2 sm:col-span-1">
    //       <label
    //         htmlFor="lastName"
    //         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //       >
    //         Last Name
    //       </label>
    //       <input
    //         type="text"
    //         name="lastName"
    //         id="lastName"
    //         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
    //         placeholder="..."
    //         required
    //       />
    //     </div>
    //     <div>
    //       <label
    //         htmlFor="small-input"
    //         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //       >
    //         Email
    //       </label>
    //       <input
    //         type="email"
    //         name="email"
    //         id="small-input"
    //         className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //       />
    //     </div>
    //     <div>
    //       <label
    //         htmlFor="small-input"
    //         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //       >
    //         Password
    //       </label>
    //       <input
    //         type="password"
    //         name="password"
    //         id="small-input"
    //         className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //       />
    //     </div>
    //     <button
    //       type="submit"
    //       className="block text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mt-2 dark:bg-cyan-500 dark:hover:bg-cyan-700 dark:focus:ring-gray-700 dark:border-gray-700"
    //     >
    //       Sign up
    //     </button>
    //   </form>
    //   <p className="text-sm font-light text-gray-500 dark:text-gray-400">
    //     Already have an account?{" "}
    //     <Link
    //       href="/signin"
    //       className="font-medium text-primary-600 hover:underline dark:text-primary-500"
    //     >
    //       Login here
    //     </Link>
    //   </p>
    // </div>
    <>
      <SignUpComp />
    </>
  );
};

export default page;
