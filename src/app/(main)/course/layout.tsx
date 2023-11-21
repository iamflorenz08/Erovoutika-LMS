import { ReactNode } from "react";
import Sidebar from '@/components/sidebar';

interface CourseLayoutProps {
    children: ReactNode;
}

type Props = {
    children: ReactNode
}

const CourseLayout = (props: Props) => {
    return (
        <section>
            {props.children}
        </section>
    )
}

export default CourseLayout