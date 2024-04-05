"use client";

import { ICourse, ISkill } from "@/types/course";
import { useState } from "react";
import { FaPlus } from "@react-icons/all-files/fa6/FaPlus";
import { GoTrash } from "@react-icons/all-files/go/GoTrash";
import useUpdateCourseDetails from "@/hooks/useUpdateCourseDetails";

interface IProps {
  courseId?: string;
  skills?: Array<ISkill>;
}

export default function Skills({ skills, courseId }: IProps) {
  const [details, setDetails] = useState<ICourse>({
    _id: courseId,
    skills: skills
      ? skills
      : [
          {
            dummyId: crypto.randomUUID(),
            name: "",
            description: "",
          },
        ],
  });
  const updateDetails = useUpdateCourseDetails(details);
  const addSkill = () => {
    details.skills?.push({
      dummyId: crypto.randomUUID(),
      name: "",
      description: "",
    });
    setDetails({ ...details });
  };

  const removeSkill = (skillId: string | undefined) => {
    setDetails({
      ...details,
      skills: details.skills?.filter((skill) => skillId !== skill.dummyId),
    });
  };

  const handleNameChange = (value: string, index: number) => {
    setDetails((curr) => {
      return {
        ...curr,
        skills: details.skills?.map((skill, innerIndex) =>
          index === innerIndex ? { ...skill, name: value } : { ...skill }
        ),
      };
    });
  };

  const handleDescriptionChange = (value: string, index: number) => {
    setDetails((curr) => {
      return {
        ...curr,
        skills: details.skills?.map((skill, innerIndex) =>
          index === innerIndex ? { ...skill, description: value } : { ...skill }
        ),
      };
    });
  };

  return (
    <>
      {details.skills?.map((skill, index) => (
        <div key={skill.dummyId} className="flex flex-col gap-2">
          <h1>Skill #{index + 1}</h1>
          <input
            onChange={(e) => handleNameChange(e.target.value, index)}
            value={skill.name}
            type="text"
            name="name"
            placeholder="Skill name"
            className="px-4 py-2 border border-gray border-opacity-20 text-xl rounded-md outline-none"
          />
          <textarea
            onChange={(e) => handleDescriptionChange(e.target.value, index)}
            value={skill.description}
            name="description"
            className="px-4 py-2 border border-gray border-opacity-20 outline-none rounded-md h-[120px] text-xl"
            placeholder="Description"
          ></textarea>

          {index > 0 && (
            <div className="flex justify-end">
              <button
                onClick={() => removeSkill(skill.dummyId)}
                className="rounded-lg border border-gray border-opacity-20 px-4 py-2 flex w-fit gap-2"
              >
                <GoTrash size={24} />
                Remove
              </button>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={addSkill}
        className="flex justify-center items-center h-[120px] rounded-lg border-2 border-gray hover:bg-gray hover:bg-opacity-5 duration-300"
      >
        <FaPlus size={23} />
      </button>
    </>
  );
}
