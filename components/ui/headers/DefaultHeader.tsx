// Based on 'Centered with Eyebrow'

interface HeaderProps {
    Headline: string 
    Description: string
    subHeadline?: string
}

const DefaultHeader: React.FC<HeaderProps> = ({
    Headline, Description,subHeadline}
        ) => {

    return(
        <div className="
            flex
            flex-col
            gap-y-1
            text-center
            text-white
        ">
            <p className="
                text-base 
                font-medium
                ">
                {subHeadline}
            </p>
            <h1 className="mb-4 
                text-4xl 
                font-extrabold 
                leading-none 
                tracking-tight 
                text-gray-900 
                md:text-5xl 
                lg:text-6xl 
                dark:text-white">

                {Headline}

            </h1>
            <p className="
                mb-6 
                text-lg 
                font-normal 
                text-gray-500 
                lg:text-xl 
                sm:px-16 
                xl:px-48 
                dark:text-gray-400">

                {Description}
                
            </p>
        </div>
    )
        }

export default DefaultHeader;