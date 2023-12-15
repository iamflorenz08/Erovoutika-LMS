'use client'
import { IBadge } from '@/types/userTypes'
import { IoCloseSharp } from '@react-icons/all-files/io5/IoCloseSharp'
import Image from 'next/image'
import { useState } from 'react'
import { changeBadge } from './action'
interface IProps {
    isShow: boolean,
    onClose: () => void,
    selectedBadge: (badge: IBadge | undefined) => void,
    availableBadges?: Array<IBadge>,
    index: number
}

export default function BadgesModal({ isShow, onClose: close, availableBadges, selectedBadge, index }: IProps) {
    const [badge, setBadge] = useState<IBadge>()
    if (!isShow) return
    return (
        <form
            action={async () => {
                selectedBadge(badge)
                close()
                await changeBadge(badge, index)
            }}
            className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center '>
            <div className='bg-white p-4 flex flex-col gap-4 rounded-lg'>
                <div className='flex justify-between items-center'>
                    <h1 className='font-medium text-xl'>Select a badge</h1>
                    <button
                        onClick={() => close()}
                        type='button'
                    ><IoCloseSharp size={24} /></button>
                </div>
                <div className='border border-gray border-opacity-50 grid grid-cols-4 p-4 gap-8 rounded-sm '>
                    {availableBadges && availableBadges.map((badge: IBadge, index: number) => (
                        <button
                            onClick={() => {
                                setBadge(badge)
                            }}
                            key={index}
                            type='submit'
                        >
                            <Image className='h-[72px] w-[72px] object-cover' src={badge.imageURL} alt='badge' height={72} width={72} />
                        </button>
                    ))}
                </div>
            </div>
        </form>
    )
}
