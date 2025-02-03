"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { GrLogout } from "react-icons/gr";

const Logout = () => {
  // State to manage tooltip visibility
  const [showTooltip, setShowTooltip] = useState(false);

  const router = useRouter();

  const logout = async () => {
    await fetch("/api/user/logout")
      .then((r) => {
        if (r.ok) {
          router.refresh();
        }
      })
      .catch((err) => console.log("err", err));
  };

  return (
    <div className="relative inline-block ml-2">
      <GrLogout
        className="inline-block cursor-pointer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={logout}
      />

      {showTooltip && (
        <div
          id="tooltip-default"
          role="tooltip"
          className="absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-100"
        >
          Logout
          <div className="tooltip-arrow absolute"></div>
        </div>
      )}
    </div>
  );
};

export default Logout;
