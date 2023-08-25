import SimpleHeader from "../headers/SimpleHeader";

export interface TopNavbarProps {
    title: string;
    icon: React.ReactNode;
    onClickCloseIcon: () => void;
}

const TopNavbar = ({title, icon, onClickCloseIcon}: TopNavbarProps) => {
    return (
        <>
            <div className="w-full bg-white inline-flex p-2 py-4">
                <div className="w-8 h-8 my-auto cursor-pointer" onClick={onClickCloseIcon}>{icon}</div>
                <SimpleHeader Headline={title} />
            </div>
        </>
    )
}

export default TopNavbar