'use client'
import { useEffect, useState } from "react";
import API from "@/utils/api/api";
import { useSession } from "next-auth/react";
import axios from "axios";
import FullWidthList from "../ui/lists/FullWidthList";

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

  const columns = [
    {
      header: "Result",
      accessor: (item: any) => item._id,
    },
    {
      header: "Form",
      accessor: (item: any) => item.form,
      isBold: true,
    },
    {
      header: "Agent",
      accessor: (item: any) => item.agent.userName,
    },
    {
      header: "Date",
      accessor: (item: any) => item.date,
    },
  ];

  return <FullWidthList columns={columns} data={resultData} />;
}
