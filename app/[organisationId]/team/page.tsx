'use client'

import { useState, useRef, ChangeEventHandler, ChangeEvent } from "react"
import SimpleHeader from "@/components/ui/headers/SimpleHeader"
import OrganisationUserList from "@/components/organisation/OrganisationUserList"
import DefaultButton from "@/components/ui/buttons/DefaultButton"
import Modal from "@/components/ui/modal/Modal"
import DefaultInput from "@/components/ui/elements/DefaultInput"
import API from "@/utils/api/api"
import { InvitationData } from "@/utils/data/types"
import DefaultSelect from "@/components/ui/elements/DefaultSelect"

export default function Page({ params }: {
    params: { organisationId: string}
  }) {
  
  const roleOptions = ["admin", "agent", "manager"];

  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("admin");
  const [isSentInvitation, setIsSentInvitation] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const formEl = useRef<HTMLFormElement>(null);

  const handleOnSendInvitation = () => {
    formEl?.current?.reportValidity();
    const userData: InvitationData = {email: userEmail, role: userRole};
    API.sendInvitation(params.organisationId, userData)
      .then(response => {
        if(response.status === 200) {
          setIsSentInvitation(true);
          console.log("The invitation has been sent successfully.");
        }
      })
      .catch(error => {
        if(error.response.status === 409) setIsInvalidEmail(true);
        console.log("Error while sending the invitation", error)
      })
  }

  const handelCloseModal = () => {
    setShowInvitationModal(false)
    setIsSentInvitation(false)
    setIsInvalidEmail(false)
  } 

  const handleChangeEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    setIsInvalidEmail(false)
    setUserEmail(e.target.value)
  }

  return (
    <div>
      <div className="inline-flex justify-between w-full">
        <SimpleHeader Headline= "Team" />
        <DefaultButton label="Invite crew" onClick={() => setShowInvitationModal(true)} />
      </div>
    
    <OrganisationUserList organisationId={params.organisationId} />
    <Modal 
      visible={showInvitationModal} 
      title="Invite a new memeber to your team."
      ok_text={isSentInvitation ? "OK" : "Invite"}
      cancel_text={isSentInvitation ? "" : "Cancel"} 
      onCancelClick={handelCloseModal} 
      onOkClick={!isSentInvitation ? handleOnSendInvitation : handelCloseModal}
    >      
      {!isSentInvitation ? 
      <form ref={formEl}>
        <div className="mt-2 pl-10 space-y-8 pb-12 sm:space-y-0 sm:pb-0">
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
              Email
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <DefaultInput 
                  name="email"
                  id="email"
                  autoComplete="email"
                  placeholder="email"
                  onChange={handleChangeEmailInput}
                  required
                  type={isInvalidEmail ? "warning" : "default"}
              />
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
              Role
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <DefaultSelect options={roleOptions} onChange={(e) => setUserRole(e.target.value)} selectedOption="admin" />
            </div>
          </div>
        </div>
      </form>
       : 
      <p>
        The invitation has been sent successfully.
      </p>}
    </Modal>
    </div>
  )
}