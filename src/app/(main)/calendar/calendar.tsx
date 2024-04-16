'use client'
import { generateCalendar } from '@/utils/calendar'
import React from 'react'

interface IProps {

}

const weeks = [
    'SUN',
    'MON',
    'TUE',
    'WED',
    'THUR',
    'FRI',
    'SAT'
]
export default function Calendar({ }: IProps) {
    console.log(generateCalendar().splice(7, 7))
    return (
        <div className='py-4 px-6 h-full'>
            <div className='flex flex-col h-full items-center w-full bg-white border border-gray border-opacity-20 rounded-lg'>
                <h1 className='p-4 font-bold text-3xl'>December 2023</h1>
                <table className='w-full h-full table-fixed'>
                    <thead>
                        <tr className='h-10 text-left '>
                            {weeks.map((week, index) => (
                                <th className='border border-gray border-opacity-20 px-4 font-medium text-gray' key={index}>
                                    {week}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {[1, 2, 3, 4, 5, 6].map((week, indexOne) => (
                            <tr key={indexOne}>
                                {generateCalendar().splice(indexOne * 7, 7).map((calendar, indexTwo) => (
                                    <td className='border border-gray border-opacity-20' key={indexTwo}>
                                        <div className={`flex w-full h-full p-4 ${!calendar.currentMonth && 'opacity-50'}`}>
                                            <span className={`${calendar.today && 'bg-primary text-white rounded-full h-8 w-8 flex justify-center items-center'}`}>
                                                {calendar.date}
                                            </span>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* <div className='grid grid-cols-7 border'>
                    {weeks.map((week, index) => (
                        <div>
                            {week}
                        </div>
                    ))}
                </div>
                <div className='grid grid-cols-7 border'>
                    {generateCalendar().map((calendar, index) => (
                        <div>
                            {calendar.date}
                        </div>
                    ))}
                </div> */}
            </div>

        </div>
    )
}
