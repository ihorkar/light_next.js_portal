import PanelMobile from "../Layout/PanelMobile"

interface CardProps {
    Icon: string,
    headline: string
    description: string
}

const StatusCardPic: React.FC<CardProps> = ({ Icon, headline, description }) => {
    return (
            <div className="flex flex-col px-4 py-5 sm:p-6 items-center justify-center transition-colors duration-200 rounded-lg">
                <img src={Icon} alt={headline} className="w-24 h-24 mb-4 text-blue-500" aria-hidden="true" />
                <h1 className="text-3xl mb-2 text-gray-900">{headline}</h1>
                <p className="text-lg text-gray-600 text-center">{description}</p>
            </div>
    )
}

export default StatusCardPic;
