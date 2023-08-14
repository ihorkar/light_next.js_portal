import HeadingBreadcrumb from "@/components/ui/headers/HeadingBreadcrumb"
import SimpleHeader from "@/components/ui/headers/SimpleHeader"
import FullWidthList from "@/components/ui/lists/FullWidthList"


export default function Page({ params }: {
    params: { organisationId: string}
  }) {
  return (
    <div>
    <SimpleHeader 
      Headline= "Results"
    />
    <FullWidthList organisationId={params.organisationId} />
    </div>
  )
}