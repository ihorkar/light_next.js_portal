'use client'
import { useEffect, useState } from "react";
import API from "@/utils/api/api";
import { useSession } from "next-auth/react";
import axios from "axios";
import FullWidthList from "../ui/lists/FullWidthList";
import { useRouter } from "next/navigation";
import { PowerIcon, ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { IconButtonProps } from "../ui/buttons/IconButton";
import Modal from "../ui/modal/Modal";
import StatusCardPic from "../ui/cards/StatusCardPic";
import Notiflix from "notiflix";

interface ListProps {
  organisationId: string;
  refreshHandler: boolean;
}

export default function OrganisationFormsList({ organisationId, refreshHandler }: ListProps) {
  const [formData, setFormData] = useState<any[]>([]);
  const [showActiveModal, setShowActiveModal] = useState<boolean>(false);
  const [showArchiveModal, setShowArchiveModal] = useState<boolean>(false);
  const [individualForm, setIndividualForm] = useState<any>()
  const session = useSession();

  const router = useRouter()

  useEffect(() => {
    handleGetFormData()
  }, [refreshHandler])

  useEffect(() => {
    //@ts-ignore
    if (session.data?.accessToken) axios.defaults.headers.common["Authorization"] = `${session.data?.accessToken}`;
    handleGetFormData();
  }, []);

  const handleGetFormData = async () => {
    await API.getFormsByOrganisation(organisationId, true)
    .then(response => {
      if(response.status === 200) setFormData(response.data);
    })
    .catch(error => {
      if(error.response.status === 500) router.push('/service-unavailabled')
    });
  };

  const handleOnclickActive = (form: any) => {
    setShowActiveModal(true)
    setIndividualForm(form)
  }

  const handleOnclickArchive = (form: any) => {
    setShowArchiveModal(true)
    setIndividualForm(form)
  }

  const handleActiveOkBtn = () => {
    if(individualForm.active){
      handleToggleDeactive(individualForm)
    }else{
      handleToggleActive(individualForm)
    }
    setShowActiveModal(false)
  }

  const handleToggleActive = (form: any) => {
    API.activateOrganisationForm(organisationId, form._id)
      .then(response => {
        if(response.status === 201){
          handleGetFormData()
        }
      })
      .catch(error => {
        if(error.response.status === 404) {
          Notiflix.Notify.failure(error.response.data.message)
        }
      })
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

  const handleArchiveForm = () => {
    API.applyArchiveForm(organisationId, individualForm._id)
    .then(response => {
      if(response.status === 201){
        handleGetFormData()
      }
    })
    .catch(error => console.log("Errors while updating archived form", error))
    setShowArchiveModal(false)
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
      onClick: handleOnclickArchive,
      type: 'default',
      visible: (item: any) => !item.active
    }
  ];

  return(
    <div>
      {formData && formData.length > 0 ? (
        <FullWidthList columns={columns} data={formData} actionButtons={actionButtons} />
      ) : (
        <StatusCardPic
            Icon="/search-doc.png"
            headline="No projects"
            description="To be able to signup you first need to design a new project and activate it."
        />
      )}
      <Modal
        visible={showActiveModal}
        onOkClick={handleActiveOkBtn}
        onCancelClick={() => setShowActiveModal(false)}
        title={individualForm?.active ? "Deactivate the form?": "Activate the form?"}
        ok_text={individualForm?.active ? "Deactivate": "Activate"}
        cancel_text={individualForm?.active? undefined :"Cancel"}
        type={individualForm?.active ? "critical" : "confirmation"}
      >
        {individualForm?.active ? <p>Are you sure you want to deactivate the form?</p> : <p>Are you sure you want to activate the form?</p>}
      </Modal>
      <Modal
        visible={showArchiveModal}
        onOkClick={handleArchiveForm}
        onCancelClick={() => setShowArchiveModal(false)}
        title="Archive the form"
        ok_text="Archive"
        cancel_text="Cancel"
        type="critical"
      >
        <p>Do you really want to archive the form?</p>
      </Modal>
    </div>
  )
}
