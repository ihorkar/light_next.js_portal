'use client'
import { useEffect, useState } from "react";
import API from "@/utils/api/api";
import { useSession } from "next-auth/react";
import axios from "axios";
import FullWidthList from "../ui/lists/FullWidthList";
import { DocumentIcon } from "@heroicons/react/24/outline";
import StatusCardPic from "../ui/cards/StatusCardPic";

interface ListProps {
    organisationId: string;
  }

export default function OrganisationResultsList({ organisationId }: ListProps) {
  const [resultData, setResultData] = useState<any[]>([]);
  const session = useSession();

  useEffect(() => {
    //@ts-ignore
    if (session.data?.accessToken) axios.defaults.headers.common["Authorization"] = `${session.data?.accessToken}`;
    handleGetResultData();
  }, []);

  const handleGetResultData = async () => {
    await API.getResultsByOrganisation(organisationId).then(response => {
      if (response.data.length > 0) setResultData(response.data);
    });
  };

  const handleViewContract = (resultId: string) => {
    API.getResultContractURL(organisationId, resultId)
      .then(response => {
        if(response.status === 200) {
          window.open(response.data, '_blank');
        }
      })
      .catch(error => console.log("Error while updatng user data", error))
  }

  const columns = [
    {
      header: "Result",
      accessor: (item: any) => item._id,
      name: "_id"
    },
    {
      header: "Form",
      accessor: (item: any) => item.form,
      isBold: true,
      name: "form"
    },
    {
      header: "Agent",
      accessor: (item: any) => item.agent.userName,
      name: "agent.userName"
    },
    {
      header: "Date",
      accessor: (item: any) => item.date,
      name: "date",
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

  return(
      resultData && resultData.length > 0 ? (
        <FullWidthList columns={columns} data={resultData} actionButtons={actionButtons}  orderBy="date" sortMethod="asc" />
      ) : (
        <StatusCardPic
            Icon="/contract-time.png"
            headline="No results yet"
            description="Get your campaign going and start with some signups."
        />
      )

  ) 
}
