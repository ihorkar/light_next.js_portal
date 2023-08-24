'use client'
import { useEffect, useState } from "react";
import API from "@/utils/api/api";
import { useSession } from "next-auth/react";
import axios from "axios";
import FullWidthList from "../ui/lists/FullWidthList";
import { useRouter } from "next/navigation";
import { PowerIcon, ArchiveBoxIcon } from "@heroicons/react/24/outline";

interface ListProps {
    organisationId: string;
  }

export default function OrganisationFormsList({ organisationId }: ListProps) {
  const [formData, setFormData] = useState<any[]>([]);
  const session = useSession();

  const router = useRouter();

  useEffect(() => {
    //@ts-ignore
    if (session.data?.accessToken) axios.defaults.headers.common["Authorization"] = `${session.data?.accessToken}`;
    handleGetFormData();
  }, []);

  const handleGetFormData = async () => {
    await API.getFormsByOrganisation(organisationId, true).then(response => {
      if (response.data.length > 0) setFormData(response.data);
    });
  };

  const handleToggleActive = (form: any) => {
    // Logic to toggle form activity
  };

  const handleArchiveForm = (form: any) => {
      // Logic to archive the form
  };

  const columns = [
    {
      header: "Project",
      accessor: (item: any) => item._id,
    },
    {
      header: "Description",
      accessor: (item: any) => item.formDescription,
      isBold: true,
    },
    {
      header: "Name",
      accessor: (item: any) => item.project,
      isBold: true,
    }
  ];

  const actionButtons = [
    {
      label: "Toggle Active",
      icon: <PowerIcon className="h-5 w-5 text-blue-500" />,
      onClick: handleToggleActive,
    },
    {
      label: "Archive Form",
      icon: <ArchiveBoxIcon className="h-5 w-5 text-red-500" />,
      onClick: handleArchiveForm,
    }
  ];


  return <FullWidthList columns={columns} data={formData} actionButtons={actionButtons}  />;
}
