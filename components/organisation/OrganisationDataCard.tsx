'use client'

import DataCard from "../ui/data/DataCard";

const OrganisationDataCard = () => {
    return(
        <DataCard 
            title= "Organisation Information"
            description= "An overview with organisational information"
            data={[
                {
                    label: 'Short Name',
                    value: 'slug',
                },
                {
                    label: 'Full Name',
                    value: 'Charity Organisation Ltd.',
                    onUpdate: () => {
                        // Some update function for the location, e.g. open a modal to edit the location
                    }
                },
                {
                    label: 'Address',
                    value: (
                        <>
                            {/*<div>{`${address.street} ${address.streetNumber}`}</div>
                            <div>{`${address.postcode}`}</div>
                            <div>{`${address.city}`}</div>
                            <div>{`${address.country}`}</div>*/}
                            <div>{`Koninginnenhoofd 1`}</div>
                            <div>{`3072 AD`}</div>
                            <div>{`Rotterdam`}</div>
                            <div>{`Netherlands`}</div>
                        </>
                    ),
                    onUpdate: () => {/* Update function for full address */}
                }
            ]}
        />
    )
}

export default OrganisationDataCard;