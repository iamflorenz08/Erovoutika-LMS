"use client";

import useUpdateCourseDetails from "@/hooks/useUpdateCourseDetails";
import { ICourse, IPricing } from "@/types/course";
import { useState } from "react";

interface IProps {
  courseId?: string;
  pricing?: IPricing;
}

export default function Pricing({ courseId, pricing }: IProps) {
  const [details, setDetails] = useState<ICourse>({
    _id: courseId,
    pricing: pricing
      ? pricing
      : {
          price: "",
          allowDiscount: false,
          discountPrice: "",
          pointsNeeded: "",
        },
  });

  const updateDetails = useUpdateCourseDetails(details);

  return (
    <div>
      <h1 className="text-xl">Price</h1>
      <input
        type="number"
        className="bg-border rounded-lg text-xl px-4 py-2 w-full mt-2"
        placeholder="0.00"
        onChange={(e) =>
          setDetails({
            ...details,
            pricing: {
              ...details.pricing,
              price: e.target.value ? Number(e.target.value) : "",
            },
          })
        }
        value={details.pricing?.price}
      />
      <label className="flex items-center gap-2  mt-4">
        <input
          onChange={(e) =>
            setDetails({
              ...details,
              pricing: { ...details.pricing, allowDiscount: e.target.checked },
            })
          }
          type="checkbox"
          className="checkbox checkbox-sm rounded-none [--chkbg:theme(colors.primary-light)]"
        />
        <span>Allow to use points discount?</span>
      </label>

      <div className="flex gap-4 mt-4">
        <div className="w-full">
          <h1 className="text-xl">Discounted Price</h1>
          <input
            disabled={!details.pricing?.allowDiscount}
            type="number"
            className="bg-border rounded-lg text-xl px-4 py-2 w-full mt-2"
            placeholder="0.00"
            onChange={(e) =>
              setDetails({
                ...details,
                pricing: {
                  ...details.pricing,
                  discountPrice: e.target.value ? Number(e.target.value) : "",
                },
              })
            }
            value={details.pricing?.discountPrice}
          />
        </div>
        <div className="w-full">
          <h1 className="text-xl">Points needed</h1>
          <input
            disabled={!details.pricing?.allowDiscount}
            type="number"
            className="bg-border rounded-lg text-xl px-4 py-2 w-full mt-2"
            placeholder="0"
            onChange={(e) =>
              setDetails({
                ...details,
                pricing: {
                  ...details.pricing,
                  pointsNeeded: e.target.value ? Number(e.target.value) : "",
                },
              })
            }
            value={details.pricing?.pointsNeeded}
          />
        </div>
      </div>
    </div>
  );
}
