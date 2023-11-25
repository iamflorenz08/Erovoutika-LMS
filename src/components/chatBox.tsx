import React, { useState } from 'react';
import { AiOutlineClose } from '@react-icons/all-files/ai/AiOutlineClose';
import { BiMessageRoundedAdd } from '@react-icons/all-files/bi/BiMessageRoundedAdd';
import { BiImageAlt } from '@react-icons/all-files/bi/BiImageAlt';
import { IoSend } from '@react-icons/all-files/io5/IoSend';
import { BsPlusCircleFill } from '@react-icons/all-files/bs/BsPlusCircleFill';

const StartChatButton = () => (
  <button
    type="submit"
    className="text-white bg-primary hover:bg-[#000067] absolute right-2 py-2 px-4 rounded-lg border text-sm top-1/2 -translate-y-1/2">
    Start Chat
  </button>
);

interface UserChatProps {
  imageUrl: string;
  name: string;
  message: string;
  onClick?: (name: string, imageUrl: string, message: string) => void;
}

const UserChat = ({ imageUrl, name, message, onClick }: UserChatProps) => (
  <div className="flex items-center" onClick={() => onClick && onClick(name, imageUrl, message)}>
    <img src={imageUrl} alt="User Avatar" className="rounded-full w-12 h-12 object-cover m-4" />
    <div className="relative">
      <h1 className="hidden md:block text-sm font-bold mr-4">{name}</h1>
      <span className="hidden md:block text-xs">
        {message.length > 20 ? `${message.substring(0, 20)}...` : message}
      </span>
    </div>
  </div>
);

interface MessageProps {
  imageUrl: string;
  name: string;
  message: string;
  onClick?: (name: string, imageUrl: string, message: string) => void;
}

const Message = ({ imageUrl, name, message, onClick }: MessageProps) => (
  <div className="flex items-center" onClick={() => onClick && onClick(name, imageUrl, message)}>
    <img src={imageUrl} alt="User Avatar" className="rounded-full w-12 h-12 object-cover m-4" />
    <div className="relative flex-grow">
      <h1 className="text-sm font-bold mb-1">{name}</h1>
      <span className="md:block text-xs break-words">{message}</span>
    </div>
  </div>
);

interface ChatInputProps {
  name: string;
}

const ChatInput = ({ name, selectedUser }: ChatInputProps & { selectedUser?: UserChatProps | null }) => (
  <>
    <div className="grid grid-cols-2 border-b p-2 border-slate-300 items-end bg-white">
      <h1 className="font-bold text-[16px]">{name}</h1>
    </div>

    <div className="flex flex-grow flex-row items-end bg-white">
      {selectedUser && <Message imageUrl={selectedUser.imageUrl} name={selectedUser.name} message={selectedUser.message} />}
    </div>

    <div className="flex flex-row items-end p-4 text-gray bg-white">
      <div className="flex pb-2">
        <BiImageAlt size={25} />
      </div>

      <input
        type="text"
        placeholder="Message"
        className="border border-slate-300 p-2 w-full ml-6 mr-6 rounded-lg bg-[#EAEDEF]"
      />

      <div className="flex justify-end text-[#0066FF] pb-2">
        <IoSend size={25} />
      </div>
    </div>
  </>
);

interface ChatBoxProps {
  onClose: () => void;
}

const ChatBox = ({ onClose }: ChatBoxProps) => {
  const [showNewChat, setNewChat] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserChatProps | null>(null);

  const toggleNewChat = () => {
    if (!showNewChat) {
      setNewChat(true);
      setSelectedUser(null);
    }
  };

  const clickChat = (name: string, imageUrl: string, message: string) => {
    setNewChat(false);
    setSelectedUser({ name, imageUrl, message });
  };

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

        <UserChat
          imageUrl={
            "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
          name="Xyeeva"
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur consequat orci massa, ut sagittis quam imperdiet in. Donec porttitor nisi
           enim, eget sodales odio porttitor vel. Sed vel mi pellentesque, euismod enim nec, dignissim mauris. Mauris nec pellentesque velit, sed luctus libero.
            Sed eu tempor lorem. Fusce nisi neque, facilisis sit amet blandit ac"
          onClick={(name, imageUrl, message) => clickChat(name, imageUrl, message)}
        />

        <UserChat
          imageUrl={
            "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          name="Joe"
          message="Good Morning, kindly send me your recent report?"
          onClick={(name, imageUrl, message) => clickChat(name, imageUrl, message)}
        />

        <div className="text-primary flex items-center m-4 lg:hidden md:hidden">
          <BsPlusCircleFill size={45} onClick={toggleNewChat} />
        </div>
      </div>

      <div className="flex-grow flex flex-col w-full md:w-[330px] bg-[#EAEDEF]">
        {showNewChat ? (
          <>
            <div className="grid grid-cols-2 border-b p-2 border-slate-300 items-center bg-white">
              <h1 className="font-bold text-[18px]">New Chat</h1>
            </div>

            <div className="relative mt-[30px] m-4">
              <input
                type="text"
                className="bg-white py-4 px-4 outline-none w-full rounded-lg border"
                placeholder="Type username"
              />
              <StartChatButton />
            </div>
          </>
        ) : (
          <>
            <ChatInput name={selectedUser?.name || ""} selectedUser={selectedUser} />
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
