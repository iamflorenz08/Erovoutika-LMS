import { ChangeEvent, useEffect, useState } from "react"

interface UserInput {
    id: string,
    label: string,
    type: string,
    className?: string
    value?: any,
    onChange: (text: string) => void,
}

export default function FloatingLabelInput({ id, label, type, className, onChange, value }: UserInput) {
    const [input, setInput] = useState<any>(value)

    useEffect(() => {
        const inputChange = () => {
            onChange(input)
        }

        inputChange()
    }, [input])


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    return (
        <div className={`relative ${className}`}>
            <input
                type={type}
                id={id}
                onChange={handleChange}
                value={input ? input : ''}
                className="peer sam px-4 h-[64px] w-full text-[16px] border border-gray rounded-lg outline-none focus:border-blue-500 transition duration-200"
                placeholder=" " />

            <label
                htmlFor={id}
                className="absolute left-0 px-2 transition duration-200 translate-x-3 -translate-y-[10px] bg-white text-gray
              peer-[.sam]:peer-placeholder-shown:translate-y-[18.5px] peer-[.sam]:peer-placeholder-shown:text-[16px] peer-[.sam]:peer-placeholder-shown:px-0
              peer-[.sam]:peer-placeholder-shown:mx-2 peer-[.sam]:peer-focus:text-blue-500 cursor-text">{label}</label>
        </div>
    )
}
