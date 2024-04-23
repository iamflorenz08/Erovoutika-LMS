"use client";
import { CiCirclePlus } from "@react-icons/all-files/ci/CiCirclePlus";
import React, { useOptimistic, useState } from "react";
import BadgesModal from "./badgesModal";
import { IBadge } from "@/types/userTypes";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

interface IProps {
  badge?: IBadge;
  availableBadges?: Array<IBadge>;
  index: number;
}

export default function Badge({ badge, availableBadges, index }: IProps) {
  const { profileId } = useParams();
  const { status, data } = useSession();
  const [modal, setModal] = useState<boolean>(false);
  const [currentBadge, setCurrentBadge] = useOptimistic(
    badge,
    (state: IBadge | undefined, newBadge: IBadge | undefined) => newBadge
  );
  return (
    <>
      <button
        onClick={() =>
          status === "authenticated" &&
          data.user._id === profileId &&
          setModal(true)
        }
      >
        {currentBadge ? (
          <div className="relative group text-black">
            <div
              className='absolute left-1/2 translate-x-[-50%] top-24
                         bg-white rounded-lg shadow-tooltip px-4 py-2 min-w-fit 
                         whitespace-nowrap hidden group-hover:block z-50 before:content-[""] before:absolute before:left-1/2
                         before:bottom-full before:-translate-x-1/2 before:w-5 before:h-5 before:border-white before:border-b-[10px] 
                         before:border-x-[10px] before:border-x-transparent'
            >
              <h1 className="font-medium">{currentBadge.name}</h1>
              <p>{currentBadge.description}</p>
            </div>
            <Image
              className="h-[72px] w-[72px]"
              src={currentBadge.imageURL}
              alt="badge"
              height={72}
              width={72}
            />
          </div>
        ) : (
          <CiCirclePlus size={72} />
        )}
      </button>

      <BadgesModal
        index={index}
        onClose={() => setModal(false)}
        isShow={modal}
        selectedBadge={(badge) => setCurrentBadge(badge)}
        availableBadges={availableBadges}
      />
    </>
  );
}
