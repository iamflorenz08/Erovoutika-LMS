import { ReactNode } from "react";

interface CourseLayoutProps {
    children: ReactNode;
}


const CourseLayout = ({ children }: CourseLayoutProps) => {
    return (
        <section>
            {children}
        </section>
    )
}

export default CourseLayout