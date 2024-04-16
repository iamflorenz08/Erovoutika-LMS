"use client";
import { ICart } from "@/types/cart";
import { useContext, useState } from "react";
import { CartSidebarContext } from "@/contexts/CartSidebarContext";
import { MdKeyboardDoubleArrowRight } from "@react-icons/all-files/md/MdKeyboardDoubleArrowRight";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import CartItemList from "./cartItemList";
import CartItemTotal from "./cartItemTotal";
import { checkout } from "./action";
import { useFormStatus } from "react-dom";

interface IProps {}

const SubmiButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="bg-primary text-white flex py-4 w-full justify-center rounded-md font-medium"
    >
      {pending ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : (
        "Proceed to Checkout"
      )}
    </button>
  );
};

export default function CartSidebarModal({}: IProps) {
  const [isOpen, setIsOpen] = useContext(CartSidebarContext);
  const { data, status } = useSession();
  if (status !== "authenticated") return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-50 bg-opacity-20 flex justify-end bg-border"
        >
          <motion.section
            initial={{ x: 536 }}
            whileInView={{ x: 0 }}
            exit={{ x: 536 }}
            transition={{ type: "spring", bounce: 0 }}
            className="bg-white w-full max-w-[536px] h-screen flex flex-col"
          >
            <div className="p-4 flex justify-between">
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center"
              >
                Close <MdKeyboardDoubleArrowRight size={24} />
              </button>

              <button className="text-primary-light">Remove All</button>
            </div>
            <h1 className="text-center text-2xl font-bold mt-4">My Cart</h1>
            <div className="flex flex-col h-full">
              <CartItemList
                userId={data.user._id}
                accessToken={data.user.tokens.accessToken}
              />
            </div>
            <div className="border-t p-4 border-gray border-opacity-20 flex flex-col gap-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Total Price:</span>
                <CartItemTotal
                  userId={data.user._id}
                  accessToken={data.user.tokens.accessToken}
                />
              </div>

              <form
                action={async () => {
                  await checkout();
                }}
              >
                <SubmiButton />
              </form>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
