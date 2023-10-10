'use client'

import { useEffect, useState } from 'react';
import DefaultButton from '@/components/ui/buttons/DefaultButton';
import StatusCardPic from '@/components/ui/cards/StatusCardPic';
import DefaultHeader from '@/components/ui/headers/DefaultHeader';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import API from '@/utils/api/api';
import { useRouter } from 'next/navigation';
import { useUserData } from '@/utils/jotai';

export default function Home() {
    const router = useRouter();
    const session = useSession();
    const [, setUserData] = useUserData();
    const [isNullOrganisations, setIsNullOrganisations] = useState(false);

    useEffect(() => {
        //@ts-ignore
        if (session.data?.accessToken){
            //@ts-ignore
            axios.defaults.headers.common['Authorization'] = `${session.data?.accessToken}`;
            handleGetUserData()
            handleGetOrganisations();
        } 
    }, []);

    const handleGetOrganisations = () => {
        API.getOrganisationsByUser()
            .then(response => {
                if (response.data.length == 0) {
                    setIsNullOrganisations(true);
                } else if (response.data.length == 1) {
                    router.push(`/${response.data[0].organisationId.slug}`);
                } else if (response.data.length > 1) {
                    router.push(`/select-organisation`);
                }
            })
            .catch(error => {
                if(error.response.status === 500) router.push('/service-unavailabled')
            });
    }

    const handleGetUserData = () => {
        API.getUserData()
        .then(response => {
          setUserData({id: response.data[0]._id, 
                        identityId: response.data[0].identityId, 
                        email: response.data[0].email,
                        userName: response.data[0].userName,
                        firstName: response.data[0].firstName,
                        lastName: response.data[0].lastName
                      })
        })
    }

    function createOrganisation() {
      router.push(`/create-organisation`);
    }

    return (
        <div className="bg-white h-screen flex flex-col justify-center">
            {isNullOrganisations && (
                <div className="mx-auto max-w-4xl">
                    <DefaultHeader 
                        Headline="Ready to Dive In?"
                        Description="To explore all the features of the Light app, join an existing organisation or start one yourself. Either way, exciting opportunities await!"
                    />
                    <div className="mt-8 grid gap-6 md:grid-cols-2">
                        <div className="p-4 border rounded-md shadow-sm space-y-4">
                            <StatusCardPic 
                                headline="Waiting for an Invite?"
                                description="If your organisation is already on our platform, reach out to your contact and get yourself added in!"
                                Icon="/contract-time.png"
                            />
                        </div>
                        <div className="p-4 border rounded-md shadow-sm space-y-4 text-center">
                            <StatusCardPic 
                                headline="Begin Your Journey"
                                description="New to our platform? Set up your organisation and dive into the Light app in just a few minutes!"
                                Icon="/launch.png"
                            />
                            <DefaultButton 
                                label="Sign up"
                                onClick={createOrganisation}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
