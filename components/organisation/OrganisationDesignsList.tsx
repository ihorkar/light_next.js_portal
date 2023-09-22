'use client'
import { useEffect, useState } from "react";
import API from "@/utils/api/api";
import { useSession } from "next-auth/react";
import axios from "axios";
import FullWidthList from "../ui/lists/FullWidthList";
import { useRouter } from "next/navigation";
import { PencilIcon, TrashIcon, DocumentCheckIcon } from "@heroicons/react/24/outline";
import { IconButtonProps } from "../ui/buttons/IconButton";
import StatusCardPic from "../ui/cards/StatusCardPic";
import Notiflix from "notiflix";

interface ListProps {
    organisationId: string;
    handleRefresh: () => void
  }

export default function OrganisationDesignsList({ organisationId, handleRefresh }: ListProps) {
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
      if(response.status === 200) setFormData(response.data);
    });
  };

  const handleEditForm = (form: any) => {
    router.push(`/${organisationId}/campaign/${form._id}/setup`);
  };

  const handleDeleteForm = (form: any) => {
    API.deleteOrganisationFormByID(organisationId, form._id)
      .then(response => {
        if(response.status === 201) {
          Notiflix.Notify.success("Deleted the design successfully!")
          handleGetFormData()
        }
      })
  };

  const handleActivateForm = async (form: any) => {
    const formElement = await API.getOrganisationFormByID(organisationId, form._id);

    if(formElement.data.form.pages.length > 0 && formElement.data.project !== "" && formElement.data.formDescription !== "") {
      API.definitiveForm(organisationId, form._id)
        .then(response => {
          if(response.status === 201) {
            handleGetFormData()
            handleRefresh()
          }
        })
        .catch(error => {
          alert("Please check your connection!")
        })
    } else {
      alert("Not allowed to activate form")
    }
  };

  const columns = [
    {
      header: "Description",
      accessor: (item: any) => item.formDescription,
      isBold: false,
      name: "description"
    },
    {
      header: "Design",
      accessor: (item: any) => item.project,
      isBold: true,
      name: "project"
    }
  ];

  const actionButtons: IconButtonProps[]  = [
    {
      label: "Edit Form",
      icon: <PencilIcon className="h-5 w-5" />,
      onClick: handleEditForm,
      type: 'default',
      visible: (item: any) => true
    },
    {
      label: "Activate Form",
      icon: <DocumentCheckIcon className='h-5 w-5' />,
      type: 'success',
      onClick: handleActivateForm,
      visible: (item: any) => true
    },
    {
      label: "Delete Form",
      icon: <TrashIcon className="h-5 w-5" />,
      onClick: handleDeleteForm,
      type: 'critical',
      visible: (item: any) => true
    }
  ];

  return(
    formData && formData.length > 0 ? (
      <FullWidthList columns={columns} data={formData} actionButtons={actionButtons} />
    ) : (
      <div className="flex">
        <StatusCardPic
            Icon="/launch.png"
            headline="Let's design a new project!"
            description="Use our form builder to design your project, once done activate the design and you're all set!"
        />
      </div>
    )
  )
}
