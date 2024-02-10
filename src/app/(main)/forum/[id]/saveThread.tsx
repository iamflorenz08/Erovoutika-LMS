'use client'
import { useParams } from "next/navigation"
import { useOptimistic, useState } from "react"
import { saveDeleteThread } from "./action"
import { signIn, useSession } from "next-auth/react"

interface IProps {
    saveState: boolean
}

export default function SaveThread({ saveState }: IProps) {
    const { status } = useSession()
    const params: { id: string } = useParams()
    const [isSaved, setIsSaved] = useOptimistic(
        saveState,
        (state: boolean, newState: boolean) => newState
    )
    const [btnName, setbBtnName] = useState('Saved')
    return (
        <form action={async () => {
            if (status === 'unauthenticated') {
                signIn()
                return
            }
            else if (status === 'loading') {
                return
            }

            setIsSaved(!isSaved)
            await saveDeleteThread(!isSaved, params.id)
        }}>
            <button
                onMouseOver={() => setbBtnName('Unsave thread')}
                onMouseLeave={() => setbBtnName('Saved')}
                className={`w-full py-2 rounded-[20px] font-semibold mt-4 ${isSaved ? 'border border-primary text-primary' : 'bg-primary text-white '}`}>
                {isSaved ? btnName : 'Save thread'}
            </button>
        </form>
    )
}
