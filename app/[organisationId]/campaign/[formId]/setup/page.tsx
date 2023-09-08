'use client'

import React from "react";
import { PanelStepper } from "@/components/ui/steps/PanelStepper"
import TwoColumnLayout from "@/components/ui/Layout/TwoColumnLayout";

export default function Page({ params }: {
    params: { organisationId: string, formId: string}
  }) {
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
      <TwoColumnLayout organisationId={params.organisationId} formId={params.formId} />
    </div>
  )
}