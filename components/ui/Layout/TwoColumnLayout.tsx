'use client'

import React, { useState, useEffect, ChangeEvent, useCallback } from "react";
import DefaultInput from "../elements/DefaultInput"
import DefaultSelect from "../elements/DefaultSelect"
import DefaultButton from "@/components/ui/buttons/DefaultButton"
import { useRouter } from "next/navigation";
import API from "@/utils/api/api";
import Notiflix from "notiflix";
import Modal from "../modal/Modal";
import { TrashIcon, PlusIcon } from "@heroicons/react/20/solid";

export interface TwoColumnLayoutProps {
    organisationId: string;
    formId: string;
}

export interface IOptInfo {
    name: string;
    description: string;
    active: boolean;
} 

const TwoColumnLayout = ({organisationId, formId}: TwoColumnLayoutProps) => {

    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [optInfo, setOptInfo] = useState<IOptInfo[]>([])
    const [goalForm, setGoalForm] = useState("Lead Generation")
    const [payCondition, setPayCondition] = useState("")
    const [showOptinModal, setShowOptinModal] = useState(false)
    const [optNameItem, setOptNameItem] = useState("")
    const [optDescriptionItem, setOptDescriptionItem] = useState("")
  
    const router = useRouter();
  
    useEffect(() => {
      handleGetProjectData()
    }, [])
    
    const handleGetProjectData = async () => {
      let optInfo: IOptInfo[] = [];
      await API.getProjectByOrganisation(organisationId, formId)
      .then(response => {
        response.data.FormDesign.optin.map((optin: any) => {
            optInfo.push(optin)
        })

        setProjectName(response.data.project)
        setProjectDescription(response.data.formDescription)
        setPayCondition(response.data.payCondition)
        setOptInfo(optInfo)
      })
    }

    const handleInputName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      setOptNameItem(e.target.value)
    }, [])

    const handleInputDescription = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        setOptDescriptionItem(e.target.value)
    }, [])
  
    const handleOnClickBtn = async () => {
      let flag = 1
      const project = {
        name: projectName,
        description: projectDescription,
        goalForm: goalForm,
        payCondition: payCondition,
        optin: optInfo
      }
      optInfo.map((item: any) => {
        if(item.name === "") {
            Notiflix.Notify.failure('You should input Opt in Name.')
            flag = 0
        }
      })
      if(flag === 1) {
        if (projectName && projectDescription) {
          await API.setProjectByOrganisation(organisationId, formId, project)
          .then(response => {
            if(response.status === 201) router.push(`/${organisationId}/campaign/${formId}/components`)
          })
        } else {
          Notiflix.Notify.failure('Please input information correctly!')
        }
      }
    }
    
    const handleAddOptin = () => {
        setOptInfo((prevState: IOptInfo[]) => {
            let optInfos = prevState;
            optInfos?.push({name: optNameItem, description: optDescriptionItem, active: false})
            return optInfos
        })
        setShowOptinModal(false)
    }

    const handleDeleteOptinItem = (index: number) => {
        setOptInfo((prevState?: IOptInfo[]) => {
            let optInfos = [...prevState as IOptInfo[]];
            optInfos?.splice(index, 1)
            return optInfos
        })
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
                            onChange={(e) => setGoalForm(e.target.value)}
                            selectedOption={goalForm}
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
                            value={payCondition}
                            onChange={(e) => setPayCondition(e.target.value)}
                            name="description">
                        </textarea>
                    </div>
                    <div className="mt-4">
                        <div className="flex justify-between">
                            <p>Opt-in</p>
                            <button className="bg-[#55CB64] p-1 rounded text-white" onClick={() => setShowOptinModal(true)}>
                                <PlusIcon className='w-5 h-5' />
                            </button>
                        </div>

                        <Modal
                            visible={showOptinModal}
                            title="Create new optin"
                            ok_text="Create"
                            cancel_text="Cancel"
                            type="primary"
                            onOkClick={() => handleAddOptin()}
                            onCancelClick={() => setShowOptinModal(false)}
                        >
                            <div>
                                <p className="my-1">Name</p>
                                <DefaultInput
                                    name="shortname"
                                    title="shortname"
                                    id="shortname"
                                    autoComplete="Short Name"
                                    placeholder="Short Name"
                                    onChange={handleInputName}
                                />
                            </div>
                            <div className="mt-4">
                                <p className="my-1">Description</p>
                                <textarea 
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    name="description"
                                    placeholder="Description"
                                    rows={3}
                                    onChange={handleInputDescription}
                                ></textarea>
                            </div>
                        </Modal>
                        
                        <table className="w-full border-collapse border border-slate-400 mt-4">
                            <tr>
                                <th className="py-2 border border-slate-400 bg-gray-300">Short Name</th>
                                <th className="py-2 border border-slate-400 bg-gray-300">Description</th>
                                <th className="py-2 border border-slate-400 bg-gray-300">Action</th>
                            </tr>
                            {optInfo?.map((item: any, index: number) => (
                                <tr key={`optin_${index}`}>
                                    <td className="px-2 py-1 border border-slate-300">{item.name}</td>
                                    <td className="px-2 py-1 border border-slate-300">{item.description}</td>
                                    <td className="flex justify-center px-2 py-1 border border-slate-300">
                                        <TrashIcon className="h-full w-5 text-red-500" onClick={() => handleDeleteOptinItem(index)} />
                                    </td>
                                </tr>
                            ))}
                        </table>
                    </div>
                </div>
            </div>
            <div className="flex justify-end mt-8 pr-10">
                <DefaultButton 
                    label="Next"
                    type="confirmation"
                    onClick={handleOnClickBtn}
                />
            </div>
        </div>
    )
}
export default TwoColumnLayout;