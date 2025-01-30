import React from "react";
import OTP from "../components/OTP";

const page = () => {
  return (
    <div className="p-5 border rounded text-center dark:border-slate-600 dark:text-cyan-500 max-w-lg mx-auto mt-5 flex flex-col gap-3">
      <h1>Enter Your OTP</h1>
      <OTP />
    </div>
  );
};

export default page;
