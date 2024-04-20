"use client";

import { CourseIdContext } from "@/contexts/CourseIdContext";
import { updateCourseDetails } from "@/hooks/action";
import { ICourse } from "@/types/course";
import { fetchWithToken } from "@/utils/fetcher";
import { useContext, useState } from "react";
import { useFormStatus } from "react-dom";
import useSWR, { mutate } from "swr";

enum ESubmitButton {
  PUBLISH = "published",
  UNPUBLISH = "unpublished",
  DELETE = "delete",
}

const PublishButton = ({
  status,
}: {
  status: "published" | "unpublished" | undefined;
}) => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      name="submit"
      value={
        status === "unpublished"
          ? ESubmitButton.PUBLISH
          : ESubmitButton.UNPUBLISH
      }
      className="py-2 flex w-full justify-center font-medium bg-border bg-[#F3F4F6] rounded-md"
    >
      {pending ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : status === "unpublished" ? (
        "Publish course"
      ) : (
        "Unpublish course"
      )}
    </button>
  );
};

const DeleteButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      name="submit"
      value={ESubmitButton.DELETE}
      className="text-red-600 hover:text-red-700 duration-300 font-medium"
    >
      {pending ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : (
        "Delete Course"
      )}
    </button>
  );
};

interface IProps {
  accessToken?: string;
}

export default function CourseStatus({ accessToken }: IProps) {
  const {
    data,
    isLoading,
    mutate,
  }: { data: Array<ICourse>; isLoading: boolean; mutate: any } = useSWR(
    () => (accessToken ? `/api/v1/course` : null),
    (url) => fetchWithToken(url, accessToken ?? "")
  );
  const [courseId, setCourseId] = useContext(CourseIdContext);
  if (isLoading && !data) return "Loading";
  console.log(data);
  const index = data.findIndex((course) => course._id === courseId);
  return (
    <form
      action={async (formData: FormData) => {
        const submitValue = formData.get("submit");
        if (submitValue === ESubmitButton.PUBLISH) {
          await updateCourseDetails(courseId, { status: "published" });
          data[index].status = "published";
          mutate([...data]);
        } else if (submitValue === ESubmitButton.UNPUBLISH) {
          await updateCourseDetails(courseId, { status: "unpublished" });
          data[index].status = "unpublished";
          mutate([...data]);
        } else if (submitValue === ESubmitButton.DELETE) {
        }
      }}
      className="border border-gray border-opacity-20 bg-white h-full rounded-lg p-4 flex flex-col"
    >
      <h1 className="text-xl font-medium">Course Status</h1>

      {courseId && (
        <>
          <div className="mt-4 h-full">
            <PublishButton status={data[index]?.status} />
          </div>

          <div className="flex justify-center p-4">
            <DeleteButton />
          </div>
        </>
      )}
    </form>
  );
}
