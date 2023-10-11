'use client'

import React, { useState, useEffect} from 'react'
import { PanelStepper } from "@/components/ui/steps/PanelStepper"
import DefaultButton from "@/components/ui/buttons/DefaultButton"
import 'survey-core/defaultV2.min.css'
import { Model } from 'survey-core'
import { Survey } from 'survey-react-ui'
import { useRouter } from "next/navigation"
import API from '@/utils/api/api'
import HeaderWithDescription from '@/components/ui/headers/HeaderWithDescription'
import DefaultCheckBox from '@/components/ui/elements/DefaultCheckBox'

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
        <div className='flex my-8 gap-x-2'>
          <div className='w-3/4'>
            <Survey model={survey} />
          </div>
          <div className=" bg-white drop-shadow-lg p-6">
              <p className="text-lg font-semibold pb-3 text-center">Optin Information</p><hr />
              {optin.map((item: any, index: number) => (
                  <div key={`showOptin_${index}`} className='flex mt-2'>
                      <DefaultCheckBox
                          name=""
                          id=""
                          title={item.name}
                          content={item.description}
                      />
                  </div>
              ))}
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <DefaultButton
              label="Prev"
              type="confirmation"
              onClick={() => router.push(`/${params.organisationId}/campaign/${params.formId}/pages`)}
          />
          <DefaultButton
              label="Next"
              type="confirmation"
              onClick={() => router.push(`/${params.organisationId}/campaign`)}
          />
        </div>
      </div>
    )
}