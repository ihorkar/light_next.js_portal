'use client'

import JumbotronPicture from "@/components/ui/jumbotron/JumbotronPicture";
import { signIn, useSession } from 'next-auth/react'
import { useEffect } from "react"
import { useRouter } from "next/navigation"

const Page = () => {
    const {data: session, status} = useSession();
    const router = useRouter()

    useEffect(() => {
        if(session) router.push('/')
    }, [session])

    return (
        <div>
            {!session && (
                <JumbotronPicture 
                    picture="/whoneeds.jpg"
                    Title="You've succesfully signed up!"
                    Description="Check your email to setup a password."
                    PrimaryButtonLabel="Sign in"
                    PrimaryButtononClick={() => signIn("keycloak")}
                />
            )}
        </div>
    )}

export default Page;