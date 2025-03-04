// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import User, { IUser } from "../../../../models/user"; // Adjust the path as needed
import { createSession, generateRandomString } from "@/libs/session";
import OtpToken, { IOtpToken } from "@/models/otptoken";
import { HydratedDocument } from "mongoose";
import { sendMail } from "@/libs/mailTrigger";
import dbConnect from "@/libs/dbConn";

export async function POST(req: NextRequest) {
  try {

    await dbConnect();

    const { email, password } = await req.json();

    // Input validation
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      );
    }

    // Find the user by email
    const user = (await User.findOne({ email })) as IUser | null;

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return NextResponse.json({ error: "Invalid password." }, { status: 401 });
    }

    if (user && !user.verify) {
      const randomString = await generateRandomString(10);

      try {
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
            status: 201,
          }
        );
      } catch (error) {
        return new Response(
          JSON.stringify({
            errorCatch: error,
            error: "OTP Not Sent contact our team.",
          }),
          {
            status: 400,
          }
        );
      }
    }

    const sessionData = {
      _id: user._id,
      email: user.email,
      role: user.role,
    };

    const encryptedSessionData = await createSession(sessionData);

    const newHeaders = new Headers(req.headers);
    // Add a new header
    newHeaders.set("Set-Cookie", encryptedSessionData);
    // And produce a response with the new headers
    await NextResponse.next({
      request: {
        // New request headers
        headers: newHeaders,
      },
    });

    return NextResponse.json(
      {
        message: "User Login Successfully",
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          socialLinks: user.socialLinks,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Authentication error:", error);
    new Response(JSON.stringify({ message: "Internal Server Error." }), {
      status: 500,
    });
    return NextResponse.redirect(new URL("/error/server", req.url));
  }
}
