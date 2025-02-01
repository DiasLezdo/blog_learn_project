"use client";
import { useRouter } from "next/navigation";
import React, { MouseEvent, useState } from "react";
import { PiSpinnerGapThin } from "react-icons/pi";
import { clearOtpCookie, navToPassword } from "../signup/actions";

interface Props {
  useEmail: string | undefined;
  type: string | undefined;
}

const OTP = ({ useEmail, type }: Props) => {
  const [error, setError] = useState<string | boolean>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");

  const router = useRouter();

  const submitHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (otp.length < 9) {
      return setError("Enter Valid Otp");
    }
    setLoading(true);
    const res = await fetch("api/user/otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-OTP-user-header": useEmail ? useEmail : "",
      },
      body: JSON.stringify({ otp, type }),
    });

    const result = await res.json();

    setLoading(false);

    if (res.status == 200) {
      await clearOtpCookie();
      return router.push("/home");
    } else if (res.status == 404) {
      await clearOtpCookie();
      return router.push("/signin");
    } else if (res.status == 201) {
      await clearOtpCookie();
      return navToPassword(result.user.email);
    } else {
      setError(result.error);
    }
    console.log("res", res);

    console.log(result);
  };

  const resendOtp = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setLoading(true);

    const res = await fetch("api/user/otp", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-OTP-user-header": useEmail ? useEmail : "",
      },
    }).finally(() => {
      setLoading(false);
    });

    const result = await res.json();

    if (res.status == 200) {
      return;
    } else if (res.status == 404) {
      return router.push("/signin");
    } else {
      setError(result.error);
    }
    console.log("res", res);

    console.log(result);
  };

  return (
    <div>
      <div className="mb-6">
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="ex:jbdsc#235%)925552"
          required
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        {error && <h6 className="text-sm text-red-600">{error}</h6>}
      </div>
      <button
        type="button"
        className={`block text-white bg-gray-800 hover:bg-gray-900 text-center focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-cyan-500 dark:hover:bg-cyan-700 dark:focus:ring-gray-700 dark:border-gray-700 ${
          otp.length < 8 ? "cursor-not-allowed" : ""
        }`}
        onClick={submitHandler}
        disabled={otp.length < 8}
      >
        {loading ? (
          <PiSpinnerGapThin className="inline text-center" />
        ) : (
          "Enter"
        )}
      </button>
      <button
        type="button"
        className="block text-white bg-gray-800 hover:bg-gray-900 text-center focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-cyan-500 dark:hover:bg-cyan-700 dark:focus:ring-gray-700 dark:border-gray-700"
        onClick={resendOtp}
      >
        {loading ? (
          <PiSpinnerGapThin className="inline text-center" />
        ) : (
          "Re-send"
        )}
      </button>
    </div>
  );
};

export default OTP;
