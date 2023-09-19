'use client'

import StatsWithTrending from "@/components/ui/data/StatsWithTrending"
import HeaderWithDescription from "@/components/ui/headers/HeaderWithDescription"


export default function Page({ params }: {
    params: { organisationId: string}
  }) {
  return (
    <div>
      <HeaderWithDescription 
        Headline={"Welcome back!"} 
        Description={"This is your dashboard"} 
        type='page'   
      />
      <StatsWithTrending organisationId = {params.organisationId} />

    </div>
    
  )
}