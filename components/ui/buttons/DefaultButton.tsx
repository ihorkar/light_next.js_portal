// Based on 'Centered with Eyebrow'

interface ButtonProps {
    label: string;
    onClick: () => void;
    style?: {};
}

const DefaultButton: React.FC<ButtonProps> = ({
    label, onClick, style}
        ) => {

    return(
        <button onClick={onClick}
            style={style}
            className="
            text-white 
            bg-actionprimarydefault
            hover:bg-actionprimaryhovered
            focus:ring-4 
            focus:ring-blue-300 
            font-medium 
            rounded-lg 
            text-sm 
            px-5 
            py-2.5 
            mr-2 
            mb-2 
            focus:outline-none">
            
            {label}
        
        </button>

    )
        }

export default DefaultButton;