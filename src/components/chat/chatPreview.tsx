import { IChatRoom } from '@/types/chatTypes'
import { IUser } from '@/types/userTypes'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
interface IProps {
    chatRoom: IChatRoom,
    selectedUser: IUser,
    onClick: (user: string) => void
}
export default function ChatPreview({ onClick, chatRoom, selectedUser }: IProps) {
    const { data } = useSession()
    let receiver: any;
    chatRoom.participants.every((participant: IUser | any) => {
        if (participant._id !== data?.user._id) {
            receiver = participant
            return false
        }
        return true
    })

    if(!receiver) return null
    return (
        <button
            className={`flex items-center gap-2 w-full p-2  ${selectedUser && selectedUser._id === receiver._id && 'bg-primary-light bg-opacity-10'}`}
            onClick={() => onClick(receiver)}>
            <Image className="rounded-full w-12 h-12 object-cover" src={'/sample_user_icon.png'} alt='icon' height={48} width={48} />
            <div className="flex flex-col text-left w-32">
                <h1 className="text-sm font-bold">{receiver.fullName.first}</h1>
                <span className="text-xs line-clamp-1">
                    {chatRoom.lastMessage}
                </span>
            </div>
        </button>
    )
}
