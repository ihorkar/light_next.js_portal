import OrganisationList from "@/components/organisation/OrganisationList"
import DefaultHeader from "@/components/ui/headers/DefaultHeader"


export default function Page({ params }: {
    params: { organisationId: string}
  }) {  

  return (
    <div className="bg-white h-screen">
    
      <DefaultHeader 
        Headline= "Welcome back!"
        Description="Please select an organisation"
      />
      <div className="flex justify-center items-center">
          <OrganisationList />
      </div>
    </div>
  )
}