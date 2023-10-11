interface ButtonProps {
    label: string;
    onClick: () => void;
    type?: 'primary' | 'critical' | 'confirmation';
    size?: 'big';
}

const DefaultButton: React.FC<ButtonProps> = ({
    label,
    onClick,
    type = 'primary',
    size
}) => {
    let classNames = size ? "py-[14px] px-8 briggs-bodyMd rounded gap-3" : "py-2 px-4 briggs-bodySm rounded gap-3";

    switch (type) {
        case 'primary':
            classNames += " text-textdefault bg-actionsecondarydefault hover:bg-actionsecondaryhovered border border-borderdefault";
            break;
        case 'confirmation':
            classNames += " text-textprimary bg-actionprimarydefault hover:bg-actionprimaryhovered border border-actionprimarydefault";
            break;
        case 'critical':
            classNames += " text-textprimary bg-actioncriticaldefault hover:bg-actioncriticalhovered border border-actioncriticaldefault";
            break;
    }

    return (
        <button onClick={onClick} className={classNames}>
            {label}
        </button>
    );
};

export default DefaultButton;