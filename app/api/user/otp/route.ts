import { sendMail } from "@/libs/mailTrigger";
import { createSession, generateRandomString } from "@/libs/session";
import OtpToken, { IOtpToken } from "@/models/otptoken";
import User, { IUser } from "@/models/user";
import { HydratedDocument } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {

    const { otp, type } = await req.json();

    // Input validation
    if (!otp) {
      return NextResponse.json({ error: "Enter OTP." }, { status: 400 });
    }

    const headers = req.headers;
    console.log(headers);
    // Access a specific header, like "User-Agent"
    const userAgent = headers.get("X-OTP-user-header");
    console.log("User-Agent:", userAgent);

    if (!userAgent) {
      return NextResponse.json({ error: "Not Authorized." }, { status: 404 });
    }

    const user = (await User.findOne({ email: userAgent })) as IUser | null;

    if (!user) {
      return NextResponse.json({ error: "Not Authorized." }, { status: 404 });
    }

    const token = (await OtpToken.findOne({
      userId: user?._id,
      token: otp,
    })) as IOtpToken | null;

    if (!token) {
      return NextResponse.json(
        { error: "Token not found or invalid OTP." },
        { status: 400 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      user?._id,
      { verify: true },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { error: "Account Couldn't verify." },
        { status: 404 }
      );
    }

    if (type == "password") {
      return NextResponse.json(
        {
          message: "User Password auth..",
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            socialLinks: user.socialLinks,
          },
        },
        { status: 201 }
      );
    } else {
      const sessionData = {
        _id: updatedUser._id,
        email: updatedUser.email,
        role: updatedUser.role,
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
    }
  } catch (err) {
    console.error("Authentication error:", err);
    new Response(
      JSON.stringify({ error: err, message: "Internal Server Error." }),
      {
        status: 500,
      }
    );
    return NextResponse.redirect(new URL("/error/server", req.url));
  }
}

export async function GET(req: NextRequest) {
  const headers = req.headers;


  console.log(headers);

  // Access a specific header, like "User-Agent"
  const userAgent = headers.get("X-OTP-user-header");
  console.log("User-Agent:", userAgent);

  if (!userAgent) {
    return NextResponse.json({ error: "Not Authorized." }, { status: 404 });
  }

  const user = (await User.findOne({ email: userAgent })) as IUser | null;

  if (!user) {
    return NextResponse.json({ error: "Not Authorized." }, { status: 404 });
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

      return NextResponse.json({ message: "Otp Sent" }, { status: 200 });
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
}
