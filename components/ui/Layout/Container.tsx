interface ContainerProps {
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({children}) => {
    return (
        <div
            className="
                max-w-[2520px]
                w-full
                mx-auto
                xl:px-20
                md:px-10
                sm:px-2
                px-4
                flex
                flex-col
                justify-center
                items-center
                min-h-screen
            "
        >
            {children}
        </div>
    );
}


export default Container;