import dbConnect from "@/libs/dbConn";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return;
}

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();

    const { id } = await req.json();

    await User.findByIdAndDelete(id);

    return NextResponse.json({ message: "Deleted" }, { status: 200 });
  } catch (error) {
    console.error("Authentication error:", error);
    new Response(
      JSON.stringify({ errorCatch: error, message: "Internal Server Error." }),
      {
        status: 500,
      }
    );
    return NextResponse.redirect(new URL("/error/server", req.url));
  }

  return;
}
