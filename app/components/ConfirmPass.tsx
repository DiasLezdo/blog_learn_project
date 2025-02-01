"use client";
import { useRouter } from "next/navigation";
import React, { MouseEvent, useState } from "react";
import { PiSpinnerGapThin } from "react-icons/pi";
import { clearPasswordCookie } from "../signup/actions";

interface Props {
  value: string | undefined;
}

const ConfirmPass = ({ value }: Props) => {
  const [error, setError] = useState<string | boolean>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [pass, setPass] = useState<{
    password: string;
    confirmPassword: string;
  }>({
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  const submitHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (pass.password.length < 6) {
      return setError("Password should more than 6 char");
    }

    if (pass.confirmPassword.length < 6) {
      return setError("Password should more than 7 char");
    }

    if (pass.confirmPassword !== pass.password) {
      return setError("Password missmatch");
    }

    setLoading(true);
    setError("");

    const res = await fetch("/api/user/forget/confirm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Password-user-header": value ? value : "",
      },
      body: JSON.stringify({ password: pass.confirmPassword }),
    });

    const result = await res.json();

    setLoading(false);

    if (res.status == 200) {
      clearPasswordCookie()
      return router.push("/signin");
    } else if (res.status == 404) {
      clearPasswordCookie()
      return router.push("/signup");
    } else {
      setError(result.error);
    }
  };
  return (
    <div>
      <form>
        <div>
          <label
            htmlFor="small-input"
            className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            New Password
          </label>
          <input
            type="password"
            id="small-input"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={pass.password}
            onChange={(e) =>
              setPass((prev) => {
                return {
                  ...prev,
                  password: e.target.value,
                };
              })
            }
          />
        </div>
        <div className="mt-2">
          <label
            htmlFor="small-input"
            className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="small-input"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={pass.confirmPassword}
            onChange={(e) =>
              setPass((prev) => {
                return {
                  ...prev,
                  confirmPassword: e.target.value,
                };
              })
            }
          />
          {error && <h6 className="text-sm text-red-600">{error}</h6>}
        </div>
        <button
          type="submit"
          className="block mt-2 text-white bg-gray-800 hover:bg-gray-900 text-center focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-cyan-500 dark:hover:bg-cyan-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={submitHandler}
        >
          {loading ? (
            <PiSpinnerGapThin className="inline text-center" />
          ) : (
            "Enter"
          )}
        </button>
      </form>
    </div>
  );
};

export default ConfirmPass;
