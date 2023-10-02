'use client'

import { useState, useEffect } from "react"
import StatsWithTrending from "@/components/ui/data/StatsWithTrending"
import HeaderWithDescription from "@/components/ui/headers/HeaderWithDescription"
import API from "@/utils/api/api"
import { StatsData } from "@/components/ui/data/StatsWithTrending"

export default function Page({ params }: {
    params: { organisationId: string}
  }) {
    const [resultData, setResultData] = useState<any>()
  
    useEffect(() => {
      handleStatsResultData()
    }, []);

    const handleStatsResultData = async () => {
      await API.getStatsResultByOrganisation(params.organisationId)
        .then(response => {
          setResultData(response.data)
        })
    }
    
  const stats: StatsData[]  = [
    { name: 'Results', value: resultData?.result as number},
    { name: 'Yesterday Result', value: resultData?.yesterdayResult as number, change: '+0%', changeType: 'positive' },
    { name: 'Crewsize', value: resultData?.crewSize as number, change: '+0%', changeType: 'positive' },
    { name: 'Active Projects', value: resultData?.activeProject as number },
  ]
  
  return (
    <div>
      <HeaderWithDescription 
        Headline={"Welcome back!"} 
        Description={"This is your dashboard"} 
        type='page'   
      />
      <StatsWithTrending data = {stats} />

    </div>
    
  )
}