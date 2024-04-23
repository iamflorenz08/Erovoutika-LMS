import { IoPrintOutline } from "@react-icons/all-files/io5/IoPrintOutline";
import { fetchCourseReport, fetchCourseStudents } from "../fetch";
import { ICourseReport, IStudent } from "@/types/courseReport";
import { formatDate } from "@/utils/dateUtils";
import { FormatCourseFormat } from "@/types/course";

interface IProps {
  params: { courseId: string };
}
export default async function page({ params }: IProps) {
  const courseReport: ICourseReport = await fetchCourseReport(params.courseId);
  const courseStudents: Array<IStudent> = await fetchCourseStudents(
    params.courseId
  );

  return (
    <section className="p-4 flex justify-center">
      <div className="px-7 py-4 bg-white w-[920px] bg-border rounded-md p-2">
        <h1 className="font-medium text-xl">{courseReport.course?.name}</h1>
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex">
            <h2 className="w-[95px] text-gray">Format</h2>
            <span className="capitalize">
              {FormatCourseFormat[String(courseReport.course?.format)]}
            </span>
          </div>

          <div className="flex">
            <h2 className="w-[95px] text-gray">Status</h2>
            <span className="capitalize">{courseReport.course?.status}</span>
          </div>

          <div className="flex">
            <h2 className="w-[95px] text-gray">Instructors</h2>
            <span className="capitalize">N/A</span>
          </div>
        </div>

        <div className="mt-8 flex gap-6 justify-center text-xl font-medium">
          <div className="flex flex-col items-center">
            <span>Enrolled students</span>
            <span>{courseReport.studentCount}</span>
          </div>
          <div className="flex flex-col items-center">
            <span>Completion Rate</span>
            <span>{courseReport.completionRate?.toFixed(0) ?? 0}%</span>
          </div>
        </div>

        <h3 className="font-medium text-xl mt-10 px-4">
          Students ({courseReport.studentCount})
        </h3>
        <div className="mt-2">
          <table className="w-full">
            <thead className="border-b-2">
              <tr className="text-left ">
                <th className="p-2 font-normal">Image</th>
                <th className="p-2 font-normal">Name</th>
                <th className="p-2 font-normal">Date joined</th>
                <th className="p-2 font-normal">Progress</th>
              </tr>
            </thead>
            <tbody>
              {courseStudents.map((courseStudent) => (
                <tr key={courseStudent._id}>
                  <td className="py-2 w-fit">
                    <div className="w-6 h-6 bg-gray rounded-full"></div>
                  </td>
                  <td className="py-2">
                    <span className="capitalize">
                      {courseStudent.user.fullName?.first}{" "}
                      {courseStudent.user.fullName?.last}
                    </span>
                  </td>
                  <td className="py-2">
                    <span className="capitalize">
                      {formatDate(new Date(courseStudent.createdAt))}
                    </span>
                  </td>
                  <td className="py-2">
                    <span className="capitalize">
                      {courseStudent.progressPercentage.toFixed(0)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button className="mt-8 bg-primary text-white py-2 flex justify-center items-center gap-2 rounded-md w-full text-xl font-medium">
          <IoPrintOutline size={24} />
          Print Report
        </button>
      </div>
    </section>
  );
}
