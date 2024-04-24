"use client";
import { IoIosCloseCircleOutline } from "@react-icons/all-files/io/IoIosCloseCircleOutline";
import { unassignedInstructor } from "./action";
import { useParams } from "next/navigation";

export default function UnassignedButton() {
  const params: { courseId: string } = useParams();
  const handleUnassigned = async () => {
    await unassignedInstructor(params.courseId);
  };
  return (
    <button onClick={handleUnassigned} className="text-error">
      <IoIosCloseCircleOutline size={24} />
    </button>
  );
}
