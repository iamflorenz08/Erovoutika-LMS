'use client'
import TagBox from '@/components/tagBox'
import { LuReply } from '@react-icons/all-files/lu/LuReply'
import { useState } from 'react'
import CommentSection from './commentSection'
import { IPost } from '@/types/postTypes'
import timeAgo from '@/utils/timeAgo'
import UpdownVote from './updownVote'
import AvailableRewards from '@/components/availableRewards'

interface IProps {
    post: IPost
}

export default function MainThread({ post }: IProps) {
    const [showReply, setShowReply] = useState<boolean>(false)

    return (
        <div className="w-full flex flex-col gap-4 mb-9">
            <div className="bg-white w-full flex flex-col gap-4 p-4 rounded-lg shadow-md">
                {/* POST HEADER */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold">{post.title}</h1>
                        <span className="text-gray text-sm">{timeAgo(new Date(post.createdAt))}</span>
                    </div>

                    {post.rewards > 0 && (
                        <AvailableRewards
                            rewards={post.rewards}
                        />
                    )}

                </div>

                {/* BODY */}
                <div dangerouslySetInnerHTML={{ __html: post.contentMessage }}>
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
                        <button
                            onClick={() => setShowReply(value => !value)}
                            className="flex gap-2 items-center">
                            <LuReply size={24} />Reply
                        </button>
                        <UpdownVote
                            voteType={post.vote.type}
                            voteCount={post.updownVoteCount}
                        />
                    </div>
                </div>

            </div>

            {/* COMMENT SECTION */}
            <CommentSection
                setShowReply={(state) => setShowReply(state)}
                showReply={showReply}
            />
        </div>
    )
}
