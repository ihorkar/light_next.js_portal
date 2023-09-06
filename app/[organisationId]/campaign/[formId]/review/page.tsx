'use client'

import { PanelStepper } from "@/components/ui/steps/PanelStepper"
import DefaultButton from "@/components/ui/buttons/DefaultButton"
import { useRouter } from "next/navigation";

export default function Page({ params }: {
    params: { organisationId: string,
        formId: number}
  }) {
    
    const router = useRouter();

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
        <div>Form review</div>
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