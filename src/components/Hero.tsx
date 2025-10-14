"use client";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="w-full bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-6 py-16 md:py-24 gap-10">
        <div className="flex flex-col gap-6 text-center lg:text-left max-w-xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 dark:text-green-200 leading-tight">
            Manage Your Plants with <br />
            <span className="text-green-600 dark:text-green-400">
              Plantventory
            </span>
          </h1>

          <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl">
            Track, organize, and nurture your plants all in one place. Simplify
            your plant management with smart tools and a clean interface.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-4">
            {/*  <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full shadow-md transition">
              Get Started
            </button> */}
            <button className="px-6 py-3 border border-green-600 text-green-700 dark:text-green-300 dark:border-green-300 rounded-full hover:bg-green-100 dark:hover:bg-green-800 transition">
              <Link href="/plants">Explore Plants</Link>
            </button>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end w-full lg:w-1/2">
          {/* <img
            src={heroImage}
            alt="Plantventory Hero"
            className="max-w-md w-full drop-shadow-2xl rounded-2xl"
          /> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
