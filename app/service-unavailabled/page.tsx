'use client'

import Container from "@/components/ui/Layout/Container"
import DefaultHeader from "@/components/ui/headers/DefaultHeader"

export default function Page() {
  return (
    <div className="bg-white">
      <Container>
        <DefaultHeader 
            Headline="You can't connect the server"
            Description="For any reason, you can't connect the server."
        />
      </Container>
    </div>
  )
}