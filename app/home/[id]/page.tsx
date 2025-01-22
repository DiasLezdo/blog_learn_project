import React from "react";

interface Props {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: Props) => {
  const postId = (await params).id;

  console.log("para", postId);

  return <div>{postId}</div>;
};

export default page;
