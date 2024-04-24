import { FormatCourseFormat, ICourse } from "@/types/course";
import { FiEdit } from "@react-icons/all-files/fi/FiEdit";
import Saving from "./saving";
import { fetchCourseDetails } from "../action";
import Instructors from "./instructors";
import UnassignedButton from "./unassignedButton";

interface IProps {
  courseId: string;
}

export default async function CourseDetails({ courseId }: IProps) {
  const course: ICourse = await fetchCourseDetails(courseId);

  return (
    <>
      <div className="flex w-full justify-between">
        <h1 className="font-bold text-[32px] capitalize">{course.name}</h1>
        <div className="flex items-center gap-2 text-gray">
          <Saving />
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-4">
        <div className="flex">
          <h2 className="w-[95px] text-gray">Format</h2>
          <span className="capitalize">
            {FormatCourseFormat[String(course.format)]}
          </span>
        </div>

        <div className="flex">
          <h2 className="w-[95px] text-gray">Status</h2>
          <span className="capitalize">{course.status}</span>
        </div>

        {course.format !== "self-paced" && (
          <div className="flex">
            <h2 className="w-[95px] text-gray">Instructors</h2>

            {course.instructor ? (
              <span className="capitalize flex items-center gap-2">
                {course.instructor?.fullName?.first}{" "}
                {course.instructor?.fullName?.last}
                <UnassignedButton />
              </span>
            ) : (
              <Instructors />
            )}
          </div>
        )}
      </div>
    </>
  );
}
