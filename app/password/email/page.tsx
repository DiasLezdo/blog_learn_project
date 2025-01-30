import ForgotEmail from "@/app/components/ForgotEmail";
import React from "react";

const page = () => {
  return (
    <div className="p-5 border rounded text-center dark:border-slate-600 dark:text-cyan-500 max-w-lg mx-auto mt-5 flex flex-col gap-3">
      <h1>Enter Your Email</h1>
      <ForgotEmail />
    </div>
  );
};

export default page;
