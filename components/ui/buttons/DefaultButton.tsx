interface ButtonProps {
    label: string;
    onClick: () => void;
    type?: 'primary' | 'secondary' | 'critical';
}

const DefaultButton: React.FC<ButtonProps> = ({
    label,
    onClick,
    type = 'primary',
}) => {
    let classNames = "text-sm py-3 px-5 mr-2 mb-2 font-medium rounded-lg";

    switch (type) {
        case 'primary':
            classNames += " text-textprimary bg-actionprimarydefault hover:bg-actionprimaryhovered border border-actionprimarydefault";
            break;
        case 'secondary':
            classNames += " text-textdefault bg-surfacedefault hover:surfacehovered border border-borderdefault";
            break;
        case 'critical':
            classNames += " text-textprimary bg-actioncriticaldefault hover:actioncriticalhovered";
            break;
    }

    return (
        <button onClick={onClick} className={classNames}>
            {label}
        </button>
    );
};

export default DefaultButton;