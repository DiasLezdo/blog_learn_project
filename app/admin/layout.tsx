import { decrypt } from "@/libs/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const cookie = (await cookies()).get("session");

  if (!cookie) {
    return redirect("/signin");
  }

  const decrp = await decrypt(cookie?.value);

  if (decrp?.role !== 1) {
    return redirect("/error/other");
  }

  return <>{children}</>;
};

export default layout;
