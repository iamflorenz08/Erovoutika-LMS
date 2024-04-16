"use client";
import { CourseSavingContext } from "@/contexts/CourseSavingContext";
import { FiRefreshCw } from "@react-icons/all-files/fi/FiRefreshCw";
import { FiSave } from "@react-icons/all-files/fi/FiSave";
import { useContext } from "react";

export default function Saving() {
  const [isCourseSaving, setIsCourseSaving] = useContext(CourseSavingContext);
  return (
    <>
      {isCourseSaving ? (
        <>
          <span>
            <FiRefreshCw size={24} />
          </span>
          Saving...
        </>
      ) : (
        <>
          <span>
            <FiSave size={24} />
          </span>
          Saved
        </>
      )}
    </>
  );
}
