type Props = {
    children: React.ReactNode
}

const ForumLayout = ({ children }: Props) => {
    return (
        <section >
            {children}
        </section>
    )
};

export default ForumLayout;
