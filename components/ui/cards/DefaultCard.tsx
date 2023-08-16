import { useRouter } from "next/navigation";
import CompleteIcon from '@mui/icons-material/AssignmentTurnedIn';

interface CardProps {
    Title: string;
    Description: string;
    Link: string;
    isCompleted?: boolean;
}

const DefaultCard: React.FC<CardProps> = ({
    Title, Description, Link, isCompleted
}) => {
    const router = useRouter();

    const handleOnclickCard = () => {
        router.push(Link);
    }

    return (
        <div 
            onClick={handleOnclickCard} 
            className="
                block
                max-w-sm
                p-6
                bg-white
                border
                border-gray-200
                rounded-lg
                shadow
                hover:shadow-md
                hover:bg-gray-100
                dark:bg-gray-800
                dark:border-gray-700
                dark:hover:bg-gray-700
                cursor-pointer
                flex
                justify-between
                items-center
            "
        >
            <div className="
                flex
                flex-col
                justify-between
            ">
                <h5 className="
                    mb-2
                    text-2xl
                    font-bold
                    tracking-tight
                    text-gray-900
                    dark:text-white
                ">
                    {Title}
                </h5>
                <p className="
                    font-normal
                    text-gray-700
                    dark:text-gray-400
                ">
                    {Description}
                </p>
            </div>
            {isCompleted && 
                <span className="p-2">
                    <CompleteIcon sx={{ width: 24, height: 24 }} />
                </span>
            }
        </div>
    )
}

export default DefaultCard;
