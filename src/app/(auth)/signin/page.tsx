"use client";
import Image from "next/image";
import Nodes from "@/images/nodes.png";
import Logo from "@/images/logo.png";
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";
import { useRef, useState } from "react";
import SignUpModal from "@/components/SignUpModal";
import { signIn } from "next-auth/react";

interface IProps {
  searchParams: { callbackUrl: string; error: string };
}

export default function SignIn({
  searchParams: { callbackUrl, error },
}: IProps) {
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
  const email = useRef<string>();
  const password = useRef<string>();

  const handleSubmit = async () => {
    const res = await signIn("credentials", {
      email: email.current,
      password: password.current,
      redirect: true,
      callbackUrl: callbackUrl || "/",
    });
  };

  return (
    <div className="bg-dirty-white h-screen w-screen flex justify-center items-center">
      <div className="flex rounded-2xl overflow-hidden shadow-xl">
        <div className="bg-primary relative md:w-2/5">
          <div className="w-[272px] h-full relative">
            <Image
              className="object-cover"
              src={Nodes}
              alt="Nodes"
              fill
              priority={true}
            />
          </div>

          <div className="flex justify-center py-[32px] absolute bottom-0 bg-black w-full bg-opacity-50">
            <Image
              src={Logo}
              alt="Nodes"
              width={0}
              height={0}
              priority={true}
            />
          </div>
        </div>

        <div className="h-auto bg-white px-[32px] py-[24px]">
          <h1 className="text-[40px] font-semibold text-center">Sign In</h1>
          <div className="relative mt-[40px]">
            <input
              type="email"
              id="email"
              onChange={(e) => {
                email.current = e.target.value;
              }}
              className="peer input-group px-4 h-[64px] w-[448px] text-xl border border-gray rounded-lg outline-none focus:border-blue-500 transition duration-200"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="absolute left-0 px-2 transition duration-200 translate-x-3 -translate-y-[10px] bg-white text-gray
              peer-[.input-group]:peer-placeholder-shown:translate-y-[18.5px] peer-[.input-group]:peer-placeholder-shown:text-xl peer-[.input-group]:peer-placeholder-shown:px-0
              peer-[.input-group]:peer-placeholder-shown:mx-2 peer-[.input-group]:peer-focus:text-blue-500 cursor-text"
            >
              Email
            </label>
          </div>
          <div className="relative mt-[16px]">
            <input
              type="password"
              id="password"
              onChange={(e) => {
                password.current = e.target.value;
              }}
              className="peer input-group px-4 h-[64px] w-[448px] text-xl border border-gray rounded-lg outline-none focus:border-blue-500 transition duration-200"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="absolute left-0 px-2 transition duration-200 translate-x-3 -translate-y-[10px] bg-white text-gray
              peer-[.input-group]:peer-placeholder-shown:translate-y-[18.5px] peer-[.input-group]:peer-placeholder-shown:text-xl peer-[.input-group]:peer-placeholder-shown:px-0
              peer-[.input-group]:peer-placeholder-shown:mx-2 peer-[.input-group]:peer-focus:text-blue-500 cursor-text"
            >
              Password
            </label>
          </div>
          {error && (
            <div className=" mt-[16px]">
              <span className="first-letter:uppercase text-error">{error}</span>
            </div>
          )}

          <div className="mt-[16px] flex justify-between">
            <div>
              <input type="checkbox" id="show_password" />
              <label htmlFor="show_password" className="text-[16px] ml-2">
                Show Password
              </label>
            </div>
            <button className="text-primary">Forgot your password?</button>
          </div>
          <button
            onClick={handleSubmit}
            className="mt-[43px] w-full bg-primary rounded-lg text-white text-[20px] py-[15px] font-semibold hover:bg-[#000067]"
          >
            Sign In
          </button>
          <div className="relative mt-[24px]">
            <div className="border border-gray mx-[80px]"></div>
            <label className="text-[16px] text-gray bg-white px-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold">
              OR CONTINUE WITH
            </label>
          </div>
          <button
            onClick={() =>
              signIn("google", { callbackUrl: callbackUrl || "/" })
            }
            className="mt-[24px] w-full rounded-lg text-[20px] py-[15px] font-semibold border text-semi-black border-gray flex justify-center items-center gap-3"
          >
            <FcGoogle />
            Google
          </button>
          <div className="mt-[40px] flex justify-center items-center gap-3">
            <label className="text-[16px] text-semi-black">
              Don’t have an account?
            </label>
            <button
              onClick={() => setSignUpModalOpen(true)}
              className="px-[12px] py-[4px] text-primary bg-[#DADAFF] rounded-lg"
            >
              Sign Up
            </button>
          </div>
          <SignUpModal
            isOpen={isSignUpModalOpen}
            onClose={() => setSignUpModalOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}
