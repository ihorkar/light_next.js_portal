'use client'

import SimpleHeader from "@/components/ui/headers/SimpleHeader"
import API from "@/utils/api/api"
import { ChangeEvent, useCallback, useEffect, useState } from "react"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import DefaultInput from "@/components/ui/elements/DefaultInput"
import DefaultButton from "@/components/ui/buttons/DefaultButton"
import Modal from "@/components/ui/modal/Modal"
import { signOut } from "next-auth/react"
import IconButton from "@/components/ui/buttons/IconButton"
import { PencilIcon } from "@heroicons/react/24/outline"
import DefaultSelect, { ISelectOption } from "@/components/ui/elements/DefaultSelect"
import ReactCountryFlag from "react-country-flag"
import { SingleValue, ActionMeta } from "react-select"
import Notiflix from "notiflix"

export interface UserData {
    userName?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
}

const options: ISelectOption[] = [
    {label: "English", image: <ReactCountryFlag countryCode='GB' svg style={{width: '24px', height: '24px'}} />},
    {label: "Dutch", image: <ReactCountryFlag countryCode='NL' svg style={{width: '24px', height: '24px'}} />}
]

const UserProfile = () => {
    const session = useSession()
    const [ userData, setUserData ] = useState<UserData | undefined>()
    const [ isEdited, setIsEdited ] = useState(false)
    const [ isUserOrganisation, setIsUserOrganisation ] = useState<boolean>(true)
    const [showShowCreateProjectModal, setShowCreateProjectModal] = useState(false);
    const [showDeleteConfirmedModal, setShowDeleteConfirmedModal] = useState(false);
    const [language, setLanguage] = useState<ISelectOption>(options[0])

    const router = useRouter()

    useEffect(() => {
        //@ts-ignore
        if (session.data?.accessToken) axios.defaults.headers.common["Authorization"] = `${session.data?.accessToken}`;
        handleGetUserData()
    }, [])

    const handleGetUserData = () => {
        API.getUserData()
        .then(response => {
          const userData = response.data[0]
          setUserData({
            userName: userData.userName,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName
          })
          options.map((option: ISelectOption) => {
            if(option.label === userData.language) setLanguage(option)
          })
        })
        .catch(error => {
            if(error.response.status === 401){
                signOut();
            }else{
                console.log(error, "Error getting the user data")
            }
        })
    }

    const handleUpdateUserData = () => {
        API.updateUserInfo(userData)
            .then(response => {
                if(response.status === 200){
                    handleGetUserData()
                    setIsEdited(false)
                }
            })
            .catch(error => {
                console.log("Error while updating user data", error)
            })
    }

    const handleClickEditButton = useCallback(() => {
        setIsEdited(true)
    }, [])

    const handleClickEditCancelButton = useCallback(() => {
        setIsEdited(false)
    }, [])

    const handleClickEditSaveButton = useCallback(() => {
        handleUpdateUserData()
    }, [userData])

    const handelChangeUserData = useCallback((field: string) => (e: ChangeEvent<HTMLInputElement>) => {
        setUserData((prev) => ({...prev, [field]: e.target.value}))
    }, [])

    const handleShowDeleteAccountModal = useCallback(() => {
      setShowCreateProjectModal(true)
    }, [])

    const handleCloseDeleteAccountModal = useCallback(() => {
      setShowCreateProjectModal(false)
    }, [])
  
    const handleOnclickDeleteBtn = useCallback(() => {
        API.getOrganisationsByUser()
        .then(response => {
          if(response.data.length > 0) {
            setIsUserOrganisation(true)
            setShowCreateProjectModal(false)
            setShowDeleteConfirmedModal(true)
          } else {
            setIsUserOrganisation(false)
            deleteAccount()
            setShowCreateProjectModal(false)
          }
        })
        .catch(error => {
            console.log("Error while getting user organisation", error)
            if(error.response.status === 500) router.push('/service-anavailabled')
        })
    }, [])

    const handleSelectedLanguage = useCallback(async (newValue: SingleValue<ISelectOption>, actionMeta: ActionMeta<ISelectOption>) => {
        if(newValue) {
            setLanguage(newValue);
            await API.setLanguageByUserId(newValue.label)
                .then(response => {
                    if(response.status === 201) Notiflix.Notify.success("Language selected successfully!")
                })
                .catch(error => {
                    console.log("Error while getting user", error)
                })
        }
    }, [])
    
    const deleteAccount = () => {
        API.deleteUserAccount()
        .then(response => {
            if(response.status === 200){
            signOut();
            }
        })
        .catch(error => console.log("Error deleting the user account", error))
    }


    return (
        <>
            <div className="inline-flex justify-between w-full">
                <SimpleHeader Headline= "User Profile" />
                <div className="flex">
                    {isEdited ? <div className="flex items-center p-6 gap-x-2">
                        <DefaultButton
                            type="primary"
                            onClick={handleClickEditCancelButton}
                            label={"cancel"}
                        />
                        <DefaultButton
                            type="confirmation"
                            onClick={handleClickEditSaveButton}
                            label={"save"}
                        />
                    </div> : 
                    <div className="flex items-center p-6">
                        <IconButton
                            icon={<PencilIcon className="h-5 w-5" />}
                            onClick={handleClickEditButton}
                            label={"Edit"}
                            type={"default"}
                            visible={() => true}
                        />
                    </div> }
                    <div className="py-6">
                        <DefaultSelect options={options} onChange={handleSelectedLanguage} selectedOption={language} required />
                    </div>
                </div>
            </div>
            <div className="inline-flex mt-10 gap-10 w-full">
                <div className="inline-flex sm:items-start sm:gap-4 sm:py-6">
                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                    Username
                    </label>
                    <div className="mt-2 sm:mt-0">
                        <DefaultInput 
                            name="username"
                            id="username"
                            autoComplete="username"
                            placeholder="username"
                            value={userData?.userName}
                            onChange={handelChangeUserData('userName')}
                            required
                            disabled={!isEdited}
                        />
                    </div>
                </div>
                <div className="inline-flex sm:items-start sm:gap-4 sm:py-6">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                    Email
                    </label>
                    <div className="mt-2 sm:mt-0">
                        <DefaultInput 
                            name="email"
                            id="email"
                            autoComplete="email"
                            placeholder="email"
                            value={userData?.email}
                            onChange={handelChangeUserData('email')}
                            required
                            disabled={!isEdited}
                        />
                    </div>
                </div>
            </div>
            <div className="inline-flex mt-10 gap-10 w-full">
                <div className="inline-flex sm:items-start sm:gap-4 sm:py-6">
                    <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                    FirstName
                    </label>
                    <div className="mt-2 sm:mt-0">
                        <DefaultInput 
                            name="firstName"
                            id="firstName"
                            autoComplete="firstName"
                            placeholder="firstName"
                            value={userData?.firstName}
                            onChange={handelChangeUserData('firstName')}
                            required
                            disabled={!isEdited}
                        />
                    </div>
                </div>
                <div className="inline-flex sm:items-start sm:gap-4 sm:py-6">
                    <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                    Lastname
                    </label>
                    <div className="mt-2 sm:mt-0">
                        <DefaultInput 
                            name="lastname"
                            id="lastname"
                            autoComplete="lastname"
                            placeholder="lastname"
                            value={userData?.lastName}
                            onChange={handelChangeUserData('lastName')}
                            required
                            disabled={!isEdited}
                        />
                    </div>
                </div>
            </div>
                
            <div className="inline-flex justify-end w-full mt-10 gap-x-4">
                <DefaultButton
                    onClick={signOut}
                    type="primary"
                    label={"log out"}
                />
                <Modal 
                  visible={showShowCreateProjectModal} 
                  title="Delete Account"
                  ok_text={"Delete"}
                  cancel_text={"Cancel"} 
                  type="critical"
                  onCancelClick={handleCloseDeleteAccountModal} 
                  onOkClick={handleOnclickDeleteBtn}
                >
                    <p>Do you really delete account?</p>
                </Modal>
                <Modal 
                  visible={showDeleteConfirmedModal} 
                  title="Deleted account successfully!"
                  ok_text="Confirm"
                  type="confirmation"
                  onCancelClick={() => setShowDeleteConfirmedModal(false)} 
                  onOkClick={() => setShowDeleteConfirmedModal(false)}
                >
                    <p>You have still the relations with organisations.</p>
                </Modal>
                <DefaultButton
                    onClick={handleShowDeleteAccountModal}
                    type="critical"
                    label={"delete account"}
                />
            </div>
        </>
    )
}

export default UserProfile