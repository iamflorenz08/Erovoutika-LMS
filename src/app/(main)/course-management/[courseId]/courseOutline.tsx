import { ITopic } from "@/types/course";
import { fetchCourseTopics } from "../../course-creation/action";
import Lesson from "./lesson";

interface IProps {
  courseId?: string;
}
export default async function CourseOutline({ courseId }: IProps) {
  const courseTopics: Array<ITopic> = await fetchCourseTopics(courseId);
  return (
    <>
      <h1 className="font-semibold text-3xl capitalize">123</h1>
      <h2 className="font-semibold text-xl mt-4">Course Outline</h2>
      <div className="mt-4 flex flex-col gap-4">
        {courseTopics.map((courseTopic) => (
          <Lesson key={courseTopic._id} topic={courseTopic} />
        ))}
      </div>
    </>
  );
}
