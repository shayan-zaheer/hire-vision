interface CardProps {
    title: string;
    content: string;
    buttonText: string;
}

function Card({title, content, buttonText} : CardProps) {
    return (
        <div className="p-8 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 shadow-lg font-ubuntu flex flex-col">
            <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
            <p className="text-white/80 mb-6 flex-1">
                {content}
            </p>
            <button className="px-4 py-2 bg-white/20 hover:bg-white/30 transition-colors rounded-md text-white font-semibold">
                {buttonText}
            </button>
        </div>
    );
}

export default Card;
