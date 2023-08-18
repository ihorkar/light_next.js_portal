'use client'
import { useEffect, useState } from "react";
import API from "@/utils/api/api";
import { useSession } from "next-auth/react";
import axios from "axios";
import FullWidthList from "../ui/lists/FullWidthList";
import { useRouter } from "next/navigation";
import { PencilIcon, UserMinusIcon } from "@heroicons/react/24/outline";

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

  const handleEditUser = (user: any) => {
    // Logic for editing a user goes here
    console.log("Editing user: ", user.userId.identityId);
  };

  const handleDeleteUser = (user: any) => {
      // Logic for deleting a user goes here
      console.log("Deleting user: ", user.userId.identityId);
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

  const actionButtons = [
    {
      label: "Edit User",
      icon: <PencilIcon className="h-5 w-5 text-blue-500" />,
      onClick: handleEditUser,
    },
    {
      label: "Delete User",
      icon: <UserMinusIcon className="h-5 w-5 text-red-500" />,
      onClick: handleDeleteUser,
    }
  ];

  return <FullWidthList columns={columns} data={userData} actionButtons={actionButtons} />;
}