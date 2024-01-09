import { useEffect, useState } from "react"

export default function useDebounce(searchText: string, debounceValue: number) {
    const [search, setSearch] = useState<string>(searchText)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    useEffect(() => {
        searchText && setIsLoading(true)
        const searchTimeOut = setTimeout(() => {
            setSearch(searchText)
            setIsLoading(false)
        }, debounceValue)

        return () => {
            clearTimeout(searchTimeOut)
        }

    }, [searchText, debounceValue])

    return { search, isLoading }
}
