import { ICourse, ITopic } from "@/types/course";
import {
  fetchCourseDetails,
  fetchCourseTopics,
} from "../../course-creation/action";
import Lesson from "./lesson";
import PublishUnpublishButton from "./publishUnpublishButton";

interface IProps {
  courseId?: string;
}
export default async function CourseOutline({ courseId }: IProps) {
  const courseDetail: ICourse = await fetchCourseDetails(courseId);
  const courseTopics: Array<ITopic> = await fetchCourseTopics(courseId);

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-3xl capitalize">
          {courseDetail.name}
        </h1>
        <PublishUnpublishButton statusValue={courseDetail.status} />
      </div>

      <h2 className="font-semibold text-xl mt-4">Course Outline</h2>
      <div className="mt-4 flex flex-col gap-4">
        {courseTopics.map((courseTopic) => (
          <Lesson key={courseTopic._id} topic={courseTopic} />
        ))}
      </div>
    </>
  );
}
