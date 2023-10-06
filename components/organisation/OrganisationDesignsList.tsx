'use client'
import { useEffect, useState } from "react";
import API from "@/utils/api/api";
import { useSession } from "next-auth/react";
import axios from "axios";
import Notiflix from "notiflix";
import { useRouter } from "next/navigation";
import { PencilIcon, TrashIcon, DocumentCheckIcon } from "@heroicons/react/24/outline";
import FullWidthList from "../ui/lists/FullWidthList";
import { IconButtonProps } from "../ui/buttons/IconButton";
import StatusCardPic from "../ui/cards/StatusCardPic";
import Modal from "../ui/modal/Modal";

interface ListProps {
    organisationId: string;
    handleRefresh: () => void
  }

export default function OrganisationDesignsList({ organisationId, handleRefresh }: ListProps) {
  const [formData, setFormData] = useState<any[]>([]);
  const [showActivateModal, setShowActivateModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [selectForm, setSelectForm] = useState<any>()
  const session = useSession();

  const router = useRouter();

  useEffect(() => {
    //@ts-ignore
    if (session.data?.accessToken) axios.defaults.headers.common["Authorization"] = `${session.data?.accessToken}`;
    handleGetFormData();
  }, []);

  const handleOnclickActivate = (form: any) => {
    setShowActivateModal(true)
    setSelectForm(form)
  }

  const handleOnclickDelete = (form: any) => {
    setShowDeleteModal(true)
    setSelectForm(form)
  }

  const handleGetFormData = async () => {
    await API.getFormsByOrganisation(organisationId, false).then(response => {
      if(response.status === 200) setFormData(response.data);
    });
  };

  const handleEditForm = (form: any) => {
    router.push(`/${organisationId}/campaign/${form._id}/setup`);
  };

  const handleDeleteForm = () => {
    API.deleteOrganisationFormByID(organisationId, selectForm._id)
      .then(response => {
        if(response.status === 201) {
          Notiflix.Notify.success("Deleted the design successfully!")
          handleGetFormData()
        }
      })
    setShowDeleteModal(false)
  };

  const handleActivateForm = async () => {
    const formElement = await API.getOrganisationFormByID(organisationId, selectForm._id);

    console.log(formElement.data, "111")

    if(formElement.data.form.pages.length > 0 && formElement.data.project !== "" && formElement.data.formDescription !== "") {
      API.definitiveForm(organisationId, selectForm._id)
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
    setShowActivateModal(false)
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
      onClick: handleOnclickActivate,
      visible: (item: any) => true
    },
    {
      label: "Delete Form",
      icon: <TrashIcon className="h-5 w-5" />,
      onClick: handleOnclickDelete,
      type: 'critical',
      visible: (item: any) => true
    }
  ];

  return(
    <div>
      {formData && formData.length > 0 ? (
        <FullWidthList columns={columns} data={formData} actionButtons={actionButtons} />
      ) : (
        <div className="flex">
          <StatusCardPic
              Icon="/launch.png"
              headline="Let's design a new project!"
              description="Use our form builder to design your project, once done activate the design and you're all set!"
          />
        </div>
      )}
      <Modal
        visible={showActivateModal}
        title=""
        onOkClick={handleActivateForm}
        onCancelClick={() => setShowActivateModal(false)}
        ok_text="Activate"
        cancel_text="Cancel"
        primarytype="primary"
        secondarytype="secondary"
      >
        <p>Do you really want to activate the form?</p>
      </Modal>
      <Modal
        visible={showDeleteModal}
        title=""
        onOkClick={handleDeleteForm}
        onCancelClick={() => setShowDeleteModal(false)}
        ok_text="Delete"
        cancel_text="Cancel"
        primarytype="critical"
        secondarytype="secondary"
      >
        <p>Do you really want to delete the form?</p>
      </Modal>
    </div>
  )
}
