import Image from "next/image";
import Link from "next/link";

interface IProps {
  title?: string;
  type?: string;
  courseId?: string;
  banner?: string;
}
export default function RecentlyVisitedCard({
  courseId,
  title,
  type,
  banner,
}: IProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2">
        <div className="w-24 h-12 bg-gray rounded-md relative overflow-hidden">
          {banner && <Image src={banner} alt="banner" fill />}
        </div>
        <div className="flex flex-col">
          <span className="font-bold">{title}</span>
          <span className="font-medium text-gray">{type}</span>
        </div>
      </div>

      <div>
        <Link
          href={"/course-report/" + courseId}
          className="bg-primary text-white px-9 py-2 rounded-md"
        >
          View
        </Link>
      </div>
    </div>
  );
}
