"use client";
import { PiCaretDownBold } from "@react-icons/all-files/pi/PiCaretDownBold";
import CourseContainer from "./courseContainer";
import { useCallback, useEffect, useState } from "react";
import { ICourse } from "@/types/course";
import { useParams } from "next/navigation";

interface IProps {
  courses: Array<ICourse>;
}

export default function CourseSection({ courses }: IProps) {
  const params = useParams();
  const courseSelectedId = params.id?.[0];
  const selectedCourseIndex = courses.findIndex(
    (course) => course._id === courseSelectedId
  );
  const selectedCourse: ICourse = courses[selectedCourseIndex];

  const [showPublish, setShowPublish] = useState<boolean>(
    selectedCourse?.status === "published"
  );
  const [showUnpublish, setShowUnpublish] = useState<boolean>(
    selectedCourse?.status === "unpublished"
  );

  useEffect(() => {
    if (showUnpublish) {
      setShowPublish(false);
    }
  }, [showUnpublish]);

  useEffect(() => {
    if (showPublish) {
      setShowUnpublish(false);
    }
  }, [showPublish]);

  return (
    <>
      <button
        onClick={() => setShowPublish(!showPublish)}
        className="flex justify-between items-center"
      >
        <h1 className="font-medium text-xl">Published Courses</h1>
        <div className="flex justify-center items-center w-6 h-6">
          <PiCaretDownBold size={15} />
        </div>
      </button>

      {showPublish && (
        <div className="flex flex-col overflow-auto">
          {courses.map(
            (course) =>
              course.status === "published" && (
                <CourseContainer
                  id={course._id}
                  name={course.name}
                  banner={course.banner}
                  format={course.format}
                  key={course._id}
                />
              )
          )}
        </div>
      )}

      <button
        onClick={() => setShowUnpublish(!showUnpublish)}
        className="flex justify-between items-center"
      >
        <h1 className="font-medium text-xl">Unpublished Courses</h1>
        <div className="flex justify-center items-center w-6 h-6">
          <PiCaretDownBold size={15} />
        </div>
      </button>

      {showUnpublish && (
        <div className="flex flex-col overflow-auto">
          {courses.map(
            (course) =>
              course.status === "unpublished" && (
                <CourseContainer
                  id={course._id}
                  name={course.name}
                  banner={course.banner}
                  format={course.format}
                  key={course._id}
                />
              )
          )}
        </div>
      )}
    </>
  );
}
