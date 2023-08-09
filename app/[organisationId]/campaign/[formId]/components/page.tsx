import HeadingBreadcrumb from "@/components/ui/headers/HeadingBreadcrumb"
import { PanelStepper } from "@/components/ui/steps/PanelStepper"

export default function Page({ params }: {
    params: { 
        organisationId: string,
        formId: number}
  }) {
  return (
    <div>
        <HeadingBreadcrumb 
            Headline="Form components"
            Description="Let's select which information you need"
        />
        <PanelStepper 
            steps={[
                { id: '01', name: 'Setup', description: 'Basic settings', href: `/${params.organisationId}/campaign/${params.formId}/setup`, status: 'complete' },
                { id: '02', name: 'Components', description: 'The information we need', href: '#', status: 'current' },
                { id: '03', name: 'Pages', description: "Let's organise", href: '#', status: 'upcoming' },
                { id: '04', name: 'Review', description: "Let's organise", href: '#', status: 'upcoming' },
            ]}
        />
    <div>Form components</div>
    </div>
  )
}