'use client'

import { useState, useRef, ChangeEvent, useCallback } from "react"
import OrganisationFormsList from "@/components/organisation/OrganisationFormsList"
import DefaultButton from "@/components/ui/buttons/DefaultButton"
import Modal from "@/components/ui/modal/Modal"
import DefaultInput from "@/components/ui/elements/DefaultInput"
import API from "@/utils/api/api"
import { useRouter } from "next/navigation"
import OrganisationDesignsList from "@/components/organisation/OrganisationDesignsList"
import HeaderWithDescription from "@/components/ui/headers/HeaderWithDescription"


export default function Page({ params }: {
  params: { organisationId: string}
}) {

  const [showShowCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [isSentProject, setIsSentProject] = useState(false);
  const formEl = useRef<HTMLFormElement>(null);
  const [projectName, setProjectName] = useState("");
  const [refresh, setRefresh] = useState(true)
  const router = useRouter();

  const handleCreateProjectClick = useCallback(() => {
    setShowCreateProjectModal(true)
  }, [])


  const handleOnSendProject = useCallback(() => {
    formEl?.current?.reportValidity();

    API.createOrganisationForm(params.organisationId, projectName)
      .then(response => {
        if(response.status === 200) {
          setIsSentProject(true);
          console.log("The project has been created successfully.");
          // Extract the _id from the response and navigate
          const formId = response.data._id;
          router.push(`/${params.organisationId}/campaign/${formId}/setup`);
        }
      })
      .catch(error => {
        console.log("Error while creating project", error)
      })
  }, [projectName]) 

  const handleChangeProjectInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value)
  }, [])

  const handelCloseModal = useCallback(() => {
    setShowCreateProjectModal(false)
    setIsSentProject(false)
  }, [])

  return (
    <div>
        <HeaderWithDescription 
          Headline={"Campaign"} 
          Description={"Craft, manage, and optimize projects to drive your initiatives forward."}     
          type="page"
        />

    <div className="mt-4">
      <HeaderWithDescription 
          Headline={"Projects"} 
          Description={"Activate, deactivate or archive your current projects."}
          type="section"
        />
      <OrganisationFormsList organisationId={params.organisationId} refreshHandler={refresh}  />
    </div>
    <div className="mt-4">
      <HeaderWithDescription 
        Headline={"Designs"} 
        Description={"Craft new projects and prepare them for use."}
        type="section"
        PrimaryButtonLabel="New design"
        PrimaryButtononClick={handleCreateProjectClick}
      />
      <OrganisationDesignsList organisationId={params.organisationId} handleRefresh={() => setRefresh(!refresh)} />
    </div>
    <Modal 
      visible={showShowCreateProjectModal} 
      title="Create a new project."
      ok_text={isSentProject ? "OK" : "Create"}
      cancel_text={isSentProject ? "" : "Cancel"} 
      onCancelClick={handelCloseModal} 
      onOkClick={!isSentProject ? handleOnSendProject : handelCloseModal}
    >      
      {!isSentProject ? 
      <form ref={formEl}>
        <div className="mt-2 pl-10 space-y-8 pb-12 sm:space-y-0 sm:pb-0">
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label htmlFor="project" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
              Project name
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <DefaultInput 
                  name="Project name"
                  id="project"
                  autoComplete="Project name"
                  placeholder="My Awesome Project"
                  onChange={handleChangeProjectInput}
                  required
              />
            </div>
          </div>
        </div>
      </form>
       : 
      <p>
        The project has been created successfully.
      </p>}
    </Modal>
    </div>
  )
}