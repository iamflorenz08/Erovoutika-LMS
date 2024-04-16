"use client";

import { useState } from "react";
import CourseFormatModal from "./courseFormatModal";
import CourseBannerModal from "./courseBannerModal";
import CourseNameModal from "./courseNameModal";

export default function ModalsContainer() {
  const [step, setStep] = useState<number>(0);
  return (
    <>
      {step === 0 && (
        <CourseFormatModal doneStep={() => setStep((curr) => curr + 1)} />
      )}

      {step === 1 && (
        <CourseBannerModal doneStep={() => setStep((curr) => curr + 1)} />
      )}

      {step === 2 && (
        <CourseNameModal doneStep={() => setStep((curr) => curr + 1)} />
      )}
    </>
  );
}
