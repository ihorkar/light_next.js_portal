'use client'

import ContainerFullWidth from "@/components/ui/Layout/ContainerFullWidth"
import SideNavWithSub, { NavProps } from "@/components/ui/navbar/SideNavWithSub"
import CheckOrganisationExists from '@/utils/data/CheckOrganisationExists'
import { usePathname } from "next/navigation"

export default function Layout({
    children,
    params
  }: {
    children: React.ReactNode,
    params: {
      organisationId: string
    }
  }) {

    const pathName = usePathname();

    // Define menu
    const navigation: NavProps = {
      menuitems: [
        { name: 'Dashboard', href: `/${params.organisationId}`, icon: 'HomeIcon', current: pathName === `/${params.organisationId}` },
        {
          name: 'Organisation',
          href: `/${params.organisationId}/organisation`,
          icon: 'BuildingOfficeIcon',
          current: pathName === `/${params.organisationId}/organisation`,
        },
        {
          name: 'Team',
          href: `/${params.organisationId}/team`,
          icon: 'UsersIcon',
          current: pathName === `/${params.organisationId}/team`,
        },
        {
          name: 'Campaign',
          href: `/${params.organisationId}/campaign`,
          icon: 'WrenchScrewdriverIcon',
          current: pathName === `/${params.organisationId}/campaign`,
        },
        { name: 'Results', href: `/${params.organisationId}/results`, icon: 'ClipboardDocumentListIcon', current: pathName === `/${params.organisationId}/results` },
      ]
    }

    return (
      <html lang="en">
        <body>
            <div className="flex flex-row">
              <CheckOrganisationExists organisationId={params.organisationId}>
                <SideNavWithSub
                  menuitems={navigation.menuitems}
                  isUserProfilePage={false}
                />
                <ContainerFullWidth>
                    {children}
                </ContainerFullWidth>
              </CheckOrganisationExists>
            </div>
        </body>
      </html>
    )
  }