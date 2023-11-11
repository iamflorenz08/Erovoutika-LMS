type Props = {
    children: React.ReactNode
}

const layout = (props: Props) => {
    return (
        <section className="h-full">
            {props.children}
        </section>
    )
}

export default layout