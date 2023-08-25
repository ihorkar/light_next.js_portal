'use client'

import SimpleHeader from "@/components/ui/headers/SimpleHeader"
import UserInvitationList from "@/components/user/UserInvitationList"

export default function Page() {

    return (
        <>
            <div>
            <div className="inline-flex justify-between w-full">
                <SimpleHeader Headline= "Team" />
            </div>
            
            <UserInvitationList />
            </div>
        </>
    )
}