'use client'

import { useState, useRef, ChangeEventHandler, ChangeEvent, useCallback } from "react"
import SimpleHeader from "@/components/ui/headers/SimpleHeader"
import OrganisationUserList from "@/components/organisation/OrganisationUserList"
import DefaultButton from "@/components/ui/buttons/DefaultButton"
import Modal from "@/components/ui/modal/Modal"
import DefaultInput from "@/components/ui/elements/DefaultInput"
import API from "@/utils/api/api"
import { InvitationData } from "@/utils/data/types"
import DefaultSelect from "@/components/ui/elements/DefaultSelect"
import HeaderWithDescription from "@/components/ui/headers/HeaderWithDescription"
import { ISelectOption } from "@/components/ui/elements/DefaultSelect"
import { SingleValue, ActionMeta } from "react-select";

export default function Page({ params }: {
    params: { organisationId: string}
  }) {
  
  const roleOptions: ISelectOption[] = [
    {label: "admin"},
    {label: "manager"},
    {label: "agent"}
  ]

  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState<ISelectOption>(roleOptions[0]);
  const [isSentInvitation, setIsSentInvitation] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const formEl = useRef<HTMLFormElement>(null);

  const handleOnSendInvitation = useCallback(() => {
    const validated = formEl?.current?.reportValidity();
    if(validated) {
      const userData: InvitationData = {email: userEmail, role: userRole.label};
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
  }, [userEmail, userRole]) 

  const handelCloseModal = useCallback(() => {
    setShowInvitationModal(false)
    setIsSentInvitation(false)
    setIsInvalidEmail(false)
  }, [])

  const handleChangeEmailInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setIsInvalidEmail(false)
    setUserEmail(e.target.value)
  }, [])

  const handleChangeUserRoleInput = useCallback((newValue: SingleValue<ISelectOption>, actionMeta: ActionMeta<ISelectOption>) => {
    if(newValue) {
      setUserRole(newValue)
    }
  }, [])

  const handleInviteButtonClick = useCallback(() => {
    setShowInvitationModal(true)
  }, [])

  return (
    <div>
      <HeaderWithDescription 
        Headline="Team"
        Description="Manage access, define roles, and set the stage for a successful crew."
        type="page"
        PrimaryButtonLabel="Invite members"
        PrimaryButtononClick={handleInviteButtonClick}
      />
    
    <OrganisationUserList organisationId={params.organisationId} />
    <Modal 
      visible={showInvitationModal} 
      title="Member Invitation"
      ok_text={isSentInvitation ? "OK" : "Invite"}
      cancel_text={isSentInvitation ? undefined : "Cancel"} 
      onCancelClick={handelCloseModal} 
      onOkClick={isSentInvitation ? handelCloseModal : handleOnSendInvitation}
      type="primary"
    >      
      {!isSentInvitation ? 
      <form ref={formEl}>
        <div className="space-y-8 sm:space-y-0">
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4">
            <label htmlFor="Email" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
              Email
            </label>
            <div className="sm:col-span-2">
              <DefaultInput 
                  name="email"
                  id="email"
                  autoComplete="email"
                  placeholder="john@myorganisation.com"
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
            <div className="sm:col-span-2">
              <DefaultSelect options={roleOptions} onChange={handleChangeUserRoleInput} selectedOption={userRole} />
            </div>
          </div>
        </div>
      </form>
       : 
      <p className="w-[540px]">
        Your invitation has been sent successfully. Please keep in mind that invitations can only be sent to existing platform members. If the intended recipient is not yet a member, kindly suggest they sign up before sending the invitation. This will ensure they receive your invitation promptly.
      </p>}
    </Modal>
    </div>
  )
}