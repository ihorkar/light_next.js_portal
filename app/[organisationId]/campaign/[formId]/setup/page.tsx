import { PanelStepper } from "@/components/ui/steps/PanelStepper"

export default function Page({ params }: {
    params: { formId: string}
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
    <div>Form setup</div>
    </div>
  )
}