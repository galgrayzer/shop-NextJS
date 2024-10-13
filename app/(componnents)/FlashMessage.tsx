interface FlashMessageProps {
    message: string;
    type: string;
    className?: string;
}

const FlashMessage: React.FC<FlashMessageProps> = ({ message, type, className }) => {
    return (
        <div className={`text-center ${className}`}>
            {
                type === "error" ?
                (
                    <div className="bg-red-500 text-white p-2 rounded-lg">
                        {message}
                    </div>
                ) : type === "success" ?
                (
                    <div className="bg-green-500 text-white p-2 rounded-lg">
                        {message}
                    </div>
                ) : type === "warning" ?
                (
                    <div className="bg-yellow-500 text-white p-2 rounded-lg">
                        {message}
                    </div>
                ) : null
            }
        </div>
    );
}

export default FlashMessage;