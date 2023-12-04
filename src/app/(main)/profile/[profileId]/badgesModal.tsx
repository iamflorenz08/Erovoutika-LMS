'use client'
import { IBadge } from '@/types/userTypes'
import { CiCirclePlus } from '@react-icons/all-files/ci/CiCirclePlus'
import { IoCloseSharp } from '@react-icons/all-files/io5/IoCloseSharp'
import Image from 'next/image'
import { useOptimistic, useState } from 'react'
import { changeBadge } from './action'


interface IProps {
    currentBadges: Array<IBadge | null>,
    availableBadges: Array<IBadge | null>
}
export default function BadgesModal({ availableBadges, currentBadges }: IProps) {
    const [badgesModal, setBadgesModal] = useState<boolean>(false)
    const [badgeIndex, setBadgeIndex] = useState<number>(0)
    const [selectedBadge, setSelectedBadge] = useState<IBadge | null>()
    const [selectedBadges, setSelectedBadges] = useOptimistic(
        currentBadges,
        (currState, badge: IBadge | undefined | null) => {
            if (!badge) return currState
            currState[badgeIndex] = badge
            return currState
        }
    )


    return (
        <>
            <div className="flex justify-center gap-4 text-primary">
                {selectedBadges.map((badge, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setBadgeIndex(index)
                            setBadgesModal(true)
                        }}
                    >
                        {badge ? (
                            <Image className='h-[72px] w-[72px] object-cover' src={badge.imageURL} alt='badge' height={72} width={72} />
                        ) : (
                            <CiCirclePlus size={72} />
                        )}
                    </button>
                ))}
            </div>

            {/* BADGES MODAL */}
            {badgesModal && (
                <form
                    action={async () => {
                        setSelectedBadges(selectedBadge)
                        setBadgesModal(false)

                        console.log(selectedBadges)
                    }}
                    className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center'>
                    <div className='bg-white p-4 flex flex-col gap-4'>
                        <div className='flex justify-between items-center'>
                            <h1 className='font-medium text-xl'>Select a badge</h1>
                            <button
                                type='button'
                                onClick={() => setBadgesModal(false)}
                            ><IoCloseSharp size={24} /></button>
                        </div>
                        <div className='border border-gray border-opacity-50 grid grid-cols-4 p-4 gap-8 rounded-sm '>
                            {availableBadges.map((badge, index) => (
                                <button
                                    onClick={() => setSelectedBadge(badge)}
                                    key={index}
                                    type='submit'
                                >
                                    {badge && (
                                        <Image className='h-[72px] w-[72px] object-cover' src={badge.imageURL} alt='badge' height={72} width={72} />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </form>
            )}

        </>
    )
}
