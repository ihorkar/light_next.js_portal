'use client'

import { useState, useEffect } from "react"
import ContainerFullWidth from "@/components/ui/Layout/ContainerFullWidth"
import SideNavWithSub, { NavProps } from "@/components/ui/navbar/SideNavWithSub"
import CheckLoginIsRequired from '../../utils/auth/CheckLoginIsRequired'
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
        if (item.role !== "agent") {
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
        {
          name: 'Profile',
          href: `/user-profile`,
          icon: 'UserIcon',
          current: pathName === '/user-profile',
        },
        {
          name: 'organisations',
          href: `/user-profile/organisation`,
          icon: 'BuildingOfficeIcon',
          current: pathName === '/user-profile/organisation',
        }
      ],
      organisations: organisationdata
    }
    
    return (
      <html lang="en">
        <body>
            <div className="flex flex-row">
                <CheckLoginIsRequired>
                    <SideNavWithSub
                        menuitems={navigation.menuitems}
                        organisations={navigation.organisations}
                        isUserProfilePage={true}
                    />
                    <ContainerFullWidth>
                        {children}
                    </ContainerFullWidth>
                </CheckLoginIsRequired>
            </div>
        </body>
      </html>
    )
  }