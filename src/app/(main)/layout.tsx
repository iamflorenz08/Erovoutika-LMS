'use client'
import Sidebar from "@/components/Sidebar";
import NavBar from "@/components/navBar";

interface IProps {
    children: React.ReactNode
}

export default function layout({ children }: IProps) {
    return (
        <>
            <div className="flex h-screen">
                <div className="shadow-md z-50 bg-white w-fit">
                    <Sidebar />
                </div>

                <main className="bg-[#F4F7FE] flex flex-col w-full">
                    <div className="h-fit">
                        <NavBar />
                    </div>
                    <div className="overflow-auto h-full">
                        {children}
                    </div>
                </main>
            </div>
        </>

    )
}
