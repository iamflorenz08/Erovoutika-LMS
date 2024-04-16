"use client";
import DialogYesNo from "@/components/dialogYesNo";
import { useState } from "react";
import { submitAssesment } from "./action";
import { useParams, useRouter } from "next/navigation";

interface IProps {
  type: "one" | "two";
}

export default function SubmitAssesmentButton({ type }: IProps) {
  const router = useRouter();
  const params: { id: string; answerId: string } = useParams();
  const [submitModal, setSubmitModal] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = () => {
    setSubmitModal(true);
  };

  const submit = async () => {
    setIsSubmitting(true);
    const isSubmitted = await submitAssesment(params.answerId);
    if (!isSubmitted) {
      setIsSubmitting(false);
      return;
    }
    router.replace(`/course/${params.id}`);
    setIsSubmitting(false);
  };

  return (
    <>
      {type === "one" && (
        <button
          onClick={handleSubmit}
          type="button"
          className="py-2 px-9 bg-primary text-white font-medium text-xl rounded-md"
        >
          Submit
        </button>
      )}
      {type === "two" && (
        <button
          onClick={handleSubmit}
          className="py-2 bg-primary text-white w-full rounded-md font-medium mt-4"
        >
          Submit Assessment
        </button>
      )}

      {submitModal && (
        <DialogYesNo
          title="Submit quiz"
          body="Are you sure you want to submit the quiz?"
          noLabel="Cancel"
          yesLabel={
            isSubmitting ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Yes, submit it"
            )
          }
          noCallback={() => setSubmitModal(false)}
          yesCallback={submit}
        />
      )}
    </>
  );
}
