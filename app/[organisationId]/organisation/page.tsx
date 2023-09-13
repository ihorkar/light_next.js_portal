import OrganisationDataCard from "@/components/organisation/OrganisationDataCard"
import HeaderWithDescription from "@/components/ui/headers/HeaderWithDescription"
import UserAlerts from "@/components/user-alerts/UserAlerts"


export default function Page({ params }: {
    params: { organisationId: string}
  }) {
  return (
    <div>
      <HeaderWithDescription 
        Headline="Organisation"
        Description="Manage all information regarding your organisation"
        type="page"
      />
      <UserAlerts category="team" type="notification" showAlerts={true} />
      <OrganisationDataCard organisationId={params.organisationId} />
    </div>
  )
}