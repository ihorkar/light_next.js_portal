import OrganisationDataCard from "@/components/organisation/OrganisationDataCard"


export default function Page({ params }: {
    params: { organisationId: string}
  }) {
  return (
    <div>
      <OrganisationDataCard organisationId={params.organisationId} />
    </div>
  )
}