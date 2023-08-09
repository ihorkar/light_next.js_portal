'use client'

import { signIn } from "next-auth/react"

interface JumboProps {
    Title: string 
    Description: string
    Link: string
    ButtonText: string
    picture: string
}

const JumbotronPicture: React.FC<JumboProps> = ({
    Title, Description, picture, Link,ButtonText}
        ) => {
        return(
            <section className={`bg-center bg-no-repeat bg-cover bg-gray-700 bg-blend-multiply h-screen`} style={{backgroundImage: `url(${picture})`}}>
                <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">{Title}</h1>
                    <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">{Description}</p>
                    <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                        <div onClick={() => signIn("keycloak")} className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-actionprimarydefault hover:bg-actionprimaryhovered focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 cursor-pointer">
                            {ButtonText}
                            <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </div>
                        <a href="#" className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
                            Learn more
                        </a>  
                    </div>
                </div>
            </section>
        )
    }

    export default JumbotronPicture;
