import Image from "next/image";
import { PiArrowFatUpLight } from "@react-icons/all-files/pi/PiArrowFatUpLight";
import { PiArrowFatDownLight } from "@react-icons/all-files/pi/PiArrowFatDownLight";
import { LuReply } from "@react-icons/all-files/lu/LuReply";
import { BiDotsVerticalRounded } from "@react-icons/all-files/bi/BiDotsVerticalRounded";
import { IComment } from "@/types/commentTypes";

interface IProps {
  comment: IComment;
  onClickReply: () => void;
}
export default function ChildComment({ comment, onClickReply }: IProps) {
  return (
    <div className="w-full flex flex-col gap-4 py-4 pl-4 border-l-2 border-gray border-opacity-20">
      {/* POST HEADER */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <Image
            className="w-12 h-12 object-cover"
            src={"/sample_user_icon.png"}
            alt="user_icon"
            width={48}
            height={48}
          />
          <div>
            <h1 className="font-medium">
              {comment.author?.fullName.first} {comment.author?.fullName.last}
            </h1>
            <span className="text-gray text-sm">5 min ago</span>
          </div>
        </div>
        {/* <span className="bg-green-700 text-white px-2.5 py-1.5 rounded-[20px] font-semibold">Top Answer</span> */}
      </div>

      {/* BODY */}
      <div dangerouslySetInnerHTML={{ __html: comment.comment }}></div>

      {/* POST FOOTER */}
      <div className="flex flex-wrap gap-4 justify-end items-center w-full">
        <div className="flex gap-4 text-gray">
          <button className="text-gray">
            <BiDotsVerticalRounded size={24} />
          </button>
          <button
            onClick={() => onClickReply()}
            className="flex gap-2 items-center"
          >
            <LuReply size={24} />
            Reply
          </button>
          {/* <span className="flex gap-2 items-center">
                        <PiArrowFatUpLight size={24} />
                        155
                        <PiArrowFatDownLight size={24} />
                    </span> */}
        </div>
      </div>
    </div>
  );
}
