import Image from "next/image"
import { HiPencil } from '@react-icons/all-files/hi/HiPencil'
import { IUser } from "@/types/userTypes"
import BadgesModal from "./badgesModal"

interface IProps {
    profileId: string,
}

const getUser = async (profileId: string | undefined) => {
    const res = await fetch(`${process.env.API_URI}/api/v1/users/${profileId}`)
    return res.json()
}

export default async function UserProfile({ profileId }: IProps) {
    const user: IUser = await getUser(profileId)
    const toFill = 3 - user.currentBadges.length
    for (let i = 0; i < toFill; i++) {
        user.currentBadges.push(null)
    }
    
    return (
        <div className="flex flex-col xl:flex-row gap-4 items-center bg-white rounded-lg shadow-md p-4">
            <div className="flex flex-col lg:flex-row gap-4 xl:gap-[120px] lg:justify-between xl:justify-start items-center w-full">
                <div className="flex gap-4 items-center">
                    <Image className="h-[120px] w-[120px] object-cover" src={'/sample_user_icon.png'} alt="user_icon" height={120} width={120} />
                    <div className="flex flex-col items-center justify-center text-center">
                        <h1 className="font-medium text-3xl capitalize">{user.fullName.first.toLowerCase()} {user.fullName.last.toLowerCase()}</h1>
                        <h2 className="font-light text-gray">Student</h2>
                        <div className="max-w-[240px] w-full">
                            <div className="flex justify-between">
                                <span>Level 999</span>
                                <span>0000/9999</span>
                            </div>
                            <div className="relative bg-gray bg-opacity-50 h-2 rounded-full overflow-hidden mt-0.5">
                                <div className="bg-primary-light w-20 h-full absolute left-0 "></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*BADGES AND BADGES MODAL */}
                <BadgesModal
                    currentBadges={user.currentBadges}
                    availableBadges={user.availableBadges}
                />

            </div>

            <div className="flex w-full justify-center xl:w-max lg:min-w-max items-end lg:justify-end xl:min-h-[120px]">
                <button className="bg-gray bg-opacity-40 px-4 py-2 flex gap-2 items-center font-medium rounded-lg">
                    <HiPencil size={24} />Edit Profile
                </button>
            </div>


        </div>
    )
}
