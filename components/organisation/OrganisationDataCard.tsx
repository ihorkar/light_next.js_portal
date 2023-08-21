'use client'

import DataCard from "../ui/data/DataCard";
import { useState } from 'react';
import DefaultModal from "../ui/modals/Defaultmodal";
import { CheckIcon } from "@heroicons/react/24/outline";

const OrganisationDataCard = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
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
                            openModal();  // Open the modal when the update function is triggered
                        }
                    },
                    {
                        label: 'Address',
                        value: (
                            <>
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
            {isModalOpen && (
                <DefaultModal 
                    Icon={CheckIcon} // Replace with your icon path or component
                    title="Update Information"
                    description="Update the necessary information here."
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onClickAction={() => {
                        // Some action you want to perform when the button inside the modal is clicked
                        closeModal();
                    }}
                />
            )}
        </>
    );

}

export default OrganisationDataCard;