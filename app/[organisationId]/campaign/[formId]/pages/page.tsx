'use client'

import React from "react";
import { PanelStepper } from "@/components/ui/steps/PanelStepper"
import { DropZone } from "@/components/ui/dropzone/dropzone";
import HeaderWithDescription from "@/components/ui/headers/HeaderWithDescription";

export default function Page({ params }: {
    params: { 
        organisationId: string,
        formId: string}
  }) {

    return (
        <div>
            <PanelStepper 
                steps={[
                    { id: '01', name: 'Setup', description: 'Basic settings', href: `/${params.organisationId}/campaign/${params.formId}/setup`, status: 'complete' },
                    { id: '02', name: 'Components', description: 'The information we need', href: `/${params.organisationId}/campaign/${params.formId}/components`, status: 'complete' },
                    { id: '03', name: 'Pages', description: "Let's organise", href: '#', status: 'current' },
                    { id: '04', name: 'Review', description: "Let's organise", href: '#', status: 'upcoming' },
                ]}
            />

            <div className="mt-4">
                    <HeaderWithDescription
                        Headline="Let's Get Organized"
                        Description="To make your form clear and manageable, let's organize the selected datablocks into distinct pages. This step ensures that your data collection process is efficient and user-friendly."
                        type="section"
                    />
            </div>
            <DropZone organisationId={params.organisationId} formId={params.formId} />
        </div>
    )
}