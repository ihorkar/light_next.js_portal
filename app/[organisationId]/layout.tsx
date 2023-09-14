'use client'

import { useState, useEffect } from "react"
import ContainerFullWidth from "@/components/ui/Layout/ContainerFullWidth"
import SideNavWithSub, { NavProps } from "@/components/ui/navbar/SideNavWithSub"
import CheckOrganisationExists from '@/utils/data/CheckOrganisationExists'
import { usePathname } from "next/navigation"
import API from "@/utils/api/api"

export default function Layout({
    children,
    params
  }: {
    children: React.ReactNode,
    params: {
      organisationId: string
    }
  }) {
    const [organisationdata, setOrganisationData] = useState<any[]>();

    const pathName = usePathname();

    useEffect(() => {
      getOrganisationData()
    }, [])

    const getOrganisationData = async () => {
      let organisationList: any[] = []
      const organisationData = await API.getOrganisationsByUser();
      organisationData.data.map((item:any, index: number) => {
        if (item.role === "admin" || "manager") {
          organisationList.push({
            id: index, name: item.organisationId.name, href: `/${item.organisationId.slug}`, initial: item.organisationId.name[0], current: false
          })
        }
      })
      setOrganisationData(organisationList);
    }

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
          current: pathName.includes(`/${params.organisationId}/campaign`),
        },
        { name: 'Results', href: `/${params.organisationId}/results`, icon: 'ClipboardDocumentListIcon', current: pathName === `/${params.organisationId}/results` },
      ],
      organisations: organisationdata
    }

    return (
      <html lang="en">
        <body className="overflow-y-hidden">
            <div className="flex flex-row">
              <CheckOrganisationExists organisationId={params.organisationId}>
                <SideNavWithSub
                  menuitems={navigation.menuitems}
                  organisations={navigation.organisations}
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