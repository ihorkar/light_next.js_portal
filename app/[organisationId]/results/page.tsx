import OrganisationResultsList from "@/components/organisation/OrganisationResultsList"
import HeaderWithDescription from "@/components/ui/headers/HeaderWithDescription"
import SimpleHeader from "@/components/ui/headers/SimpleHeader"


export default function Page({ params }: {
    params: { organisationId: string}
  }) {
  return (
    <div>
      <HeaderWithDescription
              Headline="Results"
              Description="Here you can find all completed signups."
              type="page"
            />
    <OrganisationResultsList organisationId={params.organisationId} />
    </div>
  )
}