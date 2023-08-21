import OrganisationFormsList from "@/components/organisation/OrganisationFormsList"
import SimpleHeader from "@/components/ui/headers/SimpleHeader"


export default function Page({ params }: {
  params: { organisationId: string}
}) {
  return (
    <div>
    <SimpleHeader 
      Headline= "Campaign"
    />
    <OrganisationFormsList organisationId={params.organisationId} />
    </div>
  )
}