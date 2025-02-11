import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async () => {
  return (
    <section className="pt-10 overflow-hidden bg-gray-50 dark:bg-gray-800 md:pt-0 sm:pt-16 2xl:pt-16">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid items-center grid-cols-1 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl lg:text-5xl">
              Hey 👋 I am
              <br className="block sm:hidden" />
              Diaz
            </h2>
            <p className="max-w-lg mt-3 text-xl leading-relaxed text-gray-600 dark:text-gray-300 md:mt-8">
              I&apos;m a passionate software developer with 2 years of
              experience building reliable, user-friendly applications.
              I&apos;ve worked on both front-end and back-end projects, which
              has given me a well-rounded understanding of full-stack
              development. I&apos;m dedicated to writing clean, efficient code
              and always eager to learn new technologies and best practices to
              improve my work. My collaborative mindset and problem-solving
              skills help me contribute effectively to team projects and tackle
              complex challenges with confidence.
            </p>

            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 md:mt-8">
              <span className="relative inline-block">
                <span className="absolute inline-block w-full bottom-0.5 h-2 bg-yellow-300 dark:bg-gray-900"></span>
                <span className="relative"> Have a question? </span>
              </span>
              <br className="block sm:hidden" />
              Ask me on{" "}
              <Link
                href="https://www.linkedin.com/in/dias-antony?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                title="LinkedIn"
                target="blank"
                className="transition-all duration-200 text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-500 hover:underline"
              >
                LinkedIn
              </Link>
            </p>
          </div>
          <div className="relative">
            <Image
              className="absolute inset-x-0 bottom-0 -mb-48 left-1/2"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/team/1/blob-shape.svg"
              alt=""
              fill
            />
            <Image
              className="relative w-full xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/team/1/business-woman.png"
              alt=""
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
