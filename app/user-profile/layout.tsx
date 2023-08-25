import ContainerFullWidth from "@/components/ui/Layout/ContainerFullWidth"
import SideNavWithSub, { NavProps } from "@/components/ui/navbar/SideNavWithSub"
import CheckLoginIsRequired from '../../utils/auth/CheckLoginIsRequired'

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
        {
          name: 'Profile',
          href: `/user-profile`,
          icon: 'UserIcon',
          current: false,
        },
        {
          name: 'organisations',
          href: `/user-profile/organisation`,
          icon: 'BuildingOfficeIcon',
          current: false,
        },
        {
          name: 'invitations',
          href: `/user-profile/invitations`,
          icon: 'UserPlusIcon',
          current: false,
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