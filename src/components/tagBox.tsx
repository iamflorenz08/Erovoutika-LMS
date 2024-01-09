import { IoMdClose } from '@react-icons/all-files/io/IoMdClose'

interface IProps {
    label: string,
    onExit?: () => void | null | undefined
}

export default function TagBox({ label, onExit }: IProps) {
    return (
        <span className="bg-[#EDF5FD] rounded-lg px-2.5 py-1.5 text-primary flex items-center gap-2.5">
            {label}
            {onExit && (
                <button onClick={onExit}><IoMdClose /></button>
            )}
        </span>
    )
}
