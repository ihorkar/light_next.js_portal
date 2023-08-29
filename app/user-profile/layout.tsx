'use client'

import ContainerFullWidth from "@/components/ui/Layout/ContainerFullWidth"
import SideNavWithSub, { NavProps } from "@/components/ui/navbar/SideNavWithSub"
import CheckLoginIsRequired from '../../utils/auth/CheckLoginIsRequired'
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
      ]
    }
    
    return (
      <html lang="en">
        <body>
            <div className="flex flex-row">
                <CheckLoginIsRequired>
                    <SideNavWithSub
                        menuitems={navigation.menuitems}
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