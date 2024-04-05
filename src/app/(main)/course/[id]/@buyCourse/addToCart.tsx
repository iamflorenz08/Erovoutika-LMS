"use client";
import { IoCart } from "@react-icons/all-files/io5/IoCart";
import React, { useState } from "react";
import { addToCart, removeToCart } from "./action";
import { ICart } from "@/types/cart";
import { useFormStatus } from "react-dom";

interface IProps {
  courseId?: string;
  cart?: ICart;
}

const SubmitButton = ({ cartId }: { cartId?: string }) => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="flex justify-center items-center px-4 py-2 min-w-[180px] min-h-[64px] bg-primary text-white rounded-lg mt-4"
    >
      {pending ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : cartId ? (
        <span className="font-medium text-lg flex items-center gap-2">
          <IoCart size={24} /> Remove to cart
        </span>
      ) : (
        <span className="font-medium text-lg flex items-center gap-2">
          <IoCart size={24} /> Add to cart
        </span>
      )}
    </button>
  );
};

export default function AddToCart({ courseId, cart }: IProps) {
  const [cartDetails, setCartDetails] = useState<ICart>(cart ?? {});

  return (
    <form
      action={async () => {
        if (cartDetails._id) {
          const cart = await removeToCart(cartDetails._id);
          cart && setCartDetails({ ...{} });
          return;
        }
        const cart = await addToCart(courseId);
        setCartDetails(cart ? { ...cart } : { ...cartDetails });
      }}
    >
      <SubmitButton cartId={cartDetails._id} />
    </form>
  );
}
