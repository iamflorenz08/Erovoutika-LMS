import React from "react";
import Skills from "./skills";
import { fetchCourseDetails } from "../../action";
import { ICourse } from "@/types/course";

interface IProps {
  params: { courseId: string };
}
export default async function page({ params }: IProps) {
  const course: ICourse = await fetchCourseDetails(params.courseId);
  return (
    <div className="flex flex-col gap-4">
      <Skills
        courseId={course._id ?? params.courseId}
        skills={course.skills?.map((skill) => {
          return { ...skill, dummyId: crypto.randomUUID() };
        })}
      />
    </div>
  );
}
