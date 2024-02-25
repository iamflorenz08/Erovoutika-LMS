import React from "react";

export default function page() {
  return (
    <div className="px-6 py-4">
      <div className="flex gap-6">
        <section className="bg-white w-full rounded-lg p-4 border border-gray border-opacity-20">
          <h1 className="font-semibold text-3xl">
            Introduction to Laravel 8.0
          </h1>
          <h2 className="text-gray mt-2">Taught in English</h2>
          <table className="mt-3">
            <tbody>
              <tr>
                <td className="text-gray py-2">Instructor: </td>
                <td className="px-2 py-2">Ela Mangoba</td>
              </tr>
              <tr>
                <td className="text-gray py-2">Format: </td>
                <td className="px-2 py-2">Hybrid Class</td>
              </tr>
              <tr>
                <td className="text-gray py-2">Category: </td>
                <td className="px-2 py-2">Programming</td>
              </tr>
            </tbody>
          </table>
          <h2 className="mt-8 text-[#FD661F] font-semibold">₱ 15,000</h2>
          <button className="flex flex-col items-center px-8 p-2 bg-primary text-white rounded-lg mt-4">
            <span className="font-medium">Enroll now</span>
            <span className="text-sm">Starts December 18</span>
          </button>

          <div className="w-full border border-gray border-opacity-20 my-10"></div>

          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-xl">About</h3>
            <p className="text-[#121212]">
              Laravel is a PHP-based web framework for building high-end web
              applications using its significant and graceful syntaxes. It comes
              with a robust collection of tools and provides application
              architecture. Laravel&apos;s distinctive features, such as the
              Eloquent ORM, facilitate seamless database interaction, while the
              Blade templating engine simplifies the creation of dynamic and
              appealing user interfaces. Moreover, Laravel&apos;s built-in
              features for routing, authentication, and testing contribute to
              the framework&apos;s efficiency in streamlining the development
              process. With its commitment to clean and elegant code, Laravel
              stands as a powerful and developer-friendly choice for modern web
              application development.
            </p>
          </div>

          <div className="w-full border border-gray border-opacity-20 my-10"></div>

          <div className="flex flex-col gap-2 mb-10">
            <h3 className="font-semibold text-xl">
              What skill you will learn?
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-4">
                <h4 className="font-medium">Routing in Laravel 8.0</h4>
                <p className="text-[#121212]">
                  Learn how to effectively define and manage routes in Laravel
                  8.0. Explore the powerful routing system that allows you to
                  handle HTTP requests and define the structure of your
                  application&apos;s URLs.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="font-medium">Routing in Laravel 8.0</h4>
                <p className="text-[#121212]">
                  Learn how to effectively define and manage routes in Laravel
                  8.0. Explore the powerful routing system that allows you to
                  handle HTTP requests and define the structure of your
                  application&apos;s URLs.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="font-medium">Routing in Laravel 8.0</h4>
                <p className="text-[#121212]">
                  Learn how to effectively define and manage routes in Laravel
                  8.0. Explore the powerful routing system that allows you to
                  handle HTTP requests and define the structure of your
                  application&apos;s URLs.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white w-full rounded-lg p-4 h-fit border border-gray border-opacity-20">
          <h1 className="font-semibold text-xl">Course Outline</h1>
          <div className="mt-4 flex flex-col gap-4">
            <div className="p-4 border border-gray border-opacity-20">
              <span className="font-medium">Getting Started with Laravel</span>
            </div>
            <div className="p-4 border border-gray border-opacity-20">
              <span className="font-medium">Getting Started with Laravel</span>
            </div>
            <div className="p-4 border border-gray border-opacity-20">
              <span className="font-medium">Getting Started with Laravel</span>
            </div>
            <div className="p-4 border border-gray border-opacity-20">
              <span className="font-medium">Getting Started with Laravel</span>
            </div>
            <div className="p-4 border border-gray border-opacity-20">
              <span className="font-medium">Getting Started with Laravel</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
