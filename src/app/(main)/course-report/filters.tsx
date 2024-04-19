"use client";

import CourseFormatGroup from "./formats";

export default function Filters() {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-medium">Filter</h1>
        <button className="text-primary-light">Clear</button>
      </div>

      <div className="flex flex-col gap-4 mt-6">
        <label>
          <span className="font-medium">Format</span>
        </label>

        <CourseFormatGroup />

        <button className="bg-primary text-white py-2 rounded-md text-xl font-medium">
          Apply
        </button>
      </div>
    </>
  );
}
