import React from "react";
import Profile from "../components/Profile";
import { headers } from "next/headers";
import { decrypt } from "@/libs/session";
import { redirect } from "next/navigation";
import User from "@/models/user";
import dbConnect from "@/libs/dbConn";

const page = async () => {
  await dbConnect();

  const head = await headers();

  const cookieValue = await head.get("cookie")?.slice(8);

  console.log("cookieValue", cookieValue);

  if (!cookieValue) {
    return redirect("/signin");
  }

  const decryptValue = await decrypt(cookieValue);

  try {
    const user = await User.findById(decryptValue?._id, {
      firstName: 1,
      lastName: 1,
      socialLinks: 1,
      avatar: 1,
      bio: 1,
      profession: 1,
    });

    if (!user) {
      return redirect("/signin");
    }

    return (
      <div className="dark:text-cyan-500 mt-2">
        <Profile
          firstName={user.firstName}
          lastName={user.lastName}
          avatar={user.avatar}
          twitter={user.socialLinks.twitter}
          linkedin={user.socialLinks.linkedin}
          facebook={user.socialLinks.facebook}
          bio={user.bio}
          profession={user.profession}
        />
      </div>
    );
  } catch (error) {
    console.error("error", error);
    // return redirect("/error/server");
  }
};

export default page;
