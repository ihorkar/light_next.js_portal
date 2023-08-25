'use client'
import { useEffect, useState } from "react";
import API from "@/utils/api/api";
import { useSession } from "next-auth/react";
import axios from "axios";
import FullWidthList from "../ui/lists/FullWidthList";
import { useRouter } from "next/navigation";
import { UserPlusIcon  } from "@heroicons/react/24/outline";
import Modal from "../ui/modal/Modal";

export default function UserInvitationList() {
  const [showAcceptModal, setShowAcceptModal] = useState(false)
  const [modalData, setModalData] = useState<any>()
  const router = useRouter()
  const session = useSession();
  const [userInvitations, setUserInvitations] = useState<any[]>([])

  useEffect(() => {
    //@ts-ignore
    if (session.data?.accessToken) axios.defaults.headers.common["Authorization"] = `${session.data?.accessToken}`;
    getUserInvitations();
  }, []);

  const getUserInvitations = async () => {
    await API.getUserInvitations()
      .then(response => {
        if (response.data.length > 0){
            const invitations = response.data;
            let pendingInvitations: any[] = [];
            invitations.map((invitation: any) => {
                if(!invitation.used) pendingInvitations.push(invitation)
            })
            setUserInvitations(pendingInvitations);
        }
      })
      .catch(error => {
        if(error.response.status === 404) router.push('/restricted')
      })
  }

  const handleAcceptInvitationModalOpen = (data: any) => {
    setModalData(data);
    setShowAcceptModal(true);
  }

  const handleAcceptUser = () => {
    API.acceptInvitation(modalData.token)
      .then(response => {
        if(response.status === 200) {
          setShowAcceptModal(false);
          getUserInvitations();
        }
      })
      .catch(error => console.log("Error while deleting user data", error))
  };

  const columns = [
    {
      header: "InvitationId",
      accessor: (item: any) => item._id,
    },
    {
      header: "Organisation Name",
      accessor: (item: any) => item.organisationId.name,
      isBold: true,
    },
    {
      header: "Organisation Slug",
      accessor: (item: any) => item.organisationId.slug,
    },
    {
      header: "Role",
      accessor: (item: any) => item.userRole,
    },
    {
      header: "Accepted",
      accessor: (item: any) => item.used ? 'true' : 'false',
    }
  ];

  const actionButtons = [
    {
      label: "Accept",
      icon: <UserPlusIcon className="h-5 w-5 text-red-500" />,
      onClick: handleAcceptInvitationModalOpen,
    }
  ];

  return (
    <>
    {userInvitations.length > 0 ? <FullWidthList columns={columns} data={userInvitations} actionButtons={actionButtons} /> : <p className="mt-10 text-center text-lg text-gray-500">No Invitations</p>}
    <Modal
      visible={showAcceptModal} 
      title="Accept this invitation?"
      ok_text="Accept"
      cancel_text="Cancel"
      onCancelClick={() => setShowAcceptModal(false)} 
      onOkClick={handleAcceptUser}
    >
      <p className="mx-20">Are you sure to accept thie invitation?</p>
    </Modal>
    </>
  );
}