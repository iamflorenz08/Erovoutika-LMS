import { ITopic } from "@/types/course";
import CourseSeries from "./courseSeries";
import { fetchCourseTopics } from "../../action";

interface IProps {
  params: { courseId: string };
}

export default async function page({ params }: IProps) {
  const topics: Array<ITopic> = await fetchCourseTopics(params.courseId);
  return (
    <>
      <CourseSeries courseId={params.courseId} courseTopics={topics} />
    </>
  );
}
