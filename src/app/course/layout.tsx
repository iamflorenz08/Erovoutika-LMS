import { ReactNode } from "react";
import Sidebar from '@/components/Sidebar';

interface CourseLayoutProps {
    children: ReactNode;
}

type Props = {
    children: ReactNode
}

const CourseLayout = (props: Props) => {
    return (
        <div className="flex mx-auto w-full">
            <div>
                <Sidebar />
            </div>
            <main className="w-full">
                {props.children}
            </main>
        </div>
    )
}

export default CourseLayout