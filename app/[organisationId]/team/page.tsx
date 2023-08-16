import SimpleHeader from "@/components/ui/headers/SimpleHeader"
import OrganisationUserList from "@/components/organisation/OrganisationUserList"

export default function Page({ params }: {
    params: { organisationId: string}
  }) {
  return (
    <div>
    <SimpleHeader 
      Headline= "Team"
    />
    <OrganisationUserList organisationId={params.organisationId} />
    </div>
  )
}