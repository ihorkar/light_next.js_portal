'use client'
import { useEffect, useState } from "react";
import API from "@/utils/api/api";
import { useSession } from "next-auth/react";
import axios from "axios";
import FullWidthList from "../ui/lists/FullWidthList";
import { useRouter } from "next/navigation";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

interface ListProps {
    organisationId: string;
  }

export default function OrganisationDesignsList({ organisationId }: ListProps) {
  const [formData, setFormData] = useState<any[]>([]);
  const session = useSession();

  const router = useRouter();

  useEffect(() => {
    //@ts-ignore
    if (session.data?.accessToken) axios.defaults.headers.common["Authorization"] = `${session.data?.accessToken}`;
    handleGetFormData();
  }, []);

  const handleGetFormData = async () => {
    await API.getFormsByOrganisation(organisationId, false).then(response => {
      if (response.data.length > 0) setFormData(response.data);
    });
  };

  const handleEditForm = (form: any) => {
      router.push(`/${organisationId}/campaign/${form._id}/setup`);
  };

  const handleDeleteForm = (form: any) => {
      // Logic for deleting a user goes here
  };

  const columns = [
    {
      header: "Design",
      accessor: (item: any) => item._id,
      name: "_id"
    },
    {
      header: "Project",
      accessor: (item: any) => item.project,
      isBold: true,
      name: "project"
    }
  ];

  const actionButtons = [
    {
      label: "Edit Form",
      icon: <PencilIcon className="h-5 w-5 text-blue-500" />,
      onClick: handleEditForm,
      visible: (item: any) => true
    },
    {
      label: "Delete Form",
      icon: <TrashIcon className="h-5 w-5 text-red-500" />,
      onClick: handleDeleteForm,
      visible: (item: any) => true
    }
  ];


  return <FullWidthList columns={columns} data={formData} actionButtons={actionButtons}  />;
}
