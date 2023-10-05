'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import HeaderWithDescription from "@/components/ui/headers/HeaderWithDescription"
import FullWidthList from "@/components/ui/lists/FullWidthList"
import API from "@/utils/api/api";
import StatusCardPic from "@/components/ui/cards/StatusCardPic";

export default function Page() {
    const [ resultDataByUser, setResultDataByUser ] = useState<any[]>([]);
    const session = useSession();
  
    useEffect(() => {
    //   @ts-ignore
      if (session.data?.accessToken) axios.defaults.headers.common["Authorization"] = `${session.data?.accessToken}`;
      handleGetResultDataByUser();
    }, []);
    
    const handleGetResultDataByUser = async () => {
        API.getTotalResultByUser()
            .then(response => {
                setResultDataByUser(response.data)
            })
    };

    const columns = [
      {
        header: "Result",
        accessor: (item: any) => item.resultId,
        name: "resultId"
      },
      {
        header: "Timestamp",
        accessor: (item: any) => item.timestamp,
        isBold: true,
        name: "timestamp"
      },
      {
        header: "Organisation",
        accessor: (item: any) => item.organisation,
        name: "organisation"
      },
      {
        header: "Project",
        accessor: (item: any) => item.project,
        name: "project",
      },
    ];

    return (
        <div>
            <HeaderWithDescription
                Headline="Results"
                Description="Here you can find all results."
                type="page"
            />
            { resultDataByUser.length > 0 ? 
                <FullWidthList columns={columns} data={resultDataByUser} orderBy="timestamp" sortMethod="asc" /> :
                <StatusCardPic
                    Icon="/search-doc.png"
                    headline="No results"
                    description="You should sign up the project first."
                />
            }
        </div>
    )
}