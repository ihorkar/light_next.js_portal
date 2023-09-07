'use client'

import React, { useState, useEffect } from "react";
import DefaultButton from "@/components/ui/buttons/DefaultButton"
import { PanelStepper } from "@/components/ui/steps/PanelStepper"
import { useRouter } from "next/navigation";
import DefaultInput from "@/components/ui/elements/DefaultInput";
import API from "@/utils/api/api";
import Notiflix from "notiflix";

export default function Page({ params }: {
    params: { organisationId: string, formId: string}
  }) {

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const router = useRouter();

  useEffect(() => {
    handleGetProjectData()
  }, [])
  
  const handleGetProjectData = async () => {
    await API.getProjectByOrganisation(params.organisationId, params.formId)
    .then(response => {
      setProjectName(response.data.project)
      setProjectDescription(response.data.formDescription)
    })
  }

  const handleOnClickBtn = async () => {
    const project = {
      name: projectName,
      description: projectDescription
    }
    if (projectName && projectDescription) {
      await API.setProjectByOrganisation(params.organisationId, params.formId, project)
      .then(response => {
        if(response.status === 201) router.push(`/${params.organisationId}/campaign/${params.formId}/components`)
      })
    } else {
      Notiflix.Notify.failure('Please input information correctly!')
    }
  }

  return (
    <div>
      <PanelStepper 
        steps={[
            { id: '01', name: 'Setup', description: 'Basic settings', href: `#`, status: 'current' },
            { id: '02', name: 'Components', description: 'The information we need', href: '#', status: 'upcoming' },
            { id: '03', name: 'Pages', description: "Let's organise", href: '#', status: 'upcoming' },
            { id: '04', name: 'Review', description: "Let's organise", href: '#', status: 'upcoming' },
        ]}
      />
      <div className="pt-6 px-10 my-6">
        <div className="sm:col-span-4">
          <span className="block text-sm font-medium leading-6 text-gray-900">Project Name</span>
          <div className="my-4 sm:my-2">
            <DefaultInput 
                name="name"
                id="name"
                autoComplete="name"
                placeholder="name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
            />
          </div>
        </div>

        <div className="col-span-full">
          <label className="block text-sm font-medium leading-6 text-gray-900">Project Description</label>
          <div className="my-4">
            <textarea rows={3} value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} 
              className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-gray-300 sm:text-sm sm:leading-6">
            </textarea>
          </div>
        </div>
      </div>
      <div className="flex justify-end pr-10">
        <DefaultButton 
          label="Next"
          onClick={handleOnClickBtn}
        />
      </div>
    </div>
  )
}