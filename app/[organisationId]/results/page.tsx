import OrganisationResultsList from "@/components/organisation/OrganisationResultsList"
import SimpleHeader from "@/components/ui/headers/SimpleHeader"


export default function Page({ params }: {
    params: { organisationId: string}
  }) {
  return (
    <div>
    <SimpleHeader 
      Headline= "Results"
    />
    <OrganisationResultsList organisationId={params.organisationId} />
    </div>
  )
}