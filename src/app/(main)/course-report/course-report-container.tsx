// CourseContainer.tsx
import Image from "next/image";

interface CourseContainerProps {
  courseBanner: string;
  title: string;
  format: string;
  dateRange: string;
}

export default function CourseReportContainer({
  courseBanner,
  title,
  format,
  dateRange,
}: CourseContainerProps) {
  return (
    <div className="group relative overflow-hidden  bg-white p-4 h-[280px] gap-6">
      <div className="h-[120px] relative ">
        <Image
          className="rounded-md"
          src={courseBanner}
          alt="Course Banner"
          objectFit="cover"
          fill
        />
      </div>
      <p className="font-semibold mt-3 mb-4 text-[16px]">{title}</p>
      <p className="mt-1 font-light text-[13px]"> {format}</p>
      <p className="font-light mt-1 text-[14px]"> {dateRange}</p>
    </div>
  );
}
