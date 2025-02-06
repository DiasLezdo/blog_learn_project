import ProfileLinks from "@/app/components/ProfileLinks";
import Image from "next/image";
import React from "react";

interface Props {
  firstName: string;
  avatar: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  profession: string;
  title: string;
  updatedAt: Date;
}

const PostProfile = ({
  firstName,
  avatar,
  facebook,
  twitter,
  linkedin,
  profession,
  updatedAt,
  title,
}: Props) => {
  function getDate(val: Date) {
    const date = new Date(val);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short", // 'short' gives the abbreviated month
      day: "2-digit", // 2-digit day
      year: "numeric", // full year
    });
    return formattedDate;
  }

  return (
    <header className="mb-4 lg:mb-6 not-format">
      <address className="flex items-center mb-6 not-italic">
        <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
          <Image
            className="mr-4 w-16 h-16 rounded-full"
            src={avatar ? avatar : "/profile/nopro.webp"}
            alt={firstName}
            width={72}
            height={72}
          />
          <div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {firstName}
            </span>
            <p className="text-base text-gray-500 dark:text-gray-400">
              {profession}
            </p>
            <p className="text-base text-gray-500 dark:text-gray-400">
              {getDate(updatedAt)}{" "}
            </p>
          </div>
        </div>
        <ProfileLinks
          facebook={facebook}
          twitter={twitter}
          linkedin={linkedin}
        />
      </address>
      <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
        {title}
      </h1>
    </header>
  );
};

export default PostProfile;
