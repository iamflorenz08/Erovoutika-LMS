import ParentComment from './parentComment'
import { useFormState } from 'react-dom'
import { IStatus } from '@/types/statusTypes'
import { addComment } from './action'
import { useParams } from 'next/navigation'
import useSWR from 'swr'
import { IComment } from '@/types/commentTypes'
import ReplyInputBox from './replyInputBox'
import { useEffect } from 'react'

interface IProps {
    showReply: boolean
    setShowReply: (state: boolean) => void
}

export interface ICommentStatus extends IStatus {
    artistID?: string | null,
    comment?: string | null,
    data?: IComment
}

const initialState: ICommentStatus = {
    success: false,
}

const fetcher = (url: string) => fetch(url).then(res => res.json())
export default function CommentSection({ showReply, setShowReply }: IProps) {
    const { id } = useParams()
    const [status, formAction] = useFormState(addComment, initialState)
    const { data: comments, isLoading }: { data: Array<IComment>, isLoading: boolean } = useSWR(`${process.env.NEXT_PUBLIC_API_URI}/api/v1/comments/${id}`, fetcher)

    useEffect(() => {
        if (status.success) {
            status.success = false
            setShowReply(false)
        }
    }, [status])

    if (isLoading) return 'Loading'

    return (
        <section className='bg-white shadow-md p-4 rounded-md flex flex-col gap-4'>
            {/* COMMENT CREATION */}
            <form action={formAction} className='flex flex-col gap-4'>
                <h1 className='font-medium text-xl'>Comment</h1>
                {showReply &&
                    <ReplyInputBox
                        onSuccess={(comment) => comments.push(comment)}
                        status={status} />}
                <input type="hidden" name="parentID" value={id} />
            </form>

            {/* DIVIDER */}
            <div className='w-full h-[2px] bg-gray opacity-20'></div>

            {/* COMMENTS */}
            {comments && comments.map((comment, index) => (
                <ParentComment
                    key={index}
                    comment={comment}
                />
            ))}

        </section>
    )
}
