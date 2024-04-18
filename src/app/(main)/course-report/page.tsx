import Filters from "./filters";
import CourseReportContainer from "./course-report-container";

export default function CourseReport() {
  return (
    <div className="px-6 py-4 flex gap-6">
      <div className="flex w-full gap-6">
        <section className="bg-white p-4 w-[256px]">
          <Filters />
        </section>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 h-full overflow-auto">
          <CourseReportContainer
            courseBanner={
              "https://pbs.twimg.com/profile_images/1163911054788833282/AcA2LnWL_400x400.jpg"
            }
            title={"Introduction to Laravel"}
            format={"Hybrid Class"}
            dateRange={"03/31/2024 - 03/31/2024"}
          />
          <CourseReportContainer
            courseBanner={
              "https://pbs.twimg.com/profile_images/1163911054788833282/AcA2LnWL_400x400.jpg"
            }
            title={"Introduction to Laravel"}
            format={"Hybrid Class"}
            dateRange={"03/31/2024 - 03/31/2024"}
          />
          <CourseReportContainer
            courseBanner={
              "https://pbs.twimg.com/profile_images/1163911054788833282/AcA2LnWL_400x400.jpg"
            }
            title={"Introduction to Laravel"}
            format={"Hybrid Class"}
            dateRange={"03/31/2024 - 03/31/2024"}
          />
          <CourseReportContainer
            courseBanner={
              "https://pbs.twimg.com/profile_images/1163911054788833282/AcA2LnWL_400x400.jpg"
            }
            title={"Introduction to Laravel"}
            format={"Hybrid Class"}
            dateRange={"03/31/2024 - 03/31/2024"}
          />
          <CourseReportContainer
            courseBanner={
              "https://pbs.twimg.com/profile_images/1163911054788833282/AcA2LnWL_400x400.jpg"
            }
            title={"Introduction to Laravel"}
            format={"Hybrid Class"}
            dateRange={"03/31/2024 - 03/31/2024"}
          />
        </div>
      </div>
    </div>
  );
}
