import React from "react";
import OTP from "../components/OTP";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const cookieStore = await cookies();

  const value = cookieStore.get("OtpValidUser");
  const valueOfType = cookieStore.get("typeOfOtp");

  console.log("cookieStore", value?.value);

  if (!value?.value) {
    return redirect("/signin");
  }

  return (
    <div className="p-5 border rounded text-center dark:border-slate-600 dark:text-cyan-500 max-w-lg mx-auto mt-5 flex flex-col gap-3">
      <h1>Enter Your OTP</h1>
      <p>Check your email</p>
      <OTP useEmail={value?.value} type={valueOfType?.value} />
    </div>
  );
};

export default page;
