'use client'

import React from "react";
import { PanelStepper } from "@/components/ui/steps/PanelStepper"
import TwoColumnLayout from "@/components/ui/Layout/TwoColumnLayout";
import HeaderWithDescription from "@/components/ui/headers/HeaderWithDescription";

export default function Page({ params }: {
  params: { organisationId: string, formId: string }
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
      <div className="mt-4">
        <HeaderWithDescription
          Headline="Let's get started"
          Description="We're here to assist you in setting up your project, but first, we need some general information to ensure a smooth setup process. These settings will help tailor the project to your needs."
          type="section"
        />
      </div>

      <TwoColumnLayout organisationId={params.organisationId} formId={params.formId} />
    </div>
  )
}