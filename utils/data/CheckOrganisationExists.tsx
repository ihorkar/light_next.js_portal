'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import API from "../api/api";
import { useSession } from "next-auth/react";
import axios from "axios";
import Notiflix from "notiflix";

export default function Page({children, organisationId}: {children: React.ReactNode, organisationId: string}) {
    const router = useRouter();
    const session = useSession();
    const [isOrganisation, setIsOrganisation] = useState(false)

    useEffect(() => {
        //@ts-ignore
        if(session.data?.accessToken) axios.defaults.headers.common['Authorization'] = `${session.data?.accessToken}`;
        API.getOrganisationInfo(organisationId)
        .then(response => {
          if(response.data){
            setIsOrganisation(true)
          }
        })
        .catch(error => {
          if(error.response.status === 403) {
            Notiflix.Confirm.show(
              "You don't have any access!",
              "Link to user-profile?",
              "Yes",
              "No",
              () => { router.push('/user-profile') },
              () => { router.push('/restricted') }
            )
          }
            if(error.response.status === 404) router.push('/restricted')
        })
    }, [])

    return <>{isOrganisation && children}</>
}