"use client";

import { ICourse, ITopic } from "@/types/course";
import { useContext, useEffect } from "react";
import { updateCourseDetails, updateTopicDetails } from "./action";
import { CourseSavingContext } from "@/contexts/CourseSavingContext";

export default function useUpdateCourseTopic(topicDetails: ITopic) {
  const [isCourseSaving, setIsCourseSaving] = useContext(CourseSavingContext);

  useEffect(() => {
    setIsCourseSaving(true);
    const timeout = setTimeout(async () => {
      await updateTopicDetails(topicDetails._id, topicDetails);
      setIsCourseSaving(false);
    }, 800);

    return () => {
      clearTimeout(timeout);
      setIsCourseSaving(false);
    };
  }, [topicDetails]);

  return null;
}
