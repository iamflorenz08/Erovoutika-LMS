"use client";

import { ICourse } from "@/types/course";
import { useState } from "react";
import useUpdateCourseDetails from "@/hooks/useUpdateCourseDetails";

interface IProps {
  courseId?: string;
  description?: string;
  language?: string;
}
export default function DetailsInput({
  courseId,
  description,
  language,
}: IProps) {
  const [details, setDetails] = useState<ICourse>({
    _id: courseId,
    description,
    language,
  });

  const updateCourseDetails = useUpdateCourseDetails(details);

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setDetails({ ...details, [name]: value });
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl">Description</h1>
        <textarea
          name="description"
          value={details?.description}
          onChange={handleChange}
          className="px-4 py-2 border border-gray border-opacity-20 outline-none rounded-md h-[200px] text-xl"
          placeholder="Enter course description here..."
        ></textarea>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-xl">Language</h1>
        <input
          name="language"
          value={details?.language}
          onChange={handleChange}
          className="px-4 py-2 border border-gray border-opacity-20 outline-none rounded-md text-xl"
          placeholder="Enter preferred language here..."
        ></input>
      </div>
    </>
  );
}
