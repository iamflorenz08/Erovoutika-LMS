'use client'
import { useState } from "react";
import { IoCloseSharp } from "@react-icons/all-files/io5/IoCloseSharp";
import Image from "next/image"
import PostContentManagement from "@/components/postContentManagement";
import Rewards from "./rewards";
import Tags from "./tags";

interface IPost {
    title: string,
    content: string,
    tags?: Array<string>,
    rewards: number
}


export default function ContentModal() {
    const [contentModal, setContentModal] = useState<boolean>(false)
    const [post, setPost] = useState<IPost>({
        title: '',
        content: '',
        tags: [],
        rewards: 0
    })

    const handleContentChange = (contentMessage: string) => {
        const cleanContentMessage = contentMessage === '<p></p>' ? '' : contentMessage
        setPost(value => ({ ...value, content: cleanContentMessage }))
    }

    return (
        <>
            <div className="bg-white w-full p-4 rounded-lg flex gap-6 shadow-md">
                <Image
                    className="w-[48px] h-[48px] object-cover object-top"
                    alt="profile"
                    src={'/sample_user_icon.png'}
                    width={48}
                    height={48} />
                <input type="text"
                    className="w-full rounded-lg bg-dirty-white outline-none p-3 cursor-pointer"
                    placeholder="Let’s share what going on your mind..."
                    value={post.title}
                    onClick={() => setContentModal(true)}
                    readOnly />
            </div>

            {
                contentModal && (
                    <div className="absolute top-0 left-0 w-full h-full z-50 bg-black bg-opacity-80 flex items-center justify-center">
                        <div className="bg-white w-full max-w-[766px] rounded-md p-5">

                            <div className="flex justify-between">
                                <h1 className="text-2xl font-medium">Create a post</h1>
                                <button
                                    onClick={() => setContentModal(false)}
                                    className="p-1.5 text-2xl"><IoCloseSharp /></button>
                            </div>

                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Title"
                                onChange={(e) => setPost(value => ({ ...value, title: e.target.value }))}
                                value={post.title}
                                className="w-full mt-10 px-3 py-2.5 text-xl border-gray border-2 border-opacity-20 rounded-md outline-none" />

                            {/* Content management */}
                            <PostContentManagement
                                onUpdate={handleContentChange} />

                            {/* Tags selection */}
                            <Tags
                                onUpdate={(tags) => setPost({ ...post, tags })}
                            />

                            {/* Rewards selection */}
                            <Rewards
                                value={post.rewards}
                                setRewardValue={(rewardValue) => setPost(value => ({ ...value, rewards: rewardValue }))} />

                            <button className="py-3.5 bg-primary text-white w-full rounded-md mt-5 text-xl font-medium">Post</button>
                        </div>
                    </div>
                )
            }
        </>
    )
}
