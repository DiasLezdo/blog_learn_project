"use client";
import React, { ChangeEvent, MouseEvent, useState } from "react";
import JoditEdit from "../components/JoditEdit";
import { PiSpinnerGapThin } from "react-icons/pi";
import { useRouter } from "next/navigation";

const AddPost = () => {
  const [data, setData] = useState("");
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState<File | undefined>(undefined);
  const [description, setDescription] = useState("");
  const [visible, setVisible] = useState("public");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  console.log("data", thumbnail);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; // Check if files is not null and get the first file
    if (file) {
      setThumbnail(file); // Set the file as photo
    }
  }

  const submitHandler = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (data.length < 10) {
      return setError("Enter Valid content.");
    }
    if (title.length < 3) {
      return setError("Enter valid title");
    }
    if (description.length < 6) {
      return setError("Enter valid title");
    }
    if (!thumbnail) {
      return setError("Upload Thumbnail");
    }

    const formData = new FormData();
    formData.append("content", data);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("visible", visible);
    formData.append("thumbnail", thumbnail);

    setLoading(true);
    setError("");
    const res = await fetch("/api/post", {
      method: "POST",
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
      // body: JSON.stringify({
      //   content: data,
      //   title,
      //   description,
      //   visible,
      // }),
      body: formData,
    });

    const result = await res.json();

    setLoading(false);

    if (res.status == 200) {
      setTitle("");
      setDescription("");
      setData("");
      setThumbnail(undefined);
      return router.push("/home");
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="dark:text-cyan-500 mt-5">
      <form className="max-w-3xl mx-auto flex flex-col gap-3">
        <div>
          <label
            htmlFor="Title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            id="Title"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your message
          </label>
          <textarea
            id="description"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Add yours ..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Upload file
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            hidden
            accept="image/png, image/jpeg"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="inline-flex items-center mb-5 cursor-pointer">
            <input
              type="checkbox"
              value={visible}
              onChange={(e) =>
                setVisible(e.target.checked ? "private" : "public")
              }
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Private
            </span>
          </label>
        </div>
        {error && <p className="text-red-600">{error}</p>}
        <label
          htmlFor="Content"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Content
        </label>
        <div>
          <JoditEdit setData={setData} data={data} />
        </div>
        <button
          type="button"
          onClick={submitHandler}
          className="block text-white bg-gray-800 hover:bg-gray-900 text-center focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-cyan-500 dark:hover:bg-cyan-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          {loading ? (
            <PiSpinnerGapThin className="inline text-center" />
          ) : (
            "Post"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddPost;
