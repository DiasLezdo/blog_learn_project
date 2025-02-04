import React from "react";
import ProfileLinks from "./ProfileLinks";
import ProfileEditBtn from "./ProfileEditBtn";
import Logout from "./Logout";
import ProfilePhoto from "./ProfilePhoto";

export interface ProfileVal {
  avatar?: string;
  lastName: string;
  firstName: string;
  bio: string;
  profession: string;
  linkedin: string;
  twitter: string;
  facebook: string;
}

const Profile = ({
  firstName,
  lastName,
  avatar,
  twitter,
  facebook,
  linkedin,
  bio,
  profession,
}: ProfileVal) => {
  return (
    <div className="p-5 border rounded text-center text-gray-500 max-w-lg mx-auto flex flex-col gap-3">
      <div className="text-end">
        <ProfileEditBtn
          firstName={firstName}
          lastName={lastName}
          twitter={twitter}
          linkedin={linkedin}
          facebook={facebook}
          bio={bio}
          profession={profession}
        />
        <Logout />
      </div>
      <ProfilePhoto avatar={avatar} firstName={firstName} />
      <div className="text-sm mt-5">
        <span className="font-medium leading-none text-gray-900 dark:text-white hover:text-indigo-600 transition duration-500 ease-in-out">
          {firstName} {lastName}
        </span>
        <p>{profession}</p>
      </div>

      <p className="mt-2 text-sm text-gray-900 dark:text-white">{bio}</p>
      <ProfileLinks facebook={facebook} twitter={twitter} linkedin={linkedin} />
    </div>
  );
};

export default Profile;
