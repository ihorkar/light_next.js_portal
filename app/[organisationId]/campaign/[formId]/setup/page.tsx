'use client'

import DefaultButton from "@/components/ui/buttons/DefaultButton"
import { PanelStepper } from "@/components/ui/steps/PanelStepper"
import { useRouter } from "next/navigation";

export default function Page({ params }: {
    params: { organisationId: string, formId: string}
  }) {

  const router = useRouter();
    
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
    <div>Form setup</div>
    <DefaultButton 
      label="Next"
      onClick={() => router.push(`/${params.organisationId}/campaign/${params.formId}/components`)}
    />
    </div>
  )
}