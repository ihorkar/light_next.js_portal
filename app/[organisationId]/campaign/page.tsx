'use client'

import { useState, useRef, ChangeEvent, useCallback } from "react"
import OrganisationFormsList from "@/components/organisation/OrganisationFormsList"
import Modal from "@/components/ui/modal/Modal"
import API from "@/utils/api/api"
import { useRouter } from "next/navigation"
import OrganisationDesignsList from "@/components/organisation/OrganisationDesignsList"
import HeaderWithDescription from "@/components/ui/headers/HeaderWithDescription"
import TabNavigation from "@/components/ui/navbar/TabNavigation"
import DefaultInput from "@/components/ui/elements/DefaultInput"


export default function Page({ params }: {
  params: { organisationId: string}
}) {

  const [activeTab, setActiveTab] = useState('Projects');
  const tabs = [
    { name: 'Projects', href: '#projects', current: activeTab === 'Projects' },
    { name: 'Designs', href: '#designs', current: activeTab === 'Designs' },
  ];

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
        PrimaryButtonLabel="New design"
        PrimaryButtononClick={handleCreateProjectClick}
      />

      <TabNavigation tabs={tabs} setActiveTab={setActiveTab} />

      {/* Tab contents */}
      {activeTab === 'Projects' && (
        <div className="mt-4">
          <OrganisationFormsList organisationId={params.organisationId} refreshHandler={refresh} />
        </div>
      )}

      {activeTab === 'Designs' && (
        <div className="mt-4">
          <OrganisationDesignsList organisationId={params.organisationId} handleRefresh={() => setRefresh(!refresh)} />
        </div>
      )}

<Modal 
      visible={showShowCreateProjectModal} 
      title="Create a new project."
      ok_text={isSentProject ? "OK" : "Create"}
      cancel_text={isSentProject ? undefined : "Cancel"} 
      onCancelClick={handelCloseModal} 
      onOkClick={!isSentProject ? handleOnSendProject : handelCloseModal}
      type="primary"
    >      
      {!isSentProject ? 
      <form ref={formEl}>
        <div className="space-y-8 sm:space-y-0 sm:pb-0">
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4">
            <label htmlFor="project" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
              Project name
            </label>
            <div className="sm:col-span-2">
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
  );
}