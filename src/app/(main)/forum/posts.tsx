'use client'
import Image from "next/image";
import { BiDotsVerticalRounded } from '@react-icons/all-files/bi/BiDotsVerticalRounded'
import { IoEyeOutline } from '@react-icons/all-files/io5/IoEyeOutline'
import { FiMessageSquare } from '@react-icons/all-files/fi/FiMessageSquare'
import { PiArrowsDownUp } from '@react-icons/all-files/pi/PiArrowsDownUp'
import TagBox from "@/components/tagBox";
import Link from "next/link";
import { IPost } from "@/types/postTypes";

interface IProps {
    posts: Array<IPost>
}

export default function Posts({ posts }: IProps) {
    return (
        <div className="flex flex-col gap-2">
            {posts.map((post, index) => (
                <Link key={index} href={'/forum/' + post._id} className="bg-white w-full flex flex-col gap-4 p-4 rounded-lg shadow-md">
                    {/* POST HEADER */}
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4">
                            <Image className="w-12 h-12 object-cover" src={'/sample_user_icon.png'} alt="user_icon" width={48} height={48} />
                            <div>
                                <h1 className="font-medium">{post.author?.fullName.first} {post.author?.fullName.last}</h1>
                                <span className="text-gray text-sm">5 min ago</span>
                            </div>
                        </div>

                        <div className="flex gap-4 items-center">
                            {post.rewards > 0 && (
                                <span className="bg-reward text-white px-2.5 py-1.5 rounded-[20px]">Available Reward</span>
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
                    <div className="line-clamp-3" dangerouslySetInnerHTML={{ __html: post.contentMessage }}>

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
                            <span className="flex gap-1 items-center"><IoEyeOutline size={24} />125</span>
                            <span className="flex gap-1 items-center"><FiMessageSquare size={24} />{post.commentCount}</span>
                            <span className="flex gap-1 items-center"><PiArrowsDownUp size={24} />155</span>
                        </div>
                    </div>

                </Link>
            ))}
        </div  >
    )
}
