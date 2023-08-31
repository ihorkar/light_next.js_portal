'use client'
import { useEffect, useMemo, useState } from "react";
import API from "@/utils/api/api";
import { useSession } from "next-auth/react";
import axios from "axios";
import FullWidthList from "../ui/lists/FullWidthList";
import { useRouter } from "next/navigation";
import { PencilIcon, UserMinusIcon } from "@heroicons/react/24/outline";
import Modal from "../ui/modal/Modal";
import DefaultInput from "../ui/elements/DefaultInput";
import DefaultSelect from "../ui/elements/DefaultSelect";
import { useUserData } from "@/utils/jotai";

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
      header: "Username",
      accessor: (item: any) => item.user.userId.userName,
      isBold: true,
      name: "user.userId.userName"
    },
    {
      header: "Email",
      accessor: (item: any) => item.user.userId.email,
      name: "user.userId.email"
    },
    {
      header: "IdentityId",
      accessor: (item: any) => item.user.userId.identityId,
      name: "user.userId.identityId"
    },
  ];

  const actionButtons = [
    {
      label: "Edit User",
      icon: <PencilIcon className="h-5 w-5 text-blue-500" />,
      onClick: handleEditModalOpen,
      visible: (item: any) => true
    },
    {
      label: "Delete User",
      icon: <UserMinusIcon className="h-5 w-5 text-red-500" />,
      onClick: handleDeleteModalOpen,
      visible: (item: any) => true
    }
  ];

  return (
    <>
    {organisationUsersData.length > 0 && <FullWidthList columns={columns} data={organisationUsersData} actionButtons={actionButtons} loggedUserIndex={loggedUserIndex} />}
    <Modal 
      visible={showRoleEditModal} 
      title="Edit user role"
      ok_text="Update"
      cancel_text="Cancel"
      onCancelClick={() => setShowRoleEditModal(false)} 
      onOkClick={handleEditUser}
    >      
        {modalData && <div className="mt-2 pl-10 space-y-8 pb-12 sm:space-y-0 sm:pb-0">
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
              UserName
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <DefaultInput 
                  name="username"
                  id="username"
                  autoComplete="username"
                  placeholder="username"
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
      title="Delete this user?"
      ok_text="Delete"
      cancel_text="Cancel"
      onCancelClick={() => setShowDeleteModal(false)} 
      onOkClick={handleDeleteUser}
    >
      <p className="mx-20">Do you want delete this user?</p>
    </Modal>
    </>
  );
}