'use client'
import { useEffect, useMemo, useState } from "react";
import API from "@/utils/api/api";
import { useSession } from "next-auth/react";
import axios from "axios";
import FullWidthList from "../ui/lists/FullWidthList";
import { useRouter } from "next/navigation";
import { PencilIcon, UserMinusIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import Modal from "../ui/modal/Modal";
import DefaultInput from "../ui/elements/DefaultInput";
import DefaultSelect from "../ui/elements/DefaultSelect";
import { useUserData } from "@/utils/jotai";
import { IconButtonProps } from "../ui/buttons/IconButton";

interface ListProps {
  organisationId: string;
}

export default function OrganisationUserList({ organisationId }: ListProps) {
  const [userData] = useUserData()
  const [organisationUsersData, setOrganisationUsersData] = useState<any[]>([]);
  const [showRoleEditModal, setShowRoleEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [modalData, setModalData] = useState<any>()
  const [updatedUserRole, setUpdatedUserRole] = useState<string>("");
  const [loggedUserIndex, setLoggedUserIndex] = useState<number | undefined>()

  const router = useRouter()
  const session = useSession();

  const roleOptions = ["admin", "agent", "manager"];

  useEffect(() => {
    //@ts-ignore
    if (session.data?.accessToken) axios.defaults.headers.common["Authorization"] = `${session.data?.accessToken}`;
    handleGetUserData();
  }, []);

  const handleGetUserData = async () => {
    await API.getUsersByOrganisation(organisationId)
      .then(response => {
        if (response.data.length > 0){
          setOrganisationUsersData(response.data);
          response.data.map((item: any, index: number) => {
            if(item.isLoggedUser) setLoggedUserIndex(index)
          })
        }
      })
      .catch(error => {
        if(error.response.status === 404) router.push('/restricted')
        if(error.response.status === 500) router.push('/service-unavailabled')
      })
  };

  const handleEditModalOpen = (user: any) => {
    console.log(user, "user user user")
    setModalData(user);
    setShowRoleEditModal(true)
  };

  const handleDeleteModalOpen = (user: any) => {
    setModalData(user);
    setShowDeleteModal(true);
  }

  const handleEditUser = () => {
    API.updateOrganisationUsers(organisationId, {userId: modalData.user.userId._id, role: modalData.user.role, updatedRole: updatedUserRole})
      .then(response => {
        if(response.status === 200) {
          setShowRoleEditModal(false)
          handleGetUserData();
        }
      })
      .catch(error => console.log("Error while updatng user data", error))
  }

  const handleDeleteUser = () => {
    API.deleteOrganisationUsers(organisationId, {userId: modalData.user.userId._id, role: modalData.user.role})
      .then(response => {
        if(response.status === 200) {
          setShowDeleteModal(false);
          handleGetUserData();
        }
      })
      .catch(error => console.log("Error while deleting user data", error))
  };

  const columns = [
    {
      header: "Role",
      accessor: (item: any) => item.user.role,
      name: "user.role"
    },
    {
      header: "Member",
      accessor: (item: any) => item.user.userId.userName,
      isBold: true,
      name: "user.userId.userName"
    },
    {
      header: "Email",
      accessor: (item: any) => item.user.userId.email,
      name: "user.userId.email"
    },
  ];

  const actionButtons: IconButtonProps[]   = [
    {
      label: "Edit Membership",
      icon: <PencilIcon className="h-5 w-5" />,
      type: 'default',
      onClick: handleEditModalOpen,
      visible: (item: any) => true
    },
    {
      label: "Remove User",
      icon: <UserMinusIcon className="h-5 w-5" />,
      type: 'critical',
      onClick: handleDeleteModalOpen,
      visible: (item: any) => true
    },
    {
      label: "User Info",
      icon: <InformationCircleIcon className="h-5 w-5" />,
      type: 'default',
      onClick: (item) => router.push(`/${organisationId}/team/${item.user.userId._id}`),
      visible: (item: any) => true
    }
  ];

  return (
    <>
    {organisationUsersData.length > 0 && <FullWidthList columns={columns} data={organisationUsersData} actionButtons={actionButtons} loggedUserIndex={loggedUserIndex} />}
    <Modal 
      visible={showRoleEditModal} 
      title="Change Membership"
      ok_text="Change"
      cancel_text="Cancel"
      onCancelClick={() => setShowRoleEditModal(false)} 
      onOkClick={handleEditUser}
      type="secondary"
    >      
        {modalData && <div className="mt-2 pl-10 space-y-8 pb-12 sm:space-y-0 sm:pb-0">
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label htmlFor="Member" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
              Member
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <DefaultInput 
                  name="Username"
                  id="username"
                  autoComplete="username"
                  placeholder="JDoe"
                  onChange={() => {}}
                  disabled
                  value={modalData?.user.userId?.userName}
              />
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
              Role
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <DefaultSelect options={roleOptions} onChange={(e) => setUpdatedUserRole(e.target.value)} selectedOption={modalData?.user.role} />
            </div>
          </div>
        </div>}
    </Modal>
    <Modal
      visible={showDeleteModal} 
      title="Revoke membership"
      ok_text="Revoke"
      type="critical"
      cancel_text="Cancel"
      onCancelClick={() => setShowDeleteModal(false)} 
      onOkClick={handleDeleteUser}
    >
      <p className="w-[450px]">Are you sure you want to revoke this user&rsquo;s access to your organization? They will need to be invited again.</p>
    </Modal>
    </>
  );
}