'use client'
import { useEffect, useState } from "react";
import API from "@/utils/api/api";
import { useSession } from "next-auth/react";
import axios from "axios";
import FullWidthList from "../ui/lists/FullWidthList";
import { useRouter } from "next/navigation";
import { PowerIcon, ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { IconButtonProps } from "../ui/buttons/IconButton";
import StatusCardPic from "../ui/cards/StatusCardPic";

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
      header: "Description",
      accessor: (item: any) => item.formDescription,
      isBold: false,
      name: "formDescription"
    },
    {
      header: "Name",
      accessor: (item: any) => item.project,
      isBold: true,
      name: "project"
    }
  ];

  const actionButtons: IconButtonProps[] = [
    {
      label: "Toggle Active",
      icon: <PowerIcon className='h-5 w-5' />,
      onClick: handleOnclickActive,
      type: 'critical',
      visible: (item: any) => !item.active
    },
    {
      label: "Toggle Deactive",
      icon: <PowerIcon  className='h-5 w-5' />,
      onClick: handleOnclickActive,
      type: 'success',
      visible: (item: any) => item.active
    },
    {
      label: "Archive Form",
      icon: <ArchiveBoxIcon className='h-5 w-5' />,
      onClick: handleArchiveForm,
      type: 'default',
      visible: (item: any) => !item.active
    }
  ];

  return(
    formData && formData.length > 0 ? (
      <FullWidthList columns={columns} data={formData} actionButtons={actionButtons} />
    ) : (
      <StatusCardPic
          Icon="/search-doc.png"
          headline="No projects"
          description="To be able to signup you first need to design a new project and activate it."
      />
    )
  )
}
