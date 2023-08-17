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
                    Title="The light portal is here"
                    Description="Are you ready to take your field marketing to the next level? Sign up now and get access to the leading platform to manage and grow your face-to-face Sales, Fundraising & Field Marketing."
                    PrimaryButtonLabel="Join us!"
                    PrimaryButtononClick={() => router.push('/signup')}
                    SecondaryButtonLabel="Already a member?"
                    SecondaryButtononClick={() => signIn("keycloak")}
                />
            )}
        </div>
    )}

export default Page;