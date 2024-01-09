import { IUser } from '@/types/userTypes'
import { BiImageAlt } from '@react-icons/all-files/bi/BiImageAlt'
import { IoSend } from '@react-icons/all-files/io5/IoSend'
import React, { useCallback, useEffect, useState } from 'react'
import Message from './message'
import { IChatRoom, IMessage } from '@/types/chatTypes'
import SocketIO from '@/utils/socketIo'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'

interface IProps {
    receiver: IUser,
    chatRoom: IChatRoom | undefined
}

const fetcher = async (url: string | any, accessToken: string | any) => fetch(url, {
    headers: {
        'authorization': 'Bearer ' + accessToken
    }
})
    .then(res => res.json())


export default function Conversation({ receiver, chatRoom }: IProps) {
    const { data } = useSession()
    const [messages, setMessages] = useState<Array<IMessage>>([])
    const [message, setMessage] = useState<string>('')
    const { data: fetchedMessages, isLoading }: { data: Array<IMessage>, isLoading: boolean } =
        useSWR(
            [
                chatRoom ? `${process.env.NEXT_PUBLIC_API_URI}/api/v1/chats/${chatRoom._id}` : null,
                data?.user.tokens.accessToken
            ],
            args => fetcher(args[0], args[1])
        )

    const send = useCallback(
        () => {
            if (!message.trim()) return

            const newMessage: IMessage = {
                chatId: chatRoom?._id,
                content: message,
                sender: data?.user._id
            }
            setMessages([...messages, { ...newMessage, sender: data?.user }])
            SocketIO.emit('sendMessage', newMessage)
            setMessage('')
        },
        [message],
    )

    useEffect(() => {
        if (!SocketIO.connected) return
        SocketIO.on('receiveMessage', async (data: IMessage) => {
            if (chatRoom?._id !== data.chatId) return
            setMessages(curr => [...curr, data])
        })
        return () => {
            SocketIO.off('receiveMessage')
        }
    }, [chatRoom])

    useEffect(() => {
        fetchedMessages && setMessages(fetchedMessages)
    }, [fetchedMessages])

    return (
        <>
            <div className="grid grid-cols-2 border-b p-2 border-slate-300 items-end bg-white">
                <h1 className="font-bold text-[16px] capitalize">{receiver.fullName.first} {receiver.fullName.last}</h1>
            </div>

            <div className="flex flex-grow-0 flex-col-reverse bg-white overflow-y-auto">
                <div>
                    {isLoading ? 'Loading' : messages.map((message, index) => (
                        <Message
                            key={index}
                            imageUrl={'/sample_user_icon.png'}
                            name={message.sender.fullName.first}
                            message={message.content} />
                    ))}
                </div>
            </div>

            <div className="flex flex-row items-end p-4 text-gray bg-white">
                <div className="flex pb-2">
                    <BiImageAlt size={25} />
                </div>

                <input
                    type="text"
                    placeholder="Message"
                    onKeyDown={(e) => {
                        if (e.code !== 'Enter') return
                        send()
                    }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border border-slate-300 p-2 w-full ml-6 mr-6 rounded-lg bg-[#EAEDEF]"
                />

                <button
                    onClick={() => send()}
                    className="flex justify-end text-[#0066FF] pb-2">
                    <IoSend size={25} />
                </button>
            </div>
        </>
    )
}
