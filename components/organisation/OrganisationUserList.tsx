'use client'
import { useEffect, useState } from "react";
import API from "@/utils/api/api";
import { useSession } from "next-auth/react";
import axios from "axios";
import FullWidthList from "../ui/lists/FullWidthList";
import { useRouter } from "next/navigation";

interface ListProps {
    organisationId: string;
  }

export default function OrganisationUserList({ organisationId }: ListProps) {
  const [userData, setUserData] = useState<any[]>([]);
  const router = useRouter()
  const session = useSession();

  useEffect(() => {
    //@ts-ignore
    if (session.data?.accessToken) axios.defaults.headers.common["Authorization"] = `${session.data?.accessToken}`;
    handleGetUserData();
  }, []);

  const handleGetUserData = async () => {
    await API.getUsersByOrganisation(organisationId)
        .then(response => {
        if (response.data.length > 0) setUserData(response.data);
        })
        .catch(error => {
            if(error.response.status === 404) router.push('/restricted')
        })
  };

  const columns = [
    {
      header: "Role",
      accessor: (item: any) => item.role,
    },
    {
      header: "Username",
      accessor: (item: any) => item.userId.userName,
      isBold: true,
    },
    {
      header: "Email",
      accessor: (item: any) => item.userId.email,
    },
    {
      header: "IdentityId",
      accessor: (item: any) => item.userId.identityId,
    },
  ];

  return <FullWidthList columns={columns} data={userData} />;
}
