'use client'
import Image from "next/image";
import { BiDotsVerticalRounded } from '@react-icons/all-files/bi/BiDotsVerticalRounded'
import { IoEyeOutline } from '@react-icons/all-files/io5/IoEyeOutline'
import { FiMessageSquare } from '@react-icons/all-files/fi/FiMessageSquare'
import { PiArrowsDownUp } from '@react-icons/all-files/pi/PiArrowsDownUp'
import TagBox from "@/components/tagBox";
import Link from "next/link";

export default function Posts() {
    return (
        <div className="flex flex-col gap-2">
            {[1, 2, 34, 23, 32, 32, 32,].map(value => (
                <Link href={'/forum/123'} className="bg-white w-full flex flex-col gap-4 p-4 rounded-lg shadow-md">
                    {/* POST HEADER */}
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4">
                            <Image className="w-12 h-12 object-cover" src={'/sample_user_icon.png'} alt="user_icon" width={48} height={48} />
                            <div>
                                <h1 className="font-medium">XYeeva</h1>
                                <span className="text-gray text-sm">5 min ago</span>
                            </div>
                        </div>

                        <div className="flex gap-4 items-center">
                            <span className="bg-reward text-white px-2.5 py-1.5 rounded-[20px]">Available Reward</span>
                            <button
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()

                                }}
                                className="text-gray text-3xl"><BiDotsVerticalRounded /></button>
                        </div>
                    </div>

                    {/* TITLE */}
                    <h1 className="text-xl font-bold">Give your opinion about this</h1>

                    {/* BODY */}
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat aliquet maecenas ut sit Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat aliquet maecenas ut sit nullanulla
                    </div>

                    {/* POST FOOTER */}
                    <div className="flex flex-wrap gap-4 justify-between items-center">
                        <div className="flex gap-2.5">
                            <TagBox
                                label="GoLang"
                            />
                            <TagBox
                                label="Linux"
                            />
                            <TagBox
                                label="Overflow"
                            />
                        </div>

                        <div className="flex gap-4 text-gray">
                            <span className="flex gap-1 items-center"><IoEyeOutline size={24} />125</span>
                            <span className="flex gap-1 items-center"><FiMessageSquare size={24} />15</span>
                            <span className="flex gap-1 items-center"><PiArrowsDownUp size={24} />155</span>
                        </div>
                    </div>

                </Link>
            ))}
        </div  >
    )
}
