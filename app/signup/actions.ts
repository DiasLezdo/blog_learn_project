"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function navToOtp(user: string, type?: string) {
  const cookieStore = await cookies();

  cookieStore.set({
    name: "OtpValidUser",
    value: user,
    httpOnly: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(Date.now() + 3 * 60 * 1000), //3min
  });

  if (type) {
    cookieStore.set({
      name: "typeOfOtp",
      value: type,
      httpOnly: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(Date.now() + 5 * 60 * 1000), //3min
    });
  }

  return redirect("/otp");
}

export async function navToPassword(user: string) {
  const cookieStore = await cookies();

  cookieStore.set({
    name: "changePasswordUser",
    value: user,
    httpOnly: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(Date.now() + 5 * 60 * 1000), //3min
  });

  return redirect("/password/confirmation");
}

export async function clearPasswordCookie() {
  const cookieStore = await cookies();

  await cookieStore.delete("changePasswordUser");
  return;
}

export async function clearOtpCookie() {
  const cookieStore = await cookies();

  await cookieStore.delete("typeOfOtp");
  await cookieStore.delete("OtpValidUser");
  return;
}
