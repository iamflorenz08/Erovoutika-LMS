import Image from "next/image";
import Link from "next/link";

export default function CourseCard() {
  return (
    <Link
      href={"/course/123"}
      className="p-4 bg-white border border-gray border-opacity-20 h-full rounded-lg flex flex-col gap-4 hover:drop-shadow-md hover:shadow-md duration-200"
    >
      <div className="relative h-[120px] rounded-lg overflow-hidden">
        <Image
          alt="course image"
          className="object-cover"
          src={
            "https://pbs.twimg.com/profile_images/1163911054788833282/AcA2LnWL_400x400.jpg"
          }
          fill
        />
        <span className="px-4 py-2 text-primary absolute top-2 right-2 bg-white font-semibold rounded-full">
          ₱ 15,000
        </span>
      </div>

      <div>
        <h1 className="font-medium text-xl line-clamp-2 h-[60px]">
          Introduction to Laravel 8.0
        </h1>
        <div className="flex flex-col gap-2">
          <h1 className="font-medium text-sm text-[#A7A7A7]">Hybrid Class</h1>
          <p className="line-clamp-4">
            Laravel is a PHP based web framework for building high-end web
            applications using its significant and graceful syntaxes. It comes
            with a robust collection of tools and provides application
            architecture.
          </p>
        </div>
      </div>
    </Link>
  );
}
