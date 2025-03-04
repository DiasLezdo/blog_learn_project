import dbConnect from "@/libs/dbConn";
import { sendMail } from "@/libs/mailTrigger";
import { generateRandomString } from "@/libs/session";
import OtpToken, { IOtpToken } from "@/models/otptoken";
import User, { IUser } from "@/models/user";
import { HydratedDocument } from "mongoose";
import { NextResponse } from "next/server";

interface UserRequestBody {
  email: string;
  password: string;
  lastName: string;
  firstName: string;
}

export async function POST(req: Request) {
  try {

    await dbConnect();
    const { email, password, lastName, firstName }: UserRequestBody =
      await req.json();

    // Input validation
    if (!email || !password || !lastName || !firstName) {
      return new Response(
        JSON.stringify({ error: "Fill all field and cannot be empty." }),
        { status: 400 }
      );
    }

    // Find the user by email
    const user = (await User.findOne({ email })) as IUser | null;
    // check verify condition
    if (user) {
      if (!user.verify) {
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
              error:
                "User ALready Exist .But Not verified Kindly check mail and verify!!",
              user: user.email,
            }),
            {
              headers: {
                otpUser: user.email,
              },
              status: 201,
            }
          );

          // const response = NextResponse.redirect(new URL("/otp", req.url));

          // return response;
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

      return new Response(JSON.stringify({ error: "User ALready Exist." }), {
        status: 400,
      });
    }

    const userNew: HydratedDocument<IUser> = new User({
      email,
      password,
      firstName,
      lastName,
    });

    try {
      const results = await userNew.save();

      const randomString = await generateRandomString(10);

      try {
        const newOtp: HydratedDocument<IOtpToken> = await new OtpToken({
          userId: results._id,
          token: randomString,
          createdAt: Date.now(),
          expiresAt: Date.now() + 1 * (60 * 1000),
        }).save();

        const message = `
       <h2>Hello ${results?.firstName}</h2>
       <p>Here is your OTP</p>  
       <p>This OTP is valid for only a minute.</p>
      <h1 style="color:#29AB87;">${newOtp.token}</h1>
       <p>Regards...</p>
       <p>Belogoo Team</p>
     `;

        const confirm = await sendMail({
          email: "diazlezdo@gmail.com",
          sendTo: results.email,
          subject: "Verify OTP",
          text: `hello ${results.firstName}`,
          html: message,
        });

        console.log("confirm", confirm);
      } catch (error) {
        return new Response(
          JSON.stringify({
            errorCatch: error,
            error: "OTP Not Sent contect my team.",
          }),
          {
            status: 400,
          }
        );
      }

      return new Response(
        JSON.stringify({
          message: "User Added check your mail and verify.",
          user: {
            firstName: results.firstName,
            lastName: results.lastName,
            email: results.email,
            socialLinks: results.socialLinks,
          },
        }),
        {
          status: 200,
        }
      );
    } catch (err) {
      if (err instanceof Error) {
        return new Response(
          JSON.stringify({
            error: err.message.replace("User validation failed:", "").trim(),
            message: "User Not Saved",
          }),
          {
            status: 400,
          }
        );
      } else {
        return new Response(
          JSON.stringify({
            error: "An unknown error occurred",
            message: "User Not Saved",
          }),
          {
            status: 400,
          }
        );
      }
    }

    // await User.create({ size: "small" });
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
