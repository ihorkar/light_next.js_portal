'use client'

import Container from "@/components/ui/Layout/Container"
import UserSignUp from "@/components/user/UserSignup"
import DefaultHeader from "@/components/ui/headers/DefaultHeader"

export default function Page() {
  return (
    <div className="bg-white">
      <Container>
        <DefaultHeader
          Headline="Join Briggs"
          Description="Sign up and start boosting your campaign today."
          subHeadline="Welcome to Our Platform"
        />
        <UserSignUp />
      </Container>
    </div>
  )
}
