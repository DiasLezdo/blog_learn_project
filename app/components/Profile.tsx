import React from "react";
import ProfileLinks from "./ProfileLinks";
import Image from "next/image";
import ProfileEditBtn from "./ProfileEditBtn";

const Profile = () => {
  return (
    <div className="p-5 border rounded text-center text-gray-500 max-w-lg mx-auto flex flex-col gap-3">
      <div className="text-end">
        <ProfileEditBtn />
      </div>
      <Image
        className="rounded-full mx-auto w-32 h-32"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg/800px-Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg"
        alt="Cristiano Ronaldo"
        width={128} // width of the image (adjusted for 32px in the original)
        height={128} // height of the image (adjusted for 32px in the original)
        // layout="intrinsic"
        style={{
          objectFit: "cover",
        }}
      />
      <div className="text-sm mt-5">
        <span className="font-medium leading-none text-gray-900 dark:text-white hover:text-indigo-600 transition duration-500 ease-in-out">
          Jane Doe
        </span>
        <p>Blogger &amp; Youtuber</p>
      </div>

      <p className="mt-2 text-sm text-gray-900 dark:text-white">
        Lorem ipsum dolor sit amet, consecte adipisicing elit. Voluptatibus quia
        Maiores et perferendis eaque.
      </p>
      <ProfileLinks />
    </div>
  );
};

export default Profile;
