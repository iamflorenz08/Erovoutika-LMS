import { IUser } from "@/types/userTypes"
import Image from "next/image"

interface IProps {
    author?: IUser
}
export default function ThreadStartInfo({ author }: IProps) {
    return (
        <div className="max-w-[272px] w-full bg-white shadow-md p-4 rounded-lg h-fit sticky top-0">
            <div className="flex flex-col gap-2 items-center">
                <h1 className="font-medium">Thread Starter</h1>
                <Image className="w-12 h-12 object-cover rounded-full" src={'/sample_user_icon.png'} alt="user_icon" width={48} height={48} />
                <div className="flex flex-col items-center">
                    <h1 className="font-medium">{author?.fullName.first} {author?.fullName.last}</h1>
                    <h2 className="font-light text-gray">Student</h2>
                    <span className="border border-gray border-opacity-50 text-gray text-[10px] w-fit px-1.5 py-0.5 rounded-xl">Lvl. 15</span>
                </div>
            </div>

            <div className="mt-2 flex flex-col gap-2">
                <h1 className="font-medium">Badges</h1>
                <div className="grid grid-cols-3 text-center my-4">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                </div>

                <div className="flex font-medium">
                    <div className="flex flex-col w-full text-center">
                        <span>999,999</span>
                        <span>Points</span>
                    </div>
                    <div className="flex flex-col w-full text-center">
                        <span>999,999</span>
                        <span>Posts</span>
                    </div>
                </div>
            </div>

            <button className="bg-primary text-white w-full py-2 rounded-[20px] font-semibold mt-4">Watch thread</button>
        </div>
    )
}
