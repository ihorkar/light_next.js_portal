import PanelMobile from "../Layout/PanelMobile"

  interface CardProps {
    Icon: string,
    headline: string
    description: string
    }

  const StatusCardPic: React.FC<CardProps> = ({
        Icon, headline, description}
            ) => {
    return (
        <PanelMobile>
            <div className="flex flex-col px-4 py-5 sm:p-6  items-center justify-center ">
              <img src={Icon} alt={headline} className="w-24 h-24 text-blue-500" aria-hidden="true" />
              <h1 className="text-4xl text-gray-900">{headline}</h1>
              <p className="text-xl text-gray-600 text-center">{description}</p>
            </div>
        </PanelMobile>
    )
  }

  export default StatusCardPic;