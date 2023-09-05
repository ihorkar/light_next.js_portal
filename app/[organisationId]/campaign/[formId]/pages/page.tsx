'use client'

import React from "react";
import { PanelStepper } from "@/components/ui/steps/PanelStepper"
import DefaultButton from "@/components/ui/buttons/DefaultButton"
import { useRouter } from "next/navigation";
import { DropZone } from "@/components/ui/dropzone/dropzone";

export default function Page({ params }: {
    params: { 
        organisationId: string,
        formId: string}
  }) {
    
    const router = useRouter();

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
            <div className="flex justify-end mt-4">
                <DefaultButton
                    label="Next"
                    onClick={() => router.push(`/${params.organisationId}/campaign/${params.formId}/review`)}
                />
            </div> 

            <DropZone organisationId={params.organisationId} formId={params.formId} />
        </div>
    )
}