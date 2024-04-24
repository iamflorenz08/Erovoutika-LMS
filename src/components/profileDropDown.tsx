import { useRef } from "react";
import { FaUserCircle } from "@react-icons/all-files/fa/FaUserCircle";
import { FaChevronDown } from "@react-icons/all-files/fa/FaChevronDown";
import { FaRegUser } from "@react-icons/all-files/fa/FaRegUser";
import { IoSettingsOutline } from "@react-icons/all-files/io5/IoSettingsOutline";
import { HiOutlineDocumentCheck } from "@react-icons/all-files/hi2/HiOutlineDocumentCheck";
import { PiSignIn } from "@react-icons/all-files/pi/PiSignIn";
import useDropDown from "@/hooks/useDropDown";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Session } from "next-auth";
interface ProfileProps {
  data: Session | null;
}

export default function ProfileDropDown({ data }: ProfileProps) {
  const ref = useRef<any>();
  const [toggle, setToggle] = useDropDown(false, ref);
  return (
    <div className="relative">
      <button
        onClick={() => setToggle(true)}
        className="flex items-center gap-5"
      >
        <FaUserCircle className="text-3xl text-gray" />
        <div className="hidden md:flex  items-center flex-col">
          <h1 className="text-sm font-bold capitalize">
            {data?.user.fullName.first.toLowerCase()}{" "}
            {data?.user.fullName.last.toLowerCase()}
          </h1>
          <span className="text-xs capitalize">
            {data?.user.role ?? "learner"}
          </span>
        </div>
        <FaChevronDown className="hidden md:block text-2xl text-gray " />
      </button>

      {toggle && (
        <div
          ref={ref}
          className="absolute right-0 bg-white w-[272px] p-4 flex flex-col gap-2 rounded-lg mt-3 shadow-md z-50"
        >
          <h1>
            Points Balance: <span className="font-semibold">N/A</span>
          </h1>
          <div className="border border-gray border-opacity-10"></div>
          <div className="flex flex-col">
            <Link
              onClick={() => setToggle(false)}
              href={"/profile/" + data?.user._id}
              className="px-2 py-3 text-left flex items-center gap-2 font-medium hover:bg-[#E9F5FD] rounded-lg duration-300"
            >
              <FaRegUser size={24} />
              Profile
            </Link>
            <Link
              onClick={() => setToggle(false)}
              href={"/verify-certificate"}
              className="px-2 py-3 text-left flex items-center gap-2 font-medium hover:bg-[#E9F5FD] rounded-lg duration-300"
            >
              <HiOutlineDocumentCheck size={24} />
              Verify certificate
            </Link>
            <Link
              onClick={() => setToggle(false)}
              href={"/settings/edit-profile"}
              className="px-2 py-3 text-left flex items-center gap-2 font-medium hover:bg-[#E9F5FD] rounded-lg duration-300"
            >
              <IoSettingsOutline size={24} />
              Settings
            </Link>
          </div>
          <div className="border border-gray border-opacity-10"></div>
          <button
            onClick={() => signOut()}
            className="px-2 py-3 text-left flex items-center gap-2 font-medium hover:bg-[#E9F5FD] rounded-lg duration-300"
          >
            <PiSignIn size={24} />
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}
