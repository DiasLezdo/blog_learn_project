import React from "react";
import ProfileLinks from "./ProfileLinks";
import UserDelet from "./UserDelet";
import Image from "next/image";

export interface ProfileVal {
  _id: string;
  avatar?: string;
  lastName: string;
  firstName: string;
  bio: string;
  profession: string;
  linkedin: string;
  twitter: string;
  facebook: string;
  email: string;
}

const AdminUsers = ({
  firstName,
  lastName,
  avatar,
  twitter,
  facebook,
  linkedin,
  bio,
  profession,
  _id,
  email,
}: ProfileVal) => {
  return (
    <div className="p-5 border rounded text-center text-gray-500 max-w-lg mx-auto flex flex-col gap-3">
      <div className="text-end">
        <UserDelet id={_id.toString()} />
      </div>
      <Image
        className="rounded-full mx-auto w-32 h-32"
        src={avatar ? avatar : "/profile/nopro.webp"}
        alt={firstName}
        width={128} // width of the image (adjusted for 32px in the original)
        height={128} // height of the image (adjusted for 32px in the original)
        // layout="intrinsic"
        style={{
          objectFit: "cover",
        }}
      />
      <div className="text-sm mt-5">
        <span className="font-medium leading-none text-gray-900 dark:text-white hover:text-indigo-600 transition duration-500 ease-in-out">
          {firstName} {lastName}
        </span>
        <p>{profession}</p>
        <p>{email}</p>
      </div>

      <p className="mt-2 text-sm text-gray-900 dark:text-white">{bio}</p>
      <ProfileLinks facebook={facebook} twitter={twitter} linkedin={linkedin} />
    </div>
  );
};

export default AdminUsers;
