"use client";
import React, { useState, useEffect, MouseEvent } from "react";
import { FaEdit } from "react-icons/fa";
import { ProfileVal } from "./Profile";
import { PiSpinnerGapThin } from "react-icons/pi";
import { useRouter } from "next/navigation";

const ProfileEditBtn = ({
  firstName,
  lastName,
  twitter,
  facebook,
  linkedin,
  bio,
  profession,
}: ProfileVal) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  // Function to open the modal
  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  const [data, setData] = useState({
    firstName: firstName ?? "",
    lastName: lastName ?? "",
    profession: profession ?? "",
    socialLinks: {
      facebook: facebook ?? "",
      twitter: twitter ?? "",
      linkedin: linkedin ?? "",
    },
    bio: bio ?? "",
  });

  const submitHandler = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (data.firstName.length < 3 || data.lastName.length < 3) {
      return setError("Name Mandatory and Char should atleast 3");
    }
    setLoading(true);
    setError("");
    const res = await fetch("api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    setLoading(false);
    console.log("res", res);

    if (res.status == 200) {
      closeModal();
      return router.refresh();
    } else {
      setError(result.error);
    }
  };

  // Optional: Close modal on pressing the Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape);
    } else {
      document.removeEventListener("keydown", handleEscape);
    }
    // Cleanup
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isModalOpen]);

  return (
    <>
      {/* Icon to open the modal */}
      <FaEdit
        className="inline-block cursor-pointer"
        onClick={openModal}
        aria-label="Edit Profile"
      />

      {/* Modal Overlay */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal} // Close modal when clicking outside the content
        >
          {/* Modal Content */}
          <div
            className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full max-w-2xl mx-4"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 px-8 border-b dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Edit Profile
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={closeModal}
                aria-label="Close modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 space-y-4 text-start h-80 overflow-y-auto">
              <form className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="firstName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="..."
                      required
                      value={data.firstName}
                      onChange={(e) =>
                        setData((prev) => {
                          return {
                            ...prev,
                            firstName: e.target.value,
                          };
                        })
                      }
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="lastName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName  `"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="..."
                      required
                      value={data.lastName}
                      onChange={(e) =>
                        setData((prev) => {
                          return {
                            ...prev,
                            lastName: e.target.value,
                          };
                        })
                      }
                    />
                  </div>
                  {error && (
                    <p className="col-span-2 text-red-700 block">{error}</p>
                  )}
                  <div className="col-span-2">
                    <label
                      htmlFor="Profession"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Profession
                    </label>
                    <input
                      type="text"
                      name="Profession"
                      id="Profession"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="..."
                      required
                      value={data.profession}
                      onChange={(e) =>
                        setData((prev) => {
                          return {
                            ...prev,
                            profession: e.target.value,
                          };
                        })
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="bio"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      rows={4}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="About You..."
                      value={data.bio}
                      onChange={(e) =>
                        setData((prev) => {
                          return {
                            ...prev,
                            bio: e.target.value,
                          };
                        })
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="twitter"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Twitter
                    </label>
                    <input
                      type="text"
                      name="twitter"
                      id="twitter"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="past your URL"
                      required
                      value={data.socialLinks.twitter}
                      onChange={(e) =>
                        setData((prev) => {
                          return {
                            ...prev,
                            socialLinks: {
                              ...prev.socialLinks,
                              twitter: e.target.value,
                            },
                          };
                        })
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="facebook"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      FaceBook
                    </label>
                    <input
                      type="text"
                      name="facebook"
                      id="facebook"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="past your URL"
                      required
                      value={data.socialLinks.facebook}
                      onChange={(e) =>
                        setData((prev) => {
                          return {
                            ...prev,
                            socialLinks: {
                              ...prev.socialLinks,
                              facebook: e.target.value,
                            },
                          };
                        })
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="linkedin"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      LinkedIn
                    </label>
                    <input
                      type="text"
                      name="linkedin"
                      id="linkedin"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="past your URL"
                      required
                      value={data.socialLinks.linkedin}
                      onChange={(e) =>
                        setData((prev) => {
                          return {
                            ...prev,
                            socialLinks: {
                              ...prev.socialLinks,
                              linkedin: e.target.value,
                            },
                          };
                        })
                      }
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center p-4 px-8 border-t dark:border-gray-600">
              <button
                onClick={submitHandler}
                className="text-white bg-gray-800 hover:bg-gray-600 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-500 dark:hover:bg-cyan-700"
              >
                {loading ? (
                  <PiSpinnerGapThin className="inline text-center" />
                ) : (
                  "Change"
                )}
              </button>
              <button
                onClick={closeModal}
                className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileEditBtn;
