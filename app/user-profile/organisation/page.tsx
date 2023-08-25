'use client'

import SimpleHeader from "@/components/ui/headers/SimpleHeader"
import UserOrganisationList from "@/components/user/UserOrganisationList"

export default function Page() {

    return (
        <>
            <div>
            <div className="inline-flex justify-between w-full">
                <SimpleHeader Headline= "Team" />
            </div>
            
            <UserOrganisationList />
            </div>
        </>
    )
}