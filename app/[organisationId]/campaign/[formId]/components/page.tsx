'use client'

import DatablockList from "@/components/formbuilder/datablocklist"
import HeaderWithDescription from "@/components/ui/headers/HeaderWithDescription"
import { PanelStepper } from "@/components/ui/steps/PanelStepper"

export default function Page({ params }: {
    params: { 
        organisationId: string,
        formId: string
    }
  }) {

    return (
        <div>
            <PanelStepper 
                steps={[
                    { id: '01', name: 'Setup', description: 'Basic settings', href: `/${params.organisationId}/campaign/${params.formId}/setup`, status: 'complete' },
                    { id: '02', name: 'Components', description: 'The information we need', href: '#', status: 'current' },
                    { id: '03', name: 'Pages', description: "Let's organise", href: '#', status: 'upcoming' },
                    { id: '04', name: 'Review', description: "Let's organise", href: '#', status: 'upcoming' },
                ]}
            />
            <div className="mt-4">
                <HeaderWithDescription
                    Headline="What Data Do We Need?"
                    Description="Select the specific data blocks that contain the information you'd like to collect for your project. Feel free to click on each datablock to get a preview and ensure it aligns with your project requirements."
                    type="section"
                />
            </div>
            <div className="mt-4">
                <DatablockList organisationId={params.organisationId} formId={params.formId} />
            </div>
        </div>
    )
}