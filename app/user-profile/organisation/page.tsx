'use client'

import SimpleHeader from "@/components/ui/headers/SimpleHeader"
import UserOrganisationList from "@/components/user/UserOrganisationList"
import UserInvitationList from "@/components/user/UserInvitationList"
import HeaderWithDescription from "@/components/ui/headers/HeaderWithDescription"
import { useRouter } from 'next/navigation';

export default function Page() {

    const router = useRouter();

    return (
        <>
            <div>
                <HeaderWithDescription 
                    Headline="Your organisations"
                    Description="A list of all organisations of which you are a member"
                    type="page"
                    PrimaryButtonLabel="Create new organisation"
                    PrimaryButtononClick={() => router.push(`/create-organisation`)}
                />
            
                <UserOrganisationList />

                <div className="inline-flex justify-between w-full mt-10">
                    <SimpleHeader Headline= "Invitations" />
                </div>
            
                <UserInvitationList />
            </div>
        </>
    )
}