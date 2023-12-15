import PostContentManagement from '@/components/postContentManagement'
import React, { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { ICommentStatus } from './commentSection'
import { signIn, useSession } from 'next-auth/react'
import { IComment } from '@/types/commentTypes'

interface IProps {
    status: ICommentStatus,
    onSuccess: (comment: IComment) => void,
    onCancel?: () => void,
}

export default function ReplyInputBox({ status, onSuccess, onCancel: cancel }: IProps) {
    const { status: sessionStatus } = useSession()
    const { pending } = useFormStatus()
    const [comment, setComment] = useState<string>('')

    useEffect(() => {
        if (status.success && status.data && sessionStatus === 'authenticated') {
            onSuccess(status.data)
        }
    }, [status])

    if (sessionStatus === 'loading') return 'Loading'
    else if (sessionStatus === 'unauthenticated') {
        signIn()
        return
    }
    return (
        <>
            <PostContentManagement
                onUpdate={(content) => setComment(content)}
                className='!h-[232px]' />
            <input type="hidden" name="comment" value={comment} />
            <div className='w-full flex justify-end gap-4'>
                {cancel && (
                    <button
                        onClick={() => cancel()}
                        className='py-4 px-8 text-primary font-medium w-fit'
                    >Cancel
                    </button>
                )}

                <button
                    disabled={pending}
                    type='submit'
                    className='py-4 px-8 bg-primary text-white rounded-md font-medium w-fit'>
                    Comment
                </button>
            </div>
        </>
    )
}
