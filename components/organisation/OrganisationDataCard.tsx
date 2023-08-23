'use client'

import { ChangeEvent, useCallback, useEffect } from "react";
import DataCard from "../ui/data/DataCard";
import { useState } from 'react';
import API from "@/utils/api/api";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Modal from "../ui/modal/Modal";
import DefaultInput from "../ui/elements/DefaultInput";

export interface OrganisationDataCardProps {
    organisationId: string;
}

export interface Address {
    street?: string;
    postalcode?: string;
    city?: string;
    countrycode?: string;
}


const OrganisationDataCard = ({organisationId}: OrganisationDataCardProps) => {
    const router = useRouter();
    const session = useSession();
    const [ organisationData, setOrganisationData ] = useState<any>()
    const [ isNameModalOpen, setIsNameModalOpen ] = useState<boolean>(false);
    const [ isAddressModalOpen, setIsAddressModalOpen ] = useState<boolean>(false);
    const [ address, setAddress ] = useState<Address | undefined>();
    const [ name, setName ] = useState<string>("")

    useEffect(() => {
        //@ts-ignore
        if(session.data?.accessToken) axios.defaults.headers.common['Authorization'] = `${session.data?.accessToken}`;
        handleGetOrganisationInfo();
    }, [])

    const handleGetOrganisationInfo = () => {
        API.getOrganisationInfo(organisationId)
        .then(response => {
          if(response.data){
            setOrganisationData(response.data)
            setName(response.data.name)
            setAddress(response.data.address)
          }
        })
        .catch(error => {
            if(error.response.status === 404) router.push('/restricted')
        })
    }

    const handleEditUserName = useCallback(() => {
        API.updateOrganisation(organisationId, {name: name})
            .then(response => {
                if(response.status === 200) {
                    setIsNameModalOpen(false)
                    handleGetOrganisationInfo()
                }
            })
            .catch(error => console.log("Error while updating the organisation name", error))
    }, [name])

    const handleEditUserAddress = useCallback(() => {
        API.updateOrganisation(organisationId, {address: address})
            .then(response => {
                if(response.status === 200) {
                    setIsAddressModalOpen(false)
                    handleGetOrganisationInfo()
                }
            })
            .catch(error => console.log("Error while updating the organisation address", error))
    }, [address])

    const openEditNameModal = useCallback(() => {
        setIsNameModalOpen(true)
    }, [])

    const openEditAddressModal = useCallback(() => {
        setIsAddressModalOpen(true)
    }, [])

    const handleAddressChange =  useCallback((field: string) => (e: ChangeEvent<HTMLInputElement>) => {
        setAddress((prevState) => ({...prevState, [field]: e.target.value}))
    }, [])

    const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }, [])

    return (
        <>
            {organisationData && <DataCard 
                title= "Organisation Information"
                description= "An overview with organisational information"
                data={[
                    {
                        label: 'Short Name',
                        value: organisationData.slug,
                    },
                    {
                        label: 'Full Name',
                        value: organisationData.name,
                        onUpdate: openEditNameModal
                    },
                    {
                        label: 'Address',
                        value: organisationData.address && (
                            <>
                                <div>{`Street: ${organisationData.address.street ? organisationData.address.street : ""}`}</div>
                                <div>{`Postal code: ${organisationData.address.postalcode ? organisationData.address.postalcode : ""}`}</div>
                                <div>{`City: ${organisationData.address.city ? organisationData.address.city : ""}`}</div>
                                <div>{`Country code: ${organisationData.address.countrycode ? organisationData.address.countrycode : ""}`}</div>
                            </>
                        ) ,
                        onUpdate: openEditAddressModal
                    }
                ]}
            />}
            <Modal 
                visible={isNameModalOpen} 
                title="Edit user name"
                ok_text="Update"
                cancel_text="Cancel"
                onCancelClick={() => setIsNameModalOpen(false)} 
                onOkClick={handleEditUserName}
                >      
                    <div className="mt-2 pl-10 space-y-8 pb-12 sm:space-y-0 sm:pb-0">
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                            UserName
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <DefaultInput 
                                    name="username"
                                    id="username"
                                    autoComplete="username"
                                    placeholder="username"
                                    onChange={handleNameChange}
                                    value={name}
                                />
                            </div>
                        </div>
                    </div>
            </Modal> 

            <Modal 
                visible={isAddressModalOpen} 
                title="Edit user address"
                ok_text="Update"
                cancel_text="Cancel"
                onCancelClick={() => setIsAddressModalOpen(false)} 
                onOkClick={handleEditUserAddress}
                >      
                    <div className="mt-2 pl-10 space-y-8 pb-12 sm:space-y-0 sm:pb-0">
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                            Street
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <DefaultInput 
                                    name="street"
                                    id="street"
                                    autoComplete="street"
                                    placeholder="street"
                                    onChange={handleAddressChange("street")}
                                    value={address?.street}
                                />
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label htmlFor="postalcode" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                            Postal code
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <DefaultInput 
                                    name="postalcode"
                                    id="postalcode"
                                    autoComplete="postalcode"
                                    placeholder="postalcode"
                                    onChange={handleAddressChange("postalcode")}
                                    value={address?.postalcode}
                                />
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                            City
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                            <DefaultInput 
                                name="city"
                                id="city"
                                autoComplete="city"
                                placeholder="city"
                                onChange={handleAddressChange("city")}
                                value={address?.city}
                            />
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label htmlFor="countrycode" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                            Country Code
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                            <DefaultInput 
                                name="countrycode"
                                id="countrycode"
                                autoComplete="countrycode"
                                placeholder="countrycode"
                                onChange={handleAddressChange("countrycode")}
                                value={address?.countrycode}
                            />
                            </div>
                        </div>
                    </div>
            </Modal>
        </>
    );

}

export default OrganisationDataCard;