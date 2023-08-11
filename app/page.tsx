'use client'

import { useEffect } from 'react'
import DefaultButton from '@/components/ui/buttons/DefaultButton'
import StatusCardPic from '@/components/ui/cards/StatusCardPic'
import DefaultHeader from '@/components/ui/headers/DefaultHeader'
import { useSession } from 'next-auth/react';

export default function Home() {
  const session = useSession();

  useEffect(() => {
    //@ts-ignore
    if(session.data?.accessToken) axios.defaults.headers.common['Authorization'] = `${session.data?.accessToken}`
  }, [session])

  function createOrganisation() {

  }

  return (
    <div className="bg-white h-screen">
      <div>
          <DefaultHeader 
              Headline="You are not alone, are you?"
              Description="To start using the light app you need to be a member of an organisation. You can await to be invited to one or create one of your own"
          />
      </div>
      <div className="flex flex-row">
        <div>
          <StatusCardPic 
            headline="Await an invitation"
            description="Is your organisation already on the platform? Ask your contact to add you to the organisation."
            Icon="/contract-time.png"
          />
        </div>
        <div>
          <StatusCardPic 
              headline="Create an organisation"
              description="Do you represent an organisation that is new to the platform? Sign up your organisation now and start using the Light app within minutes."
              Icon="/contract-time.png"
            />
          <DefaultButton 
            label="Sign up"
            onClick={createOrganisation}
          />
        </div>
      
      </div>
    </div>
  )
}
