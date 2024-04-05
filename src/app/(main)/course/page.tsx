import React, { Suspense } from "react";
import CoursesSection from "./coursesSection";

export default function page() {
  return (
    <div className="px-6 py-4 flex flex-col gap-6">
      <Suspense fallback={"Loading"}>
        <CoursesSection id="all" title="Browse Courses" />
      </Suspense>
      <Suspense fallback={"Loading"}>
        <CoursesSection id="popular" title="Most Popular Courses" />
      </Suspense>
      <Suspense fallback={"Loading"}>
        <CoursesSection id="recommended" title="Recommended Courses" />
      </Suspense>
    </div>
  );
}
