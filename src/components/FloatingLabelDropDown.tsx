import useDropDown from '@/hooks/useDropDown'
import { FiChevronDown } from '@react-icons/all-files/fi/FiChevronDown'
import { useEffect, useRef, useState } from 'react'

interface UserInput {
    id: string,
    label: string,
    type: string,
    className?: string,
    list: string[],
    index: any,
    onIndexChange: (index: number) => void,
}

export default function FloatingLabelDropDown({ id, label, type, className, list, index, onIndexChange }: UserInput) {
    const dropDownRef = useRef<HTMLDivElement>(null)
    const [selectedIndex, setSelectedIndex] = useState<number>(index)
    const [toggle, setToggle] = useDropDown(false, dropDownRef)

    useEffect(() => {
        onIndexChange(selectedIndex)
    }, [selectedIndex])

    const handleClick = (index: number) => {
        setSelectedIndex(index)
        setToggle(false)
    }

    return (
        <div className={`relative ${className}`} ref={dropDownRef}>
            <input
                type={type}
                id={id}
                className="peer sam px-4 h-[64px] w-full border border-gray rounded-lg outline-none focus:border-blue-500 transition duration-200 cursor-pointer text-[16px]"
                placeholder=" "
                value={!isNaN(index) ? list[selectedIndex] : ''}
                onClick={() => setToggle(!toggle)}
                readOnly />

            <label
                htmlFor={id}
                className="absolute left-0 px-2 transition duration-200 translate-x-3 -translate-y-[10px] bg-white text-gray
              peer-[.sam]:peer-placeholder-shown:translate-y-[18.5px] peer-[.sam]:peer-placeholder-shown:text-16px peer-[.sam]:peer-placeholder-shown:px-0
              peer-[.sam]:peer-placeholder-shown:mx-2 peer-[.sam]:peer-focus:text-blue-500 cursor-pointer">{label}</label>

            <label htmlFor={id} className='absolute right-3 top-1/2 -translate-y-1/2 text-xl peer-[.sam]:peer-focus:text-blue-500 cursor-pointer'><FiChevronDown /></label>


            {toggle && (
                <div className='absolute mt-2 w-full shadow-md rounded-lg bg-white overflow-y-auto max-h-52 z-50'>
                    {list?.map((value, index) => (
                        <button
                            key={index}
                            className='p-3 text-left w-full hover:bg-primary-light hover:bg-opacity-5'
                            onClick={() => handleClick(index)} >{value}</button>
                    ))}
                </div>
            )}

        </div>


    )
}
