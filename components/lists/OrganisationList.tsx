'use client'

import { useEffect, useState } from "react";
import DefaultCard from "../ui/cards/DefaultCard";
import API from "@/utils/api/api";

const OrganisationList = () => {
    const [organisationdata, setOrganisationData] = useState<any[]>();

    useEffect(() => {
        getOrganisationData()
    }, [])

    const getOrganisationData = async () => {
        const organisationData = await API.getOrganisationsByUser();
        console.log(organisationData)
        setOrganisationData(organisationData.data);
    }

    return (
        <div className="
            pt-4
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
        ">
                {organisationdata?.map((organisation: any) => {
                    return (
                        <div key={organisation.organisationId._id}>
                            <DefaultCard 
                                Title={organisation.organisationId.slug}
                                Description={organisation.organisationId.name}
                                Link={`/${organisation.organisationId.slug}`}
                            />
                        </div>
                    )   
                    })
                }
        </div>
    )
}

export default OrganisationList;