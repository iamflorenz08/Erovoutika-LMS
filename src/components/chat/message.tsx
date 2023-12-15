interface MessageProps {
    imageUrl: string;
    name: string;
    message: string;
}
export default function Message({ imageUrl, name, message }: MessageProps) {
    return (
        <div className="flex items-center gap-4 p-4">
            <img src={imageUrl} alt="User Avatar" className="rounded-full w-12 h-12 object-cover" />
            <div className="flex-grow">
                <h1 className="text-sm font-bold mb-1 capitalize">{name}</h1>
                <span className="md:block text-xs break-words">{message}</span>
            </div>
        </div>
    )
}
