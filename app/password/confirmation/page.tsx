import ConfirmPass from "@/app/components/ConfirmPass";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const cookieStore = await cookies();

  const value = cookieStore.get("changePasswordUser");

  console.log("cookieStore", value?.value);

  if (!value?.value) {
    return redirect("/signin");
  }

  return (
    <div className="p-5 border rounded text-center dark:border-slate-600 dark:text-cyan-500 max-w-lg mx-auto mt-5 flex flex-col gap-3">
      <h1>Change Your Password</h1>
      <ConfirmPass value={value?.value} />
    </div>
  );
};

export default page;
