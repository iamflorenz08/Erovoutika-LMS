"use client";

import { IoPrintOutline } from "@react-icons/all-files/io5/IoPrintOutline";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useState } from "react";
interface IProps {
  courseName?: string;
}
export default function PrintReport({ courseName }: IProps) {
  const params: { courseId: string } = useParams();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGenerateCertificate = async () => {
    if (!params.courseId) throw new Error("No course ID.");
    if (status !== "authenticated") throw new Error("Not authorized.");
    let anchor = document.createElement("a");
    setIsLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/api/v1/course/reports/${params.courseId}/generate-pdf`,
      {
        headers: {
          authorization: "Bearer " + session?.user.tokens.accessToken,
        },
      }
    )
      .then((res) => res.blob())
      .then((blob) => {
        let objectUrl = window.URL.createObjectURL(blob);
        anchor.href = objectUrl;
        anchor.download = `${courseName}-report.pdf`;
        anchor.click();
        window.URL.revokeObjectURL(objectUrl);
        setIsLoading(false);
      })
      .catch((err) => setIsLoading(false));
  };

  return (
    <button
      onClick={handleGenerateCertificate}
      className="mt-8 bg-primary text-white py-2 flex justify-center items-center gap-2 rounded-md w-full text-xl font-medium"
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-md py-2"></span>
      ) : (
        <>
          <IoPrintOutline size={24} />
          Print Report
        </>
      )}
    </button>
  );
}
