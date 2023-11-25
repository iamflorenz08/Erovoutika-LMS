import Sidebar from "@/components/sidebar";
import NavBar from "@/components/navBar";

interface IProps {
    children: React.ReactNode
}

export default function layout({ children }: IProps) {
    return (
        <div className="flex w-full bg-red-300 h-screen max-h-screen">
            <div className="shadow-md z-50 bg-white">
                <Sidebar />
            </div>

            <main className="w-full bg-[#F4F7FE] flex flex-col">
                <NavBar />
                <div className="h-full overflow-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
