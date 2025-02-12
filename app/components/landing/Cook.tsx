"use client";
import Image from "next/image";

const Cook = () => {
  return (
    <section className="relative" id="cook-section">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md">
        <div className="absolute right-0 bottom-[-7%] hidden lg:block">
          <Image
            src={
              "/landing/creative-writing-storytelling-education-concept-learning-subject-book-review-summary.png"
            }
            alt="burger-image"
            width={200}
            height={622}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 my-16 space-x-5">
          <div className="col-span-6 flex justify-start">
            <Image
              src="/landing/smiling-young-guy-student-graduation-costume-showing-his-diploma-graduation-ceremony-party.png"
              alt="nothing"
              width={636}
              height={808}
            />
          </div>
          <div className="col-span-6 flex flex-col justify-center">
            <p className="text-primary text-lg font-normal mb-3 tracking-widest uppercase text-start">
              Read with us
            </p>
            <h2 className="text-3xl lg:text-5xl font-semibold text-black dark:text-white text-start">
              Writing together with the expert.
            </h2>
            <p className="text-black/50 dark:text-white/50 md:text-lg font-normal mb-10 text-start mt-2">
              Writing together with the expert opens new possibilities for your
              craft. With guidance and feedback, you can sharpen your skills and
              explore fresh perspectives. Learn the techniques that make writing
              impactful and compelling. Expert writers offer tips, tricks, and
              strategies that help you overcome common challenges. Whether
              you’re a beginner or an experienced writer, this collaboration
              helps elevate your work. Embrace the opportunity to grow and
              improve, one word at a time.
            </p>
            <p className="text-black/50 dark:text-white/50 md:text-lg font-normal mb-10 text-start mt-1">
              Reading alongside experts to refine blogers craft. Gain valuable
              insights and enhance your skills..
            </p>
            <button className="text-xl font-medium rounded-full text-white py-5 px-6 bg-orange-400 lg:px-10 mr-6 w-fit hover:bg-stone-800 dark:hover:bg-gray-600 hover:text-primary">
              Learn more
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cook;
