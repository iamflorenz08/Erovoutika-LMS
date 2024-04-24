import Sidebar from "@/components/Sidebar";
import NavBar from "@/components/navBar";
import InterestsModal from "./interestsModal";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import CartSidebar from "./_cartSidebar/cartSidebar";
import Socket from "./socket";

interface IProps {
  children: React.ReactNode;
}

export default async function layout({ children }: IProps) {
  return (
    <>
      <InterestsModal />
      <Socket />
      <div className="flex h-screen">
        <div className="shadow-md z-50 bg-white w-fit">
          <Sidebar />
        </div>

        <main className="bg-[#F4F7FE] flex flex-col w-full">
          <div className="h-fit">
            <NavBar />
          </div>
          <div className="overflow-auto h-full">{children}</div>
        </main>
      </div>
      <CartSidebar />
    </>
  );
}
