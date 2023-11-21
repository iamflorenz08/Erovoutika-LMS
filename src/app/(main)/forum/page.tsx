'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from 'react'
import { IoMdTime } from '@react-icons/all-files/io/IoMdTime'
import { IoMdTrendingUp } from '@react-icons/all-files/io/IoMdTrendingUp'
import { RiFireLine } from '@react-icons/all-files/ri/RiFireLine'
import { FiCheckCircle } from '@react-icons/all-files/fi/FiCheckCircle'
import { IoCloseSharp } from "@react-icons/all-files/io5/IoCloseSharp";
import PostContentManagement from "@/components/postContentManagement";

interface ITopicCategory {
  label: string,
  href: string,
  icon?: any
  active: boolean
}

interface IProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

const Forum = ({ searchParams }: IProps) => {
  const [contentModal, setContentModal] = useState<boolean>(false)
  const searchParam = searchParams['topicCategory']

  const topicCategories: ITopicCategory[] = [
    {
      label: 'New',
      href: '/forum?topicCategory=new',
      icon: <IoMdTime />,
      active: searchParam === 'new' || searchParam === undefined
    },
    {
      label: 'Top',
      href: '/forum?topicCategory=top',
      icon: <IoMdTrendingUp />,
      active: searchParam === 'top'
    },
    {
      label: 'Hot',
      href: '/forum?topicCategory=hot',
      icon: <RiFireLine />,
      active: searchParam === 'hot'
    },
    {
      label: 'Closed',
      href: '/forum?topicCategory=closed',
      icon: < FiCheckCircle />,
      active: searchParam === 'closed'
    }
  ]


  return (
    <main>
      <div className="flex justify-between gap-6 px-6">
        <div className="bg-white w-full max-w-[272px]">
          dsa
        </div>

        <div className="w-full flex flex-col gap-6">
          <div className="bg-white w-full p-4 rounded-lg flex gap-6">
            <Image
              className="w-[48px] h-[48px] object-cover object-top"
              alt="profile"
              src={'/sample_user_icon.png'}
              width={48}
              height={48} />
            <input type="text"
              className="w-full rounded-lg bg-dirty-white outline-none p-3 cursor-pointer"
              placeholder="Let’s share what going on your mind..."
              onClick={() => setContentModal(true)}
              readOnly />
          </div>
          <div className="bg-white p-4 flex gap-2 rounded-lg">
            {topicCategories.map((category, index) => (
              <Link
                href={category.href}
                className={`py-1.5 px-2.5 rounded-full bg-dirty-white flex items-center gap-1.5 ${category.active && 'bg-primary-light text-white'}`}
                key={index}>
                {category.icon}
                {category.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white w-full max-w-[336px]">

        </div>
      </div>

      {contentModal && (
        <div className="absolute top-0 left-0 w-full h-full z-50 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="bg-white w-full max-w-[766px] rounded-md p-5">

            <div className="flex justify-between">
              <h1 className="text-2xl font-medium">Create a post</h1>
              <button
                onClick={() => setContentModal(false)}
                className="p-1.5 text-2xl"><IoCloseSharp /></button>
            </div>

            <input type="text" placeholder="Title" className="w-full mt-10 px-3 py-2.5 text-xl border-gray border-2 border-opacity-20 rounded-md outline-none" />

            {/* Content management */}
            <PostContentManagement className="border outline-none" />

            <button className="py-3.5 bg-primary text-white w-full rounded-md mt-5 text-xl font-medium">Post</button>
          </div>
        </div>
      )}


    </main>
  );
};

export default Forum;
