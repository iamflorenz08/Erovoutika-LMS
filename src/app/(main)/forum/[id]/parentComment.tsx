import { PiArrowFatUpLight } from '@react-icons/all-files/pi/PiArrowFatUpLight'
import { PiArrowFatDownLight } from '@react-icons/all-files/pi/PiArrowFatDownLight'
import { LuReply } from '@react-icons/all-files/lu/LuReply'
import { BiDotsVerticalRounded } from '@react-icons/all-files/bi/BiDotsVerticalRounded'
import Image from 'next/image'
import ChildComment from './childComment'
import { IComment } from '@/types/commentTypes'
import { useEffect, useState } from 'react'
import ReplyInputBox from './replyInputBox'
import { useFormState } from 'react-dom'
import { addComment } from './action'
import { ICommentStatus } from './commentSection'
import useSWR from 'swr'

interface IProps {
    comment: IComment
}

const initialState: ICommentStatus = {
    success: false
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function ParentComment({ comment }: IProps) {
    const [status, formAction] = useFormState(addComment, initialState)
    const [createComment, setCreateComment] = useState<boolean>(false)
    const { data: comments, isLoading }: { data: Array<IComment>, isLoading: boolean } = useSWR(`${process.env.NEXT_PUBLIC_API_URI}/api/v1/comments/${comment._id}`, fetcher)

    useEffect(() => {
        if (status.success) {
            status.success = false
            setCreateComment(false)
        }
    }, [status])

    return (
        <div className="w-full flex flex-col gap-4 p-4">
            {/* POST HEADER */}
            <div className="flex justify-between items-center">
                <div className="flex gap-4">
                    <Image className="w-12 h-12 object-cover" src={'/sample_user_icon.png'} alt="user_icon" width={48} height={48} />
                    <div>
                        <h1 className="font-medium">{comment.author?.fullName.first} {comment.author?.fullName.last}</h1>
                        <span className="text-gray text-sm">5 min ago</span>
                    </div>
                </div>
                <span className="bg-green-700 text-white px-2.5 py-1.5 rounded-[20px] font-semibold">Top Answer</span>
            </div>

            {/* BODY */}
            <div dangerouslySetInnerHTML={{ __html: comment.comment }}>

            </div>

            {/* POST FOOTER */}
            <div className="flex flex-wrap gap-4 justify-end items-center w-full">
                <div className="flex gap-4 text-gray">
                    <button className="text-gray"><BiDotsVerticalRounded size={24} /></button>
                    <button
                        onClick={() => setCreateComment(value => !value)}
                        className="flex gap-2 items-center">
                        <LuReply size={24} />Reply
                    </button>
                    <span className="flex gap-2 items-center">
                        <PiArrowFatUpLight size={24} />
                        155
                        <PiArrowFatDownLight size={24} />
                    </span>
                </div>
            </div>

            {/* CHILD COMMENT */}

            {comments && comments.map((comment, index) => (
                <ChildComment
                    key={index}
                    comment={comment}
                    onClickReply={() => setCreateComment(value => !value)}
                />
            ))}


            <form action={formAction} className='flex flex-col gap-4 pl-4 border-l-2 border-gray border-opacity-20'>
                {createComment && (
                    <ReplyInputBox
                        status={status}
                        onSuccess={(comment) => comments.push(comment)}
                        onCancel={() => setCreateComment(false)}
                    />
                )}
                <input type="hidden" name="parentID" value={comment._id} />
            </form>
        </div>
    )
}
