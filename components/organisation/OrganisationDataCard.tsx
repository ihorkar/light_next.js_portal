'use client'

import { ChangeEvent, useCallback, useEffect, useRef } from "react";
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

export interface Payment {
    type?: string;
    SEPACreditorIdentifier?: string;
}

export interface ContactDetails {
    ContactEmail?: string;
    ContactPhone?: string;
}

export interface IsModalsOpen {
    name: boolean;
    address: boolean;
    payment: boolean;
    contactDetails: boolean;
}

const OrganisationDataCard = ({organisationId}: OrganisationDataCardProps) => {
    const router = useRouter();
    const session = useSession();
    const [ organisationData, setOrganisationData ] = useState<any>();
    const [ isModalsOpen, setIsModalsOpen ] = useState<IsModalsOpen>({name: false, address: false, payment: false, contactDetails: false})
    const [ name, setName ] = useState<string>("");
    const [ address, setAddress ] = useState<Address | undefined>();
    const [ contactDetails, setContactDetails ] = useState<ContactDetails | undefined>();
    const [ payment, setPayment ] = useState<Payment | undefined>();
    const phoneNumberInputEl = useRef<HTMLFormElement>(null)

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
            setContactDetails(response.data.contactDetails)
            setPayment(response.data.payment)
          }
        })
        .catch(error => {
            if(error.response.status === 404) router.push('/restricted')
        })
    }

    const handleEditOrganisationData = useCallback((modalName: string, data: any) => () => {
        if(modalName === 'contactDetails' && !phoneNumberInputEl.current?.reportValidity()) return;
        API.updateOrganisation(organisationId, {[modalName]: data})
            .then(response => {
                if(response.status === 200) {
                    let closeModal = closeModals(modalName)
                    closeModal();
                    handleGetOrganisationInfo()
                }
            })
            .catch(error => console.log("Error while updating the organisation", error))
    }, [name, address, payment, contactDetails])

    const openModals = useCallback((name: string) => () => {
        setIsModalsOpen((prev) => ({...prev, [name]: true}))
    }, [])

    const closeModals = useCallback((name: string) => () => {
        setIsModalsOpen((prev) => ({...prev, [name]: false}))
    }, [])

    const modalDataChange = useCallback((modalName: string, field: string) => (e: ChangeEvent<HTMLInputElement>) => {
        switch (modalName) {
            case "name":
                setName(e.target.value)
                break;
            case "address":
                setAddress((prevState) => ({...prevState, [field]: e.target.value}))
                break;
            case "payment":
                setPayment((prevState) => ({...prevState, [field]: e.target.value}))
                break;
            case "contactDetails":
                setContactDetails((prevState) => ({...prevState, [field]: e.target.value}))
                break;
            default:
                break;
        }
    }, [])

    return (
        <>
            {organisationData && <DataCard 
                data={[
                    {
                        label: 'Short Name',
                        value: organisationData.slug,
                    },
                    {
                        label: 'Full Name',
                        value: organisationData.name,
                        onUpdate: openModals('name')
                    },
                    {
                        label: 'Address',
                        value: organisationData.address && (
                            <>
                                <div>{`${organisationData.address.street ? organisationData.address.street : ""}`}</div>
                                <div>{`${organisationData.address.postalcode ? organisationData.address.postalcode : ""}`}</div>
                                <div>{`${organisationData.address.city ? organisationData.address.city : ""}`}</div>
                                <div>{`${organisationData.address.countrycode ? organisationData.address.countrycode : ""}`}</div>
                            </>
                        ) ,
                        onUpdate: openModals('address')
                    },
                    {
                        label: 'Payment',
                        value: organisationData.payment && (
                            <>
                                <div>{`type: ${organisationData.payment.type ? organisationData.payment.type : ""}`}</div>
                                <div>{`SEPA Creditor Identifier: ${organisationData.payment.SEPACreditorIdentifier ? organisationData.payment.SEPACreditorIdentifier : ""}`}</div>
                            </>
                        ),
                        onUpdate: openModals('payment')
                    },
                    {
                        label: 'Contact Details',
                        value:  organisationData.contactDetails && (
                            <>
                                <div>{`${organisationData.contactDetails.ContactEmail ? organisationData.contactDetails.ContactEmail : ""}`}</div>
                                <div>{`${organisationData.contactDetails.ContactPhone ? organisationData.contactDetails.ContactPhone : ""}`}</div>
                            </>
                        ),
                        onUpdate: openModals('contactDetails')
                    }
                ]}
            />}
            {/* Edit name modal */}
            <Modal 
                visible={isModalsOpen.name} 
                title="Edit name"
                ok_text="Update"
                cancel_text="Cancel"
                type="secondary"
                onCancelClick={closeModals('name')} 
                onOkClick={handleEditOrganisationData('name', name)}
                >      
                    <div className="mt-2 pl-10 space-y-8 pb-12 sm:space-y-0 sm:pb-0">
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label htmlFor="My awesome organisation" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                            Name
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <DefaultInput 
                                    name="name"
                                    id="name"
                                    autoComplete="name"
                                    placeholder="name"
                                    onChange={modalDataChange("name", "")}
                                    value={name}
                                />
                            </div>
                        </div>
                    </div>
            </Modal> 
            {/* Edit Address modal */}
            <Modal 
                visible={isModalsOpen.address} 
                title="Edit company address"
                ok_text="Update"
                cancel_text="Cancel"
                type="primary"
                onCancelClick={closeModals('address')} 
                onOkClick={handleEditOrganisationData('address', address)}
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
                                    placeholder="123 Field Avenue"
                                    onChange={modalDataChange("address", "street")}
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
                                    placeholder="X12 Y34"
                                    onChange={modalDataChange("address", "postalcode")}
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
                                placeholder="Metropolis"
                                onChange={modalDataChange("address", "city")}
                                value={address?.city}
                            />
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label htmlFor="Country" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                            Country Code
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                            <DefaultInput 
                                name="countrycode"
                                id="countrycode"
                                autoComplete="countrycode"
                                placeholder="Storyland"
                                onChange={modalDataChange("address", "countrycode")}
                                value={address?.countrycode}
                            />
                            </div>
                        </div>
                    </div>
            </Modal>
            {/* Edit Payment modal */}
            <Modal 
                visible={isModalsOpen.payment} 
                title="Edit payment info"
                ok_text="Update"
                cancel_text="Cancel"
                type="primary"
                onCancelClick={closeModals('payment')} 
                onOkClick={handleEditOrganisationData('payment', payment)}
                >      
                    <div className="mt-2 pl-10 space-y-8 pb-12 sm:space-y-0 sm:pb-0">
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                            Type
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <DefaultInput 
                                    name="type"
                                    id="type"
                                    autoComplete="type"
                                    placeholder="SEPA Direct Debit"
                                    onChange={modalDataChange("payment", "type")}
                                    value={payment?.type}
                                />
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label htmlFor="SEPACreditorIdentifier" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                            SEPA Creditor Identifier
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <DefaultInput 
                                    name="SEPACreditorIdentifier"
                                    id="SEPACreditorIdentifier"
                                    autoComplete="SEPACreditorIdentifier"
                                    placeholder="NL98ZZZ999999990000"
                                    onChange={modalDataChange("payment", "SEPACreditorIdentifier")}
                                    value={payment?.SEPACreditorIdentifier}
                                />
                            </div>
                        </div>
                    </div>
            </Modal>
            {/* Edit Contact Detail modal */}
            <Modal 
                visible={isModalsOpen.contactDetails} 
                title="Edit contact details"
                ok_text="Update"
                cancel_text="Cancel"
                type="primary"
                onCancelClick={closeModals('contactDetails')} 
                onOkClick={handleEditOrganisationData('contactDetails', contactDetails)}
                >      
                    <form ref={phoneNumberInputEl}>
                        <div className="mt-2 pl-10 space-y-8 pb-12 sm:space-y-0 sm:pb-0">
                            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                <label htmlFor="Email" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                Email
                                </label>
                                <div className="mt-2 sm:col-span-2 sm:mt-0">
                                    <DefaultInput 
                                        name="ContactEmail"
                                        id="ContactEmail"
                                        autoComplete="ContactEmail"
                                        placeholder="ContactEmail"
                                        onChange={modalDataChange("contactDetails", "ContactEmail")}
                                        value={contactDetails?.ContactEmail}
                                    />
                                </div>
                            </div>
                            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                <label htmlFor="Phone" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                Phone number
                                </label>
                                <div className="mt-2 sm:col-span-2 sm:mt-0">
                                    <DefaultInput 
                                        title="phone number"
                                        name="ContactPhone"
                                        id="ContactPhone"
                                        autoComplete="ContactPhone"
                                        placeholder="ContactPhone"
                                        onChange={modalDataChange("contactDetails", "ContactPhone")}
                                        value={contactDetails?.ContactPhone}
                                        pattern="[0-9]{10,15}"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
            </Modal>
        </>
    );

}

export default OrganisationDataCard;