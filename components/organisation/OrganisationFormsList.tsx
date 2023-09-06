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
    refreshHandler: boolean;
  }

export default function OrganisationFormsList({ organisationId, refreshHandler }: ListProps) {
  const [formData, setFormData] = useState<any[]>([]);
  const session = useSession();

  useEffect(() => {
    handleGetFormData()
  }, [refreshHandler])

  useEffect(() => {
    //@ts-ignore
    if (session.data?.accessToken) axios.defaults.headers.common["Authorization"] = `${session.data?.accessToken}`;
    handleGetFormData();
  }, []);

  const handleGetFormData = async () => {
    await API.getFormsByOrganisation(organisationId, true).then(response => {
      if(response.status === 200) setFormData(response.data);
    });
  };

  const handleOnclickActive = (form: any) => {
    if(form.active){
      handleToggleDeactive(form)
    }else{
      handleToggleActive(form)
    }
  }

  const handleToggleActive = (form: any) => {
    API.activateOrganisationForm(organisationId, form._id)
      .then(response => {
        if(response.status === 201){
          handleGetFormData()
        }
      })
      .catch(error => console.log("Error while creating organisation", error))
  };

  const handleToggleDeactive = (form: any) => {
    API.deactivateOrganisationForm(organisationId, form._id)
      .then(response => {
        if(response.status === 201){
          handleGetFormData()
        }
      })
      .catch(error => console.log("Error while creating organisation", error))
  };

  const handleArchiveForm = (form: any) => {
    API.applyArchiveForm(organisationId, form._id)
    .then(response => {
      if(response.status === 201){
        handleGetFormData()
      }
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
      icon: <PowerIcon className='text-red-500 h-5 w-5' />,
      onClick: handleOnclickActive,
      visible: (item: any) => !item.active
    },
    {
      label: "Toggle Deactive",
      icon: <PowerIcon  className='text-blue-500 h-5 w-5' />,
      onClick: handleOnclickActive,
      visible: (item: any) => item.active
    },
    {
      label: "Archive Form",
      icon: <ArchiveBoxIcon className='h-5 w-5 text-blue-500' />,
      onClick: handleArchiveForm,
      visible: (item: any) => !item.active
    }
  ];

  return <FullWidthList columns={columns} data={formData} actionButtons={actionButtons} />
  
}
