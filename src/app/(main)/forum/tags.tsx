import TagBox from '@/components/tagBox'
import { IoMdClose } from '@react-icons/all-files/io/IoMdClose'
import { useEffect, useState } from 'react'
interface IProps {
    onUpdate: (tags: Array<string>) => void
}

export default function Tags({ onUpdate }: IProps) {
    const [tags, setTags] = useState<Array<string>>([])
    const [currentTag, setCurrentTag] = useState<string>('')

    const handleTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code !== 'Space' || currentTag.trim() === '') return
        if (tags.indexOf(currentTag.trim()) !== -1) {
            setCurrentTag('')
            return
        }
        setTags([...tags, currentTag])
        setCurrentTag('')
    }

    useEffect(() => {
        onUpdate(tags)
    }, [tags])

    return (
        <div className="w-full mt-2.5 px-2.5 py-1.5 text-xl border-gray border-2 border-opacity-20 rounded-md flex flex-wrap items-center gap-2.5">
            {tags?.map((value, index) => (
                <TagBox
                    key={index}
                    label={value}
                    onExit={() => setTags(tags.filter((tag) => value !== tag))}
                />
            ))}

            <input
                type="text"
                placeholder="Add Tags"
                onKeyDown={handleTags}
                onChange={(e) => setCurrentTag(e.target.value)}
                value={currentTag.trim()}
                className="text-xl flex outline-none flex-grow  py-1.5" />
        </div>
    )
}
