"use client";
import { useRouter } from "next/navigation";
import React, { MouseEvent, useEffect, useState } from "react";
import { PiSpinnerGapThin } from "react-icons/pi";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbAlertSquareRounded } from "react-icons/tb";

interface Props {
  id: string;
}

const UserDelet = ({ id }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  // Function to open the modal
  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

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

  const submitHandler = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log("first", id);

    try {
      setError("");
      setLoading(true);

      const res = await fetch("/api/admin/user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });

      const result = await res.json();

      setLoading(false);

      if (res.status == 200) {
        closeModal();
        return router.refresh();
      } else {
        setError(result.error);
      }
    } catch (error) {
      closeModal();
      console.log("error", error);
      return router.push("/signin");
    }
  };

  return (
    <>
      <RiDeleteBinLine className="cursor-pointer" onClick={openModal} />

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
                Delete Profile
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
            <div className="p-4 space-y-4 flex items-center justify-center h-80 overflow-y-auto">
              <TbAlertSquareRounded size={200} />
              {error && <p className="text-red-500">{error}</p>}
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
                  "Delete"
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

export default UserDelet;
