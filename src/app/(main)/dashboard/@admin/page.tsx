import { HiOutlineArrowRight } from "@react-icons/all-files/hi/HiOutlineArrowRight";
import RecentlyVisitedCard from "../recentlyVisitedCard";
import { FormatCourseFormat, ICourse } from "@/types/course";
import { fetchCoursesReport } from "../../course-report/fetch";
import { ILog } from "@/types/log";
import { fetchLogs } from "../../logs/logRows";
import { formatDate, formatTime } from "@/utils/dateUtils";
import Link from "next/link";

export default async function page() {
  const courses: Array<ICourse> = await fetchCoursesReport(7);
  const logs: Array<ILog> = await fetchLogs(6);

  return (
    <div className="flex gap-6 px-6 py-4">
      <div className="w-full flex flex-col gap-6">
        <section className="bg-border rounded-md bg-white p-4 min-h-[512px] max-h-[512px] flex flex-col">
          <h1 className="text-xl font-bold">Course Report</h1>
          <div className="flex flex-col mt-6 gap-2 h-full overflow-auto">
            {courses.map((course) => (
              <RecentlyVisitedCard
                key={course._id}
                title={course.name}
                type={FormatCourseFormat[String(course.format)]}
                courseId={course._id}
                banner={course.banner}
              />
            ))}
          </div>
          <div className="flex justify-end">
            <Link
              href={"/course-report"}
              className="flex justify-end items-center text-[16px] font-bold text-primary gap-2"
            >
              View All
              <span className="text-lg">
                <HiOutlineArrowRight />
              </span>
            </Link>
          </div>
        </section>

        <section className="bg-border rounded-md bg-white p-4 min-h-[384px] max-h-[384px] flex flex-col">
          <h1 className="text-xl font-bold">Logs</h1>

          <div className="mt-6 h-full overflow-auto">
            <table className="w-full">
              <thead className="border-b-2">
                <tr className="text-left">
                  <th className="p-2 px-4">Date</th>
                  <th className="p-2 px-4">Time</th>
                  <th className="p-2 px-4">User</th>
                  <th className="p-2 px-4">Activity</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log._id}>
                    <td className="py-2 px-4">
                      <span>
                        {log.createdAt && formatDate(new Date(log.createdAt))}
                      </span>
                    </td>
                    <td className="py-2 px-4">
                      <span>
                        {log.createdAt && formatTime(new Date(log.createdAt))}
                      </span>
                    </td>
                    <td className="py-2 px-4">
                      <span className="capitalize">
                        {log.user?.fullName.first} {log.user?.fullName.last}
                      </span>
                    </td>
                    <td className="py-2 px-4">
                      <span>{log.activity}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end">
            <Link
              href={"/logs"}
              className="flex justify-end items-center text-[16px] font-bold text-primary gap-2"
            >
              View All
              <span className="text-lg">
                <HiOutlineArrowRight />
              </span>
            </Link>
          </div>
        </section>
      </div>

      <div className="min-w-[432px] flex flex-col gap-6">
        <section className="bg-white flex flex-col gap-2 p-4 items-center justify-center rounded-lg border border-gray border-opacity-20 h-[128px]">
          <span className="font-bold text-3xl">3</span>
          <span className="font-medium text-2xl">Daily Quests Available</span>
        </section>

        <section className="bg-border rounded-md bg-white p-4 min-h-[768px] max-h-[768px] flex flex-col">
          <h1 className="text-xl font-bold">Flagged Comments and Posts</h1>

          <div className="mt-6">
            <table className="w-full">
              <thead className="border-b-2">
                <tr className="text-left">
                  <th className="p-2 px-4">Report</th>
                  <th className="p-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
