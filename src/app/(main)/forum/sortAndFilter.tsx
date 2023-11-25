'use client'
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

interface ISortAndFilter {
    label: string,
    query: string
}

const sortList: ISortAndFilter[] = [
    {
        label: 'Newest',
        query: 'newest'
    },
    {
        label: 'Oldest',
        query: 'oldest'
    },
    {
        label: 'Popular',
        query: 'popular'
    },
    {
        label: 'Reward ending soon',
        query: 'reward-ending-soon'
    },
]

const filterList: ISortAndFilter[] = [
    {
        label: 'No answers',
        query: 'no-answers'
    },
    {
        label: 'No accepted answer',
        query: 'no-accepted-answer'
    },
    {
        label: 'Available reward',
        query: 'available-reward'
    }
]


export default function SortAndFilter() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams)

            if (name === 'sort') {
                params.set(name, value)
            }
            else {
                params.has(name, value) ? params.delete(name, value) : params.append(name, value)
            }
            return params.toString()
        },
        [searchParams]
    )

    return (
        <div className="hidden bg-white w-full max-w-[272px] h-fit p-4 xl:flex flex-col gap-4 rounded-lg sticky top-0 shadow-md">
            {/* Sort */}
            <h1 className="font-medium text-xl">Sort by</h1>
            <div className="flex flex-col gap-2">
                {sortList.map((sort, index) => (
                    <span key={index} className="flex gap-2">
                        <input
                            onChange={(e) => router.replace(pathname + '?' + createQueryString('sort', e.target.value))}
                            value={sort.query}
                            type="radio"
                            id={sort.query}
                            checked={searchParams.get('sort') === sort.query} />
                        <label htmlFor={sort.query} className="">{sort.label}</label>
                    </span>
                ))}
            </div>

            {/* Filter */}
            <h1 className="font-medium text-xl">Filter by</h1>
            <div className="flex flex-col gap-2">
                {filterList.map((filter, index) => (
                    <span key={index} className="flex gap-2">
                        <input
                            type="checkbox"
                            onChange={(e) => router.replace(pathname + '?' + createQueryString('filter', filter.query))}
                            id={filter.query}
                            checked={searchParams.has('filter', filter.query)}
                        />

                        <label htmlFor={filter.query} className="">{filter.label}</label>
                    </span>
                ))}
            </div>
        </div>
    )
}
