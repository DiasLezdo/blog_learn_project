import React from "react";
import Profile from "../components/Profile";
import { headers } from "next/headers";
import { decrypt } from "@/libs/session";
import { redirect } from "next/navigation";
import User from "@/models/user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Belogoo Profile",
  description: "Profile by Belogoo",
  icons: {
    icon: [
      {
        url: "/favicon/profile.ico",
      },
    ],
  },
};

const page = async () => {
  const head = await headers();

  const cookieValue = await head.get("cookie")?.slice(8);

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

    // console.log("user", user);

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
    return redirect("/signin");
  }
};

export default page;
