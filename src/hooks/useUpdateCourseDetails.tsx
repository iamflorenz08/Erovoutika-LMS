"use client";

import { ICourse } from "@/types/course";
import { useContext, useEffect } from "react";
import { updateCourseDetails } from "./action";
import { CourseSavingContext } from "@/contexts/CourseSavingContext";

export default function useUpdateCourseDetails(courseDetails: ICourse) {
  const [isCourseSaving, setIsCourseSaving] = useContext(CourseSavingContext);

  useEffect(() => {
    setIsCourseSaving(true);
    const timeout = setTimeout(async () => {
      await updateCourseDetails(courseDetails._id, courseDetails);
      setIsCourseSaving(false);
    }, 800);

    return () => {
      clearTimeout(timeout);
      setIsCourseSaving(false);
    };
  }, [courseDetails]);
  return null;
}
