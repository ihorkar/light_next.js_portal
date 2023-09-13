'use client'

import { useEffect, useState } from "react";
import API from "@/utils/api/api";
import { useSession } from "next-auth/react";
import axios from "axios";
import FullWidthList from "../ui/lists/FullWidthList";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import Modal from "../ui/modal/Modal";
import { IconButtonProps } from "../ui/buttons/IconButton";

export default function UserOrganisationList() {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [modalData, setModalData] = useState<any>()
  const session = useSession();
  const [userOrganisations, setUserOrganisations] = useState<any[]>([])

  useEffect(() => {
    //@ts-ignore
    if (session.data?.accessToken) axios.defaults.headers.common["Authorization"] = `${session.data?.accessToken}`;
    getUserOrganisations();
  }, []);

  const getUserOrganisations = async () => {
    await API.getOrganisationsByUser()
      .then(response => {
            setUserOrganisations(response.data);
      })
      .catch(error => {
        console.log("Error while getting the User Organisations", error)
      })
  }

  const handleDeleteModalOpen = (data: any) => {
    setModalData(data);
    setShowDeleteModal(true);
  }

  const handleDeleteUser = () => {
    API.deleteUserOrganisations(modalData._id)
      .then(response => {
        if(response.status === 200) {
          setShowDeleteModal(false);
          getUserOrganisations();
        }
      })
      .catch(error => console.log("Error while deleting user data", error))
  };

  const columns = [
    {
      header: "OrganisationId",
      accessor: (item: any) => item.organisationId._id,
      name: "organisationId._id"
    },
    {
      header: "Name",
      accessor: (item: any) => item.organisationId.name,
      isBold: true,
      name: "organisationId.name"
    },
    {
      header: "Slug",
      accessor: (item: any) => item.organisationId.slug,
      name: "organisationId.slug"
    },
    {
      header: "User Role",
      accessor: (item: any) => item.role,
      name: "role"
    },
  ];

  const actionButtons: IconButtonProps[]  = [
    {
      label: "Delete User",
      icon: <ArrowRightOnRectangleIcon className="h-5 w-5" />,
      type:'critical',
      onClick: handleDeleteModalOpen,
      visible: (item: any) => true
    }
  ];

  return (
    <>
    {userOrganisations.length > 0 ? <FullWidthList columns={columns} data={userOrganisations} actionButtons={actionButtons} /> : <p className="mt-10 text-center text-lg text-gray-500">No Organisations</p>}
    <Modal
      visible={showDeleteModal} 
      title="Leaving organisation"
      ok_text="Delete"
      primarytype="critical"
      cancel_text="Cancel"
      onCancelClick={() => setShowDeleteModal(false)} 
      onOkClick={handleDeleteUser}
    >
      <p className="mx-20">Are you sure you want to leave this organisation? You will need a new invitation if you want to join again.</p>
    </Modal>
    </>
  );
}