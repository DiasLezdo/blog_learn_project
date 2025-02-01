import { sendMail } from "@/libs/mailTrigger";
import { generateRandomString } from "@/libs/session";
import OtpToken, { IOtpToken } from "@/models/otptoken";
import User, { IUser } from "@/models/user";
import { HydratedDocument } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // Input validation
    if (!email) {
      return NextResponse.json({ message: "Email required." }, { status: 400 });
    }

    // Find the user by email
    const user = (await User.findOne({ email })) as IUser | null;

    if (!user) {
      return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    }

    const randomString = await generateRandomString(10);

    const newOtp: HydratedDocument<IOtpToken> = await new OtpToken({
      userId: user._id,
      token: randomString,
      createdAt: Date.now(),
      expiresAt: Date.now() + 1 * (60 * 1000),
    }).save();

    const message = `
       <h2>Hello ${user?.firstName}</h2>
       <p>Here is your OTP</p>  
       <p>This OTP is valid for only a minute.</p>
       <h1 style="color:#29AB87;">${newOtp.token}</h1>
       <p>Regards...</p>
       <p>Belogoo Team</p>
     `;

    const confirm = await sendMail({
      email: "diazlezdo@gmail.com",
      sendTo: user.email,
      subject: "Verify OTP",
      text: `hello ${user.firstName}`,
      html: message,
    });

    console.log("confirm", confirm);

    return new Response(
      JSON.stringify({
        message:
          "User ALready Exist . But Not verified Kindly check mail and verify!!.",
        user: user.email,
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error("Authentication error:", err);
    new Response(JSON.stringify({ message: "Internal Server Error." }), {
      status: 500,
    });
    return NextResponse.redirect(new URL("/error/server", req.url));
  }
}
