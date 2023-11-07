import React, { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';

interface ForumLayoutProps {
  children: ReactNode;
}

type Props = {
    children: ReactNode
}

const ForumLayout = (props: Props) => {
    return (
        <div className="flex mx-auto w-full">
            <div>
            <Sidebar/>
            </div>
            <main className="w-full">
                {props.children}

            </main>
        </div>
    )
};

export default ForumLayout;
