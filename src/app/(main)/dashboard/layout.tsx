import { ReactNode } from "react";
import NavBar from "./navBar";

type Props = {
    children: ReactNode
}

const layout = (props: Props) => {
    return (
        <section className="h-full">
            {props.children}
        </section>
    )
}

export default layout