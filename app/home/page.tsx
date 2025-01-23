import React from "react";
import PostCard from "../components/PostCard";
import Footer from "../components/Footer";

const page = () => {
  return (
    <>
      <div className="dark:text-cyan-500 mt-2 flex flex-row flex-wrap justify-evenly">
        <PostCard id={"1"} />
        <PostCard
          id={"2"}
          img="https://img.olympics.com/images/image/private/t_s_16_9_g_auto/t_s_w960/f_auto/primary/ikmh0nytaths6vsttzsj"
        />
        <PostCard id={"4"} />
        <PostCard id={"3"} />
        <PostCard id={"6"} />
        <PostCard id={"45"} />
        <PostCard id={"4"} />
      </div>
      <Footer />
    </>
  );
};

export default page;
