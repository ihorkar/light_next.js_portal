'use client'

import { useState, useEffect } from "react"
import { StatsData } from "@/components/ui/data/StatsWithTrending"
import HeaderWithDescription from "@/components/ui/headers/HeaderWithDescription"
import StatsWithTrending from "@/components/ui/data/StatsWithTrending"
import FullWidthList from "@/components/ui/lists/FullWidthList"
import API from "@/utils/api/api"
import { DocumentIcon } from "@heroicons/react/24/outline"
import DefaultButton from "@/components/ui/buttons/DefaultButton"
import { useRouter } from "next/navigation"

export default function Page({ params }: {
    params: { 
        organisationId: string,
        userId: string
    }
  }) {

    const [statsResult, setStatsResult] = useState(
      {
        results: 0, days: 0, firstDate: "No activity", recentDate: "No activity"
      }
    );
    const [resultData, setResultData] = useState<any[]>([]);
    const [userData, setUserData] = useState<any>();

    const router = useRouter()

    useEffect(() => {
      handleGetResultData()
      handleGetUserData()
    },[])

    const handleGetUserData = async () => {
      await API.getUserDataByUserId(params.userId).then(response => {
        setUserData(response.data)
      })
    }
    
    const handleGetResultData = async () => {
      await API.getAllStatsResultsByUser(params.organisationId, params.userId).then(response => {
        setResultData(response.data.resultdata)
        if(response.data.firstdate) {
          setStatsResult({
            results: response.data.totalResults,
            days: response.data.dateResults,
            firstDate: response.data.firstdate,
            recentDate: response.data.recentdate
          })
        }
      });
    };

    const handleViewContract = (resultId: string) => {
      API.getResultContractURL(params.organisationId, resultId)
        .then(response => {
          if(response.status === 200) {
            window.open(response.data, '_blank');
          }
        })
        .catch(error => {
          console.log("Error while updatng user data", error)
          if(error.response.status === 500) router.push('/service-unavailabled')
        })
    }
    
    const stats: StatsData[]  = [
      { name: 'Total Results', value: statsResult.results},
      { name: 'Worked days', value: statsResult.days},
      { name: 'First day', value: statsResult.firstDate},
      { name: 'Recent Activity', value: statsResult.recentDate},
    ]

    const columns = [
      {
        header: "Result",
        accessor: (item: any) => item._id,
        name: "_id"
      },
      {
        header: "Form",
        accessor: (item: any) => item.description,
        isBold: true,
        name: "description"
      },
      {
        header: "Date",
        accessor: (item: any) => item.createdAt,
        name: "createdAt"
      },
    ];
  
    const actionButtons = [
      {
        label: "View Contract",
        icon: <DocumentIcon className="h-5 w-5 text-green-500" />,
        onClick: (item: any) => handleViewContract(item._id),
        visible: (item: any) => true
      }
    ];

    return (
      <div>
        <HeaderWithDescription 
          Headline={`${userData?.userName} Results`} 
          Description={`This is ${userData?.userName}'s information`} 
          type='page'
          PrimaryButtonLabel="Return to team"
          PrimaryButtononClick={() => router.push(`${window.location.origin}/${params.organisationId}/team`)}
        />
        <StatsWithTrending data = {stats} />
        <FullWidthList columns={columns} data={resultData} actionButtons={actionButtons} orderBy="createdAt" sortMethod="asc" />
      </div>
    )
}