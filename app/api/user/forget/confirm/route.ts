import User, { IUser } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {

    const { password } = await req.json();

    // Input validation
    if (!password) {
      return NextResponse.json({ error: "Enter OTP." }, { status: 400 });
    }

    const headers = req.headers;
    console.log(headers);
    // Access a specific header, like "User-Agent"
    const userAgent = headers.get("X-Password-user-header");
    console.log("User-Agent:", userAgent);

    if (!userAgent) {
      return NextResponse.json({ error: "Not Authorized." }, { status: 404 });
    }

    const user = (await User.findOne({ email: userAgent })) as IUser | null;

    if (!user) {
      return NextResponse.json({ error: "Not Authorized." }, { status: 404 });
    }

    // below code directly update the db not involve save hoook which for hasing password

    try {
      //   await User.findByIdAndUpdate(
      //     user._id,
      //     { password: password },
      //     { new: true }
      //   );

      // Update the password manually
      user.password = password;

      // Save the user (this will trigger the pre-save hook)
      await user.save();

      return NextResponse.json({ message: "updated Done." }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { errorCatch: error, error: "User Not Updated Try once more." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Authentication error:", error);
    new Response(
      JSON.stringify({ errorCatch: error, error: "Internal Server Error." }),
      {
        status: 500,
      }
    );
    return NextResponse.redirect(new URL("/error/server", req.url));
  }
}
