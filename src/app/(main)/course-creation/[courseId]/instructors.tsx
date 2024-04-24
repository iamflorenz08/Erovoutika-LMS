"use client";

import useDropDown from "@/hooks/useDropDown";
import { IUser } from "@/types/userTypes";
import { fetchWithToken } from "@/utils/fetcher";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import useSWR from "swr";
import Image from "next/image";
import { assignedInstructor } from "./action";
import { useParams } from "next/navigation";

export default function Instructors() {
  const ref = useRef(null);
  const params: { courseId: string } = useParams();
  const [toggle, setToggle] = useDropDown(false, ref);
  const { data: session, status } = useSession();
  const { data, isLoading }: { data: Array<IUser>; isLoading: boolean } =
    useSWR(
      () =>
        status === "authenticated" ? "/api/v1/users?role=instructor" : null,
      (url) => fetchWithToken(url, session?.user.tokens.accessToken ?? "")
    );

  async function handleAssignedInstructor(instructorId: string | undefined) {
    setToggle(false);
    await assignedInstructor(instructorId, params.courseId);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setToggle(!toggle)}
        className="h-6 w-6 rounded-md bg-gray bg-opacity-10"
      >
        +
      </button>

      {toggle && (
        <div className="absolute top-10 rounded-md bg-white w-[474px] drop-shadow-md bg-border py-6 px-4 z-50">
          <h1 className="font-medium text-xl">Instructors</h1>

          <div className="mt-4">
            <table className="w-full">
              <thead className="border-b-2">
                <tr className="text-left">
                  <th className="p-2">Image</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((user) => (
                    <tr key={user._id}>
                      <td className="py-2 w-fit">
                        <div className="w-6 h-6 bg-gray rounded-full relative overflow-hidden">
                          {user.profileImage && (
                            <Image
                              className="object-cover"
                              src={user.profileImage}
                              alt="profile"
                              fill
                            />
                          )}
                        </div>
                      </td>
                      <td className="py-2">
                        <span className="capitalize">
                          {user.fullName?.first} {user.fullName?.last}
                        </span>
                      </td>
                      <td className="py-2 flex">
                        <button
                          className="text-primary-light"
                          onClick={() => handleAssignedInstructor(user._id)}
                        >
                          Assign Instructor
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
