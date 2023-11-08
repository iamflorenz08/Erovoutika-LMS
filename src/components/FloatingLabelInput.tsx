import { ChangeEvent, useEffect, useState } from "react"

interface UserInput {
    id: string,
    label: string,
    type: string,
    className?: string
    value?: any,
    onChange: (text: string) => void,
    onError?: string | null,
}

export default function FloatingLabelInput({ id, label, type, className, onChange, value, onError }: UserInput) {
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
        <div className="flex flex-col">
            <div className={`relative ${className} mb-1`}>
                <input
                    type={type}
                    id={id}
                    onChange={handleChange}
                    value={input ? input : ''}
                    className={`peer input-group px-4 h-[64px] w-full text-[16px] border border-gray rounded-lg outline-none focus:border-blue-500 transition duration-200 ${onError && '!border-red-500'}`}
                    placeholder=" " />

                <label
                    htmlFor={id}
                    className={`absolute left-0 px-2 transition duration-200 translate-x-3 -translate-y-[10px] bg-white text-gray
              peer-[.input-group]:peer-placeholder-shown:translate-y-[18.5px] peer-[.input-group]:peer-placeholder-shown:text-[16px] peer-[.input-group]:peer-placeholder-shown:px-0
              peer-[.input-group]:peer-placeholder-shown:mx-2 peer-[.input-group]:peer-focus:text-blue-500 cursor-text ${onError && '!text-red-500'}`}>{label}</label>
            </div>
            <label
                htmlFor={id}
                className={`ml-5 text-red-500 ${!onError && 'hidden'} text-sm transition duration-200`}
            >{onError}</label>
        </div>
    )
}
