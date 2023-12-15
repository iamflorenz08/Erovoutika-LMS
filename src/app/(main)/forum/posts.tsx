'use client'
import Image from "next/image";
import { BiDotsVerticalRounded } from '@react-icons/all-files/bi/BiDotsVerticalRounded'
import { IoEyeOutline } from '@react-icons/all-files/io5/IoEyeOutline'
import { FiMessageSquare } from '@react-icons/all-files/fi/FiMessageSquare'
import { PiArrowsDownUp } from '@react-icons/all-files/pi/PiArrowsDownUp'
import TagBox from "@/components/tagBox";
import Link from "next/link";
import { IPost } from "@/types/postTypes";
import { useSession } from "next-auth/react";
import { useCallback } from "react";
import timeAgo from "@/utils/timeAgo";
import AvailableRewards from "@/components/availableRewards";
import { useRouter } from "next/navigation";

interface IProps {
    posts: Array<IPost>
}

export default function Posts({ posts }: IProps) {
    const router = useRouter()
    const { data, status } = useSession()
    

    return (
        <div className="flex flex-col gap-2">
            {posts.map((post, index) => (
                <div
                    key={index}
                    className="bg-white w-full flex flex-col gap-4 p-4 rounded-lg shadow-md relative">
                    <Link href={'/forum/' + post._id} className="absolute inset-0" />

                    {/* POST HEADER */}
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4 z-10">
                            <Link
                                href={'/profile/' + post.author?._id}
                            >
                                <Image className="w-12 h-12 object-cover" src={'/sample_user_icon.png'} alt="user_icon" width={48} height={48} />
                            </Link>
                            <div className="flex flex-col">
                                <Link
                                    className="font-medium hover:text-primary-light duration-200"
                                    href={'/profile/' + post.author?._id} >
                                    {post.author?.fullName.first} {post.author?.fullName.last}
                                </Link>
                                <span className="text-gray text-sm">{timeAgo(new Date(post.createdAt))}</span>
                            </div>
                        </div>

                        <div className="flex gap-4 items-center">
                            {post.rewards > 0 && (
                                <AvailableRewards
                                    rewards={post.rewards}
                                />
                            )}
                            <button
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                }}
                                className="text-gray text-3xl"><BiDotsVerticalRounded /></button>
                        </div>
                    </div>

                    {/* TITLE */}
                    <h1 className="text-xl font-bold">{post.title}</h1>

                    {/* BODY */}
                    <div className="line-clamp-3 w-96" dangerouslySetInnerHTML={{ __html: post.contentMessage }}>

                    </div>

                    {/* POST FOOTER */}
                    <div className="flex flex-wrap gap-4 justify-between items-center">
                        <div className="flex gap-2.5">
                            {post.tags.map((tag, index) => (
                                <TagBox
                                    key={index}
                                    label={tag}
                                />
                            ))}

                        </div>

                        <div className="flex gap-4 text-gray">
                            <span className="flex gap-1 items-center"><IoEyeOutline size={24} />{post.viewCount}</span>
                            <span className="flex gap-1 items-center"><FiMessageSquare size={24} />{post.commentCount}</span>
                            <span className="flex gap-1 items-center"><PiArrowsDownUp size={24} />{post.updownVoteCount}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div  >
    )
}
