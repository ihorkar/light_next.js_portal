'use client'

import SimpleHeader from "@/components/ui/headers/SimpleHeader"
import UserOrganisationList from "@/components/user/UserOrganisationList"
import UserInvitationList from "@/components/user/UserInvitationList"

export default function Page() {

    return (
        <>
            <div>
            <div className="inline-flex justify-between w-full">
                <SimpleHeader Headline= "Organisations" />
            </div>
            
            <UserOrganisationList />

            <div className="inline-flex justify-between w-full mt-10">
                <SimpleHeader Headline= "Invitations" />
            </div>
            
            <UserInvitationList />
            </div>
        </>
    )
}