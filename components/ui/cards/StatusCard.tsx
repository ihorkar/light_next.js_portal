  interface CardProps {
    Icon: React.ElementType,
    headline: string
    description: string
    }

  const StatusCard: React.FC<CardProps> = ({
        Icon, headline, description}
            ) => {
    return (
        <div className="flex flex-col items-center justify-center overflow-hidden rounded-lg bg-white shadow">
            <div className="flex flex-col px-4 py-5 sm:p-6  items-center justify-center ">
            <Icon className="w-24 h-24 text-blue-500" aria-hidden="true" />
            <h1 className="text-4xl text-gray-900">{headline}</h1>
            <p className="text-xl text-gray-600 text-center">{description}</p>
            </div>
        </div>
    )
  }

  export default StatusCard;