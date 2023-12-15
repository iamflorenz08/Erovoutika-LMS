import React from 'react'

interface IProps {
    rewards: number
}

export default function AvailableRewards({ rewards }: IProps) {
    return (
        <div className='relative group'>
            <div className='absolute -translate-x-36 top-10 min-w-[415px] text-center bg-white p-4 z-50 shadow-md rounded-lg hidden group-hover:block duration-300'>
                <h1 className='text-primary text-xl font-bold'>+{rewards} Points</h1>
                <h2><span className='font-semibold'>Reward available</span> for the <span className='font-semibold'>accepted answer</span> to this question.</h2>
                <h2 className='font-semibold'>Expires in 7 days</h2>
            </div>
            <span className="bg-reward text-white px-2.5 py-1.5 rounded-[20px] flex cursor-default">
                Available Reward
            </span>
        </div>

    )
}
