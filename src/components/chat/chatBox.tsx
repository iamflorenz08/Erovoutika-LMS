import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from '@react-icons/all-files/ai/AiOutlineClose';
import { BiMessageRoundedAdd } from '@react-icons/all-files/bi/BiMessageRoundedAdd';
import SearchNewChat from './searchNewChat';
import { IUser } from '@/types/next-auth';
import Conversation from './conversation';
import { useSession } from 'next-auth/react';
import { IChatRoom } from '@/types/chatTypes';
import useSWR, { SWRConfig } from 'swr';
import ChatPreview from './chatPreview';
import SocketIO from '@/utils/socketIo';


interface ChatBoxProps {
  onClose: () => void;
}

const fetcher = async (url: string, accessToken: string | any) => fetch(url, {
  headers: {
    'authorization': 'Bearer ' + accessToken
  }
})
  .then(res => res.json())



const ChatBox = ({ onClose }: ChatBoxProps) => {
  const { data } = useSession()
  const { data: fetchChatRooms, isLoading }:
    { data: Array<IChatRoom>, isLoading: boolean } =
    useSWR([`${process.env.NEXT_PUBLIC_API_URI}/api/v1/chats/rooms`, data?.user.tokens.accessToken], args => fetcher(args[0], args[1]))
  const [chatRooms, setChatRooms] = useState<Array<IChatRoom>>([])
  const [chatRoom, setChatRoom] = useState<IChatRoom>()
  const [showNewChat, setNewChat] = useState(true);
  const [selectedUser, setSelectedUser] = useState<IUser | any>();

  const toggleNewChat = () => {
    if (!showNewChat) {
      setNewChat(true);
      setSelectedUser(null);
    }
  };

  useEffect(() => {
    if (selectedUser) {
      fetch(`${process.env.NEXT_PUBLIC_API_URI}/api/v1/chats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          senderId: data?.user._id,
          receiverId: selectedUser._id,
        })
      })
        .then(res => res.json())
        .then(data => setChatRoom(data))
    }
  }, [selectedUser])

  useEffect(() => {
    SocketIO.on('updateChatRoom', async (data: IChatRoom) => {
      const indexToUpdate = await chatRooms.findIndex(chatRoom => chatRoom._id === data._id)
      if (indexToUpdate !== -1) {
        chatRooms[indexToUpdate] = data
      }
      else {
        chatRooms.push(data)
      }

      chatRooms.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      setChatRooms([...chatRooms])
    })
    return () => {
      SocketIO.off('updateChatRoom')
    }
  }, [chatRooms])

  useEffect(() => {
    setChatRooms(fetchChatRooms)
  }, [fetchChatRooms])

  return (
    <div
      className={`fixed bottom-0 right-6 w-full md:w-[490px] lg:w-[600px] xl:w-[650px] ${window.innerWidth < 768 ? "h-[440px]" : "h-[436px]"
        } bg-white border border-slate-300 rounded-lg flex flex-row`}
    >
      <div className="flex-grow border-r border-slate-300">
        <div className="grid grid-cols-2 border-b p-4 border-slate-300 items-center">
          <h1 className="font-bold text-[20px]">Chats</h1>
          <div className="justify-end hidden md:flex">
            <BiMessageRoundedAdd size={23} onClick={toggleNewChat} />
          </div>
        </div>

        {chatRooms && chatRooms.map((chatRoom, index) => (
          <ChatPreview
            key={index}
            selectedUser={selectedUser}
            chatRoom={chatRoom}
            onClick={(user) => {
              setNewChat(false)
              setSelectedUser(user)
            }}
          />
        ))}

      </div>

      <div className="flex-grow flex flex-col w-full md:w-[330px] bg-[#EAEDEF]">
        {showNewChat ? (
          <>
            <SearchNewChat
              selectedUser={(user) => {
                setNewChat(false)
                setSelectedUser(user)
              }}
            />
          </>
        ) : (
          <>
            <Conversation
              chatRoom={chatRoom}
              receiver={selectedUser}
            />
          </>
        )}

        <button onClick={onClose} className="absolute top-0 right-0 p-2">
          <AiOutlineClose size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
