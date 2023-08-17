'use client'

import Container from "@/components/ui/Layout/Container"
import OrganisationSignUp from "@/components/organisation/OrganisationSignup"
import DefaultHeader from "@/components/ui/headers/DefaultHeader"

export default function Page() {
  return (
    <div className="bg-white">
      <Container>
        <DefaultHeader
          Headline="Let's make every encounter count!"
          Description="Share a few details about your organization, and embark on an exciting journey with us."
        />
        <OrganisationSignUp />
      </Container>
    </div>
  )
}
