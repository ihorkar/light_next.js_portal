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
  const [toggleActive, setToggleActive] = useState(true)
  const session = useSession();

  const router = useRouter();

  function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
  }

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
    API.deactivateOrganisationForm(organisationId, form._id)
      .then(response => {
        setToggleActive(true)
      })
      .catch(error => console.log("Error while creating organisation", error))
  };

  const handleToggleDeactive = (form: any) => {
    API.activateOrganisationForm(organisationId, form._id)
      .then(response => {
        setToggleActive(false)
      })
      .catch(error => console.log("Error while creating organisation", error))
  };
  const handleArchiveForm = (form: any) => {
    API.updateArchiveForm(organisationId, form._id)
    .then(response => {
      alert("Archived successfully!")
    })
    .catch(error => console.log("Errors while updating archived form", error))
  };

  const columns = [
    {
      header: "Project",
      accessor: (item: any) => item._id,
      name: "_id"
    },
    {
      header: "Description",
      accessor: (item: any) => item.formDescription,
      isBold: true,
      name: "formDescription"
    },
    {
      header: "Name",
      accessor: (item: any) => item.project,
      isBold: true,
      name: "project"
    }
  ];

  const actionButtons = [
    {
      label: "Toggle Active",
      icon: <PowerIcon className={classNames(
          toggleActive ? 'text-red-500' : 'text-blue-500',
          'h-5 w-5'
        )} />,
      onClick: !toggleActive ? handleToggleActive : handleToggleDeactive,
    },
    {
      label: "Archive Form",
      icon: <ArchiveBoxIcon className={classNames(
          toggleActive ? '' : 'hidden',
          'h-5 w-5 text-blue-500'
        )} />,
      onClick: handleArchiveForm,
    }
  ];


  return <FullWidthList columns={columns} data={formData} actionButtons={actionButtons}  />;
}
