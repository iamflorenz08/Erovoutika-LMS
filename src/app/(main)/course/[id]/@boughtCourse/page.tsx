import {
  fetchCourseDetails,
  fetchCourseTopics,
} from "@/app/(main)/course-creation/action";
import { ICourse, ITopic } from "@/types/course";
import React from "react";
import Lessons from "./lessons";
import TopicContent from "./topicContent";

interface IProps {
  children: React.ReactNode;
  params: { id: string; topicId: string };
}
export default async function page({
  children,
  params: { id: courseId },
}: IProps) {
  const course: ICourse = await fetchCourseDetails(courseId);
  const topics: Array<ITopic> = await fetchCourseTopics(courseId);

  return (
    <div className="px-6 py-4">
      <div className="flex gap-6">
        <section className="bg-white w-full rounded-lg p-4 border border-gray border-opacity-20 h-fit sticky top-4">
          <h1 className="font-semibold text-3xl capitalize">{course.name}</h1>
          <h2 className="font-semibold text-xl mt-4">Course Outline</h2>
          <div className="mt-4 flex flex-col gap-4">
            {topics.map((topic) => (
              <Lessons key={topic._id} topic={topic} courseId={courseId} />
            ))}
          </div>
        </section>
        <section className="bg-white w-full rounded-lg p-4 h-fit border border-gray border-opacity-20">
          <TopicContent />
        </section>
      </div>
    </div>
  );
}
