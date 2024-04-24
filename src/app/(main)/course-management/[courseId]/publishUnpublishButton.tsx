"use client";
import { updateCourseDetails } from "@/hooks/action";
import { useParams } from "next/navigation";
import { useState } from "react";
interface IProps {
  statusValue?: "published" | "unpublished";
}
export default function PublishUnpublishButton({ statusValue }: IProps) {
  const params: { courseId: string } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<"published" | "unpublished" | undefined>(
    statusValue
  );

  const handlePublishUnpublish = async () => {
    const newStatus = status === "published" ? "unpublished" : "published";
    setIsLoading(true);
    await updateCourseDetails(params.courseId, { status: newStatus });
    setIsLoading(false);
    setStatus(newStatus);
  };

  return (
    <button
      onClick={handlePublishUnpublish}
      className={`${
        status === "published" ? "text-error" : "text-primary-light"
      } text-xl`}
    >
      {isLoading ? (
        "Loading..."
      ) : (
        <>{status === "published" ? "Unpublish Course" : "Publish Course"}</>
      )}
    </button>
  );
}
