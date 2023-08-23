'use client'

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import DefaultButton from "../buttons/DefaultButton"

interface JumboProps {
    Title: string;
    Description: string;
    PrimaryButtonLabel: string;
    PrimaryButtononClick: () => void;
    SecondaryButtonLabel?: string;
    SecondaryButtononClick?: () => void;
    picture: string;
}

const JumbotronPicture: React.FC<JumboProps> = ({
    Title, Description, picture, PrimaryButtonLabel,PrimaryButtononClick,SecondaryButtonLabel,SecondaryButtononClick}
        ) => {
        const router = useRouter()

        return(
            <section className={`bg-center bg-no-repeat bg-cover bg-gray-700 bg-blend-multiply h-screen`} style={{backgroundImage: `url(${picture})`}}>
                <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">{Title}</h1>
                    <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">{Description}</p>
                    <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                        <DefaultButton 
                            label={PrimaryButtonLabel} 
                            onClick={PrimaryButtononClick}
                            type="primary" 
                        />
                        {SecondaryButtonLabel && SecondaryButtononClick && (
                            <DefaultButton 
                                label={SecondaryButtonLabel} 
                                onClick={SecondaryButtononClick}
                                type="secondary"
                            />
                        )}
                    </div>
                </div>
            </section>
        )
    }

    export default JumbotronPicture;
