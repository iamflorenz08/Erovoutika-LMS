import { ICourse } from "@/types/course";
import { fetchCourseDetails } from "../../action";
import Pricing from "./pricing";

interface IProps {
  params: { courseId: string };
}

export default async function page({ params }: IProps) {
  const course: ICourse = await fetchCourseDetails(params.courseId);
  return <Pricing courseId={params.courseId} pricing={course.pricing} />;
}
