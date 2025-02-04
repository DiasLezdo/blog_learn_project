import { decrypt } from "@/libs/session";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  //   secure_distribution: "mydomain.com",  // add after host
  //   upload_prefix: "myprefix.com",
});

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

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

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const uploadResult = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "next-beloogo",
          },
          (error, result) => {
            if (error || !result) {
              reject(error || new Error("Upload failed"));
              return;
            }
            resolve(result);
          }
        );

        uploadStream.end(buffer);
      }
    );

    // Update user avatar
    if (uploadResult.secure_url) {
      user.avatar = uploadResult.secure_url;
      await user.save();
    }

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
