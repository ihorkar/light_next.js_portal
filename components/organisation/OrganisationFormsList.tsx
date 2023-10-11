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
  const [showActiveConfirmedModal, setShowActiveConfirmedModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState<boolean>(false);
  const [showArchiveConfirmedModal, setShowArchiveConfirmedModal] = useState(false)
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
          setShowActiveConfirmedModal(true)
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
          setShowActiveConfirmedModal(true)
        }
      })
      .catch(error => console.log("Error while creating organisation", error))
  };

  const handleArchiveForm = () => {
    API.applyArchiveForm(organisationId, individualForm._id)
    .then(response => {
      if(response.status === 201){
        handleGetFormData()
        setShowArchiveConfirmedModal(true)
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
        cancel_text="Cancel"
        type={individualForm?.active ? "critical" : "primary"}
      >
        {individualForm?.active ? <p>Upon deactivation of the form, access will be unavailable to your crew. Crew members actively using the form will lose access upon their devices synchronizing with the internet.</p> : <p>Once activated, the form will be accessible for use by your crew members.</p>}
      </Modal>
      <Modal
        visible={showActiveConfirmedModal}
        onOkClick={() => setShowActiveConfirmedModal(false)}
        onCancelClick={() => setShowActiveConfirmedModal(false)}
        title={individualForm?.active ? "Deactivated the form successfully!": "Activated the form successfully!"}
        ok_text="Confirm"
        type="confirmation"
      >
      </Modal>
      <Modal
        visible={showArchiveModal}
        onOkClick={handleArchiveForm}
        onCancelClick={() => setShowArchiveModal(false)}
        title="Archive the form?"
        ok_text="Archive"
        cancel_text="Cancel"
        type="critical"
      >
        <p>Once the form is archived, reactivation will not be possible. However, your results will still be accessible.</p>
      </Modal>
      <Modal
        visible={showArchiveConfirmedModal}
        onOkClick={() => setShowArchiveConfirmedModal(false)}
        onCancelClick={() => setShowArchiveConfirmedModal(false)}
        title="Archived the form successfully!"
        ok_text="Archive"
        type="confirmation"
      >
      </Modal>
    </div>
  )
}
