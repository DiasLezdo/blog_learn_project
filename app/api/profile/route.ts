import dbConnect from "@/libs/dbConn";
import { decrypt } from "@/libs/session";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();

    const { firstName, lastName, profession, socialLinks, bio } =
      await req.json();

    //   we can get session value easily using cookie but we checked with header from middleware

    // const gg = await req.cookies.get("session");
    // console.log("gg", gg);

    const auth_middle = req.headers.get("x-auth-user-middleware"); // Check if session exists

    if (!auth_middle) {
      return NextResponse.json(
        {
          error: "User Not Auth",
        },
        { status: 400 }
      );
    }

    const sessionValue = await decrypt(auth_middle);

    const user = await User.findById(sessionValue?._id);

    if (!user) {
      return NextResponse.json(
        {
          error: "User Not there",
        },
        { status: 400 }
      );
    }

    // user sometimes upadte only one or 2,3 or non so that
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.bio = bio || user.bio;
    user.profession = profession || user.profession;
    user.socialLinks = socialLinks || user.socialLinks;

    await user.save();

    return NextResponse.json(
      {
        message: "User Login Successfully",
      },
      { status: 200 }
    );
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
}
