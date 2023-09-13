'use client'

import React, { useState, useEffect} from 'react'
import { PanelStepper } from "@/components/ui/steps/PanelStepper"
import DefaultButton from "@/components/ui/buttons/DefaultButton"
import 'survey-core/defaultV2.min.css'
import { Model } from 'survey-core'
import { Survey } from 'survey-react-ui'
import { useRouter } from "next/navigation"
import API from '@/utils/api/api'
import DefaultInput from '@/components/ui/elements/DefaultInput'
import HeaderWithDescription from '@/components/ui/headers/HeaderWithDescription'

export default function Page({ params }: {
    params: { 
      organisationId: string,
      formId: string
    }
  }) {
    const [formData, setFormData] = useState<any>()
    const [optin, setOptin] = useState<any[]>([])
    
    const router = useRouter();
    
    useEffect(() => {
      getFormDataFromID()
    }, [])

    const getFormDataFromID = async () => {
      const form = await API.getOrganisationFormByID(params.organisationId, params.formId);
      setFormData(form.data.form)
      setOptin(form.data.FormDesign.optin)
    }

    const survey = new Model(formData)

    survey.sendResultOnPageNext = true;

    const handleActiveOptin = (index: number) => {
      let updatedOptin = optin;
      updatedOptin[index].active = !updatedOptin[index].active
      API.updateOptinFromForm(params.organisationId, params.formId, updatedOptin)
      .then(response => {
        if(response.status === 200) getFormDataFromID()
      })
    }

    return (
      <div>
        <PanelStepper 
          steps={[
              { id: '01', name: 'Setup', description: 'Basic settings', href: `/${params.organisationId}/campaign/${params.formId}/setup`, status: 'complete' },
              { id: '02', name: 'Components', description: 'The information we need', href: `/${params.organisationId}/campaign/${params.formId}/components`, status: 'complete' },
              { id: '03', name: 'Pages', description: "Let's organise", href: `/${params.organisationId}/campaign/${params.formId}/pages`, status: 'complete' },
              { id: '04', name: 'Review', description: "Let's organise", href: '#', status: 'current' },
          ]}
        />
        <div className="mt-4">
          <HeaderWithDescription
              Headline="Ready to Go!"
              Description="Your project form is ready for review. Take a moment to inspect the form you've created. If you wish to make any changes or improvements, feel free to revisit previous steps before finalizing your setup."
              type="section"
            />
        </div>
        <div className='m-10'>
          <Survey model={survey} />
        </div>
        <div className='mx-10 flex flex-wrap'>
          {optin &&
            optin.map((item: any, index: number) => (
              <div key={`showOptin_${index}`} className='flex w-1/2 mt-2'>
                <DefaultInput
                  name='Optin'
                  id='Optin'
                  autoComplete='Optin'
                  placeholder='Optin'
                  onChange={() => handleActiveOptin(index)}
                  inputType='checkbox'
                  checked={item.active}
                />
                <div className='ml-2'>
                  <label className='text-black font-bold'>{item.name}</label>
                  {item.description ? <p id="description_`${index}`">{item.description}</p> : <p>No description</p>}
                </div>
              </div>
            ))
          }
        </div>

        <div className="flex justify-between mt-4">
          <DefaultButton
              label="Prev"
              onClick={() => router.push(`/${params.organisationId}/campaign/${params.formId}/pages`)}
          />
          <DefaultButton
              label="Next"
              onClick={() => router.push(`/${params.organisationId}/campaign`)}
          />
        </div>
      </div>
    )
}