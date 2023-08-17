interface ButtonProps {
    label: string;
    onClick: () => void;
    type?: 'primary' | 'secondary';
}

const DefaultButton: React.FC<ButtonProps> = ({
    label,
    onClick,
    type = 'primary',
}) => {
    let classNames = "text-sm py-3 px-5 mr-2 mb-2 font-medium rounded-lg focus:ring-4 focus:outline-none";

    if (type === 'primary') {
        classNames += " text-white bg-actionprimarydefault hover:bg-actionprimaryhovered focus:ring-blue-300";
    } else if (type === 'secondary') {
        classNames += " hover:text-gray-900 items-center text-center text-white border border-white hover:bg-gray-100 focus:ring-gray-400";
    }

    return (
        <button onClick={onClick} className={classNames}>
            {label}
        </button>
    );
};

export default DefaultButton;