'use client'
import { IoMdTime } from '@react-icons/all-files/io/IoMdTime'
import { IoMdTrendingUp } from '@react-icons/all-files/io/IoMdTrendingUp'
import { RiFireLine } from '@react-icons/all-files/ri/RiFireLine'
import { FiCheckCircle } from '@react-icons/all-files/fi/FiCheckCircle'
import { GoThumbsup } from '@react-icons/all-files/go/GoThumbsup'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'


interface ITopicCategory {
    label: string,
    query: string,
    icon?: any
    active: boolean
}
export default function Categories() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const searchParam = searchParams.get('category')

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams)

            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )

    const topicCategories: ITopicCategory[] = [
        {
            label: 'New',
            query: 'new',
            icon: <IoMdTime />,
            active: searchParam === 'new' || searchParam === undefined || searchParam === null
        },
        {
            label: 'Top',
            query: 'top',
            icon: <IoMdTrendingUp />,
            active: searchParam === 'top'
        },
        {
            label: 'Hot',
            query: 'hot',
            icon: <RiFireLine />,
            active: searchParam === 'hot'
        },
        {
            label: 'Closed',
            query: 'closed',
            icon: < FiCheckCircle />,
            active: searchParam === 'closed'
        },
        {
            label: 'Suggested',
            query: 'suggested',
            icon: < GoThumbsup />,
            active: searchParam === 'suggested'
        }
    ]

    return (
        <div className="bg-white p-4 flex gap-2 rounded-lg sticky top-0 shadow-md z-40 flex-wrap">
            {topicCategories.map((category, index) => (
                <button
                    onClick={() => router.push(pathname + '?' + createQueryString('category', category.query))}
                    className={`py-1.5 px-2.5 rounded-full bg-dirty-white flex items-center gap-1.5 ${category.active && 'bg-primary-light text-white'}`}
                    key={index}>
                    {category.icon}
                    {category.label}
                </button>
            ))}
        </div>
    )
}
