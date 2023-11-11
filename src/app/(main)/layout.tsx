import Sidebar from "@/components/Sidebar";
import NavBar from "./dashboard/navBar";

interface IProps {
    children: React.ReactNode
}

export default function layout({ children }: IProps) {
    return (
        <div className="flex w-full min-h-screen">
            <div className="shadow-md z-50">
                <Sidebar />
            </div>
            <main className="w-full bg-[#F4F7FE] flex flex-col">
                <NavBar />
                {children}
            </main>
        </div>
    )
}
