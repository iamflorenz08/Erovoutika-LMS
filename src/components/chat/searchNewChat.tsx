import useDebounce from '@/hooks/useDebounceSearch'
import { IUser } from '@/types/userTypes'
import { useState } from 'react'
import useSWR from 'swr'

interface IProps {
    selectedUser: (user: IUser) => void
}
const fetcher = (url: string) => fetch(url).then(res => res.json())
export default function SearchNewChat({ selectedUser }: IProps) {
    const [search, setSearch] = useState<string>('')
    const { isLoading: debounceIsLoading, search: debouncedSearch } = useDebounce(search, 1000)
    const { data: users, isLoading }: { data: Array<IUser>, isLoading: boolean } =
        useSWR(() => debouncedSearch ? `${process.env.NEXT_PUBLIC_API_URI}/api/v1/chats/users?search=${debouncedSearch}` : null, fetcher)
    return (
        <>
            <div className="grid grid-cols-2 border-b p-2 border-slate-300 items-center bg-white">
                <h1 className="font-bold text-[18px]">New Chat</h1>
            </div>

            <div className="relative mt-[30px] m-4">
                <input
                    type="text"
                    className="bg-white py-4 px-4 outline-none w-full rounded-lg border"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Type name or email"
                />
            </div>

            {isLoading || debounceIsLoading ?
                (
                    <span className='text-center'>Loading...</span>
                ) : (
                    users && users.map((user, index) => (
                        <button
                            key={index}
                            onClick={() => selectedUser(user)}
                            className="flex items-center hover:bg-primary-light hover:bg-opacity-5">
                            <img src={'/sample_user_icon.png'} alt="User Avatar" className="rounded-full w-12 h-12 object-cover m-4" />
                            <div className="relative">
                                <h1 className="hidden md:block text-sm font-bold mr-4 capitalize">{user.fullName.first} {user.fullName.last}</h1>
                            </div>
                        </button>
                    ))
                )}
        </>
    )
}
