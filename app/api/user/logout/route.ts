import { deleteSession } from "@/libs/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await deleteSession();
    return new Response(JSON.stringify({ message: "User Logout success." }), {
      status: 200,
    });
  } catch (error) {
    console.error("Authentication error:", error);
    new Response(JSON.stringify({ message: "Internal Server Error." }), {
      status: 500,
    });
    return NextResponse.redirect(new URL("/error/server", req.url));
  }
}
