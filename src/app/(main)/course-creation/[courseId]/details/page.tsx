import ChangePicture from "./changePicture";
import { ICourse } from "@/types/course";
import DetailsInput from "./detailsInput";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { fetchCourseDetails } from "../../action";

interface IProps {
  params: { courseId: string };
}

export default async function page({ params }: IProps) {
  const course: ICourse = await fetchCourseDetails(params.courseId);
  
  return (
    <>
      <ChangePicture courseId={params.courseId} imageSrc={course.banner} />
      <DetailsInput
        description={course.description}
        language={course.language}
        courseId={params.courseId}
      />
    </>
  );
}
