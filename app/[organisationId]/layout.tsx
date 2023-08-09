import ContainerFullWidth from "@/components/ui/Layout/ContainerFullWidth"
import SideNavWithSub, { NavProps } from "@/components/ui/navbar/SideNavWithSub"

export default function Layout({
    children,
    params
  }: {
    children: React.ReactNode,
    params: {
      organisationId: string
    }
  }) {

    // Define menu
    const navigation: NavProps = {
      menuitems: [
        { name: 'Dashboard', href: `/${params.organisationId}`, icon: 'HomeIcon', current: true },
        {
          name: 'Organisation',
          href: `/${params.organisationId}/organisation`,
          icon: 'BuildingOfficeIcon',
          current: false,
        },
        {
          name: 'Team',
          href: `/${params.organisationId}/team`,
          icon: 'UsersIcon',
          current: false,
        },
        {
          name: 'Campaign',
          href: `/${params.organisationId}/campaign`,
          icon: 'WrenchScrewdriverIcon',
          current: false,
        },
        { name: 'Results', href: `/${params.organisationId}/results`, icon: 'ClipboardDocumentListIcon', current: false },
      ]
    }
    

    return (
      <html lang="en">
        <body>
            <div className="flex flex-row">
            <SideNavWithSub
              menuitems={navigation.menuitems}
            />
            
            <ContainerFullWidth>
                {children}
            </ContainerFullWidth>
            </div>
        </body>
      </html>
    )
  }