'use client'

import React, { useState, useEffect } from "react";
import DefaultInput from "../elements/DefaultInput"
import DefaultSelect from "../elements/DefaultSelect"
import DefaultButton from "@/components/ui/buttons/DefaultButton"
import { useRouter } from "next/navigation";
import API from "@/utils/api/api";
import Notiflix from "notiflix";

export interface TwoColumnLayoutProps {
    organisationId: string;
    formId: string;
}

const TwoColumnLayout = ({organisationId, formId}: TwoColumnLayoutProps) => {

    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
  
    const router = useRouter();
  
    useEffect(() => {
      handleGetProjectData()
    }, [])
    
    const handleGetProjectData = async () => {
      await API.getProjectByOrganisation(organisationId, formId)
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
        await API.setProjectByOrganisation(organisationId, formId, project)
        .then(response => {
          if(response.status === 201) router.push(`/${organisationId}/campaign/${formId}/components`)
        })
      } else {
        Notiflix.Notify.failure('Please input information correctly!')
      }
    }
    return(
        <div className="container mx-8">
            <div className="flex mt-12">
                <div className="w-1/4">
                    <p>General</p>
                </div>
                <div className="w-3/4">
                    <div>
                        <p>Project Name</p>
                        <DefaultInput
                            name="name"
                            title="name"
                            id="projectname"
                            autoComplete="Project Name"
                            placeholder="Project Name"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                        />
                    </div>
                    <div className="mt-4">
                        <p>Project Description</p>
                        <textarea
                            value={projectDescription}
                            onChange={(e) => setProjectDescription(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            rows={3}
                            name="description">
                        </textarea>
                    </div>
                    <div className="mt-4">
                        <p>The Goal of Form</p>
                        <DefaultSelect 
                            options={["Lead Generation", "Contract", "Contract with SEPA Mandate", "Survey"]}
                            onChange={() => {alert("select button")}}
                            selectedOption="admin"
                        />
                    </div>
                </div>
            </div>
            <div className="flex mt-6">
                <div className="w-1/4">
                    <p>Legal</p>
                </div>
                <div className="w-3/4">
                    <div>
                        <p>Payment Condition</p>
                        <textarea
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            rows={3}
                            onChange={() => {alert("textarea")}}
                            name="description">
                        </textarea>
                    </div>
                    <div className="mt-4">
                        <p>Opt-in</p>
                        <div className="flex mt-4">
                            <div className="w-1/2">
                                <label>Short Name</label>
                                <DefaultInput 
                                    name="shortname"
                                    title="shortname"
                                    id="shortname"
                                    autoComplete="Short Name"
                                    placeholder="Short Name"
                                    value=""
                                    onChange={() => {alert("fadsfadsf")}}
                                />
                            </div>
                            <div className="w-1/2">
                                <p>Description</p>
                                <textarea 
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    name="description"
                                    rows={3}
                                    value=""
                                    onChange={() => {alert("fadsfadsf")}}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end mt-8 pr-10">
                <DefaultButton 
                    label="Next"
                    onClick={handleOnClickBtn}
                />
            </div>
        </div>
    )
}
export default TwoColumnLayout;