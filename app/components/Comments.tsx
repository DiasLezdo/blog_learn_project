import React from "react";
import CommentAction from "./CommentAction";
import Image from "next/image";
import { cookies } from "next/headers";
import { decrypt } from "@/libs/session";

interface User {
  _id: string;
  avatar: string;
  firstName: string;
  // avata: string;
}

interface IComment {
  _id: string;
  user: User;
  text: string;
  createdAt: Date;
}

interface Props {
  commentsData: IComment[];
  postId: string;
  userId: string;
}

const Comments = async ({ commentsData, postId, userId }: Props) => {
  const cookieData = await (await cookies()).get("session");

  const decrpt = await decrypt(cookieData?.value);

  return (
    <>
      {commentsData.map((comment: IComment) => (
        <article
          key={comment?._id}
          className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900"
        >
          <footer className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white">
                <Image
                  className="mr-2 w-6 h-6 rounded-full"
                  src={
                    comment?.user?.avatar
                      ? comment.user.avatar
                      : "/profile/nopro.webp"
                  }
                  alt={comment?.user?.firstName}
                  height={18}
                  width={18}
                />
                {comment?.user?.firstName}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
            {(decrpt?.role === 1 ||
              comment?.user?._id.toString() === decrpt?._id ||
              userId.toString() === decrpt?._id) && (
              <CommentAction
                commentId={comment?._id.toString()}
                postId={postId}
              />
            )}
          </footer>
          <p className="dark:text-gray-400">{comment?.text}</p>
        </article>
      ))}
    </>
  );
};

export default Comments;
