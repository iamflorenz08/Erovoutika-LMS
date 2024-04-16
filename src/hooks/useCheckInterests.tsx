import { IUser } from "@/types/userTypes";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function useCheckInterests() {
  const { data } = useSession();
  const [isDone, setIsDone] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  useEffect(() => {
    const checkInterests = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URI}/api/v1/users/interests`,
        {
          headers: {
            authorization: "Bearer " + data?.user.tokens.accessToken,
          },
        }
      );
      const interestsData: IUser = await res.json();
      if (res.ok) {
        interestsData.interests &&
          interestsData.interests.length <= 0 &&
          setIsShow(true);

        setIsDone(true);
      }
    };

    !isDone && data && checkInterests();
  }, [data, isDone]);
  return { isShow, setIsShow };
}
