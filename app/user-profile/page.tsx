'use client'

import SimpleHeader from "@/components/ui/headers/SimpleHeader"
import API from "@/utils/api/api"
import { ChangeEvent, useCallback, useEffect, useState } from "react"
import axios from "axios"
import { useSession } from "next-auth/react"
import DefaultInput from "@/components/ui/elements/DefaultInput"
import DefaultButton from "@/components/ui/buttons/DefaultButton"
import { signOut } from "next-auth/react"

export interface UserData {
    userName?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
}

const UserProfile = () => {
    const session = useSession()
    const [ userData, setUserData ] = useState<UserData | undefined>()
    const [ isEdited, setIsEdited ] = useState(false)
    const [ isUserOrganisation, setIsUserOrganisation ] = useState<boolean>(true)

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
  
    const handleOnclickDeleteBtn = useCallback(() => {
        API.getOrganisationsByUser()
        .then(response => {
          if(response.data.length > 0) {
            setIsUserOrganisation(true)
            alert("You have still the relations with organisations.")
          } else {
            setIsUserOrganisation(false)
            deleteAccount()
          }
        })
        .catch(error => {console.log("Error while getting user organisation", error)})
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
                {isEdited ? <div className="flex items-center justify-end p-6">
                    <DefaultButton
                        type="secondary"
                        onClick={handleClickEditCancelButton}
                        label={"cancel"}
                    />
                    <DefaultButton
                        type="primary"
                        onClick={handleClickEditSaveButton}
                        label={"save"}
                    />
                </div> : 
                <div className="flex items-center justify-end p-6">
                    <DefaultButton
                        type="primary"
                        onClick={handleClickEditButton}
                        label={"edit"}
                    />
                </div> }
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
                
            <div className="inline-flex justify-end w-full mt-10">
                <DefaultButton
                    onClick={signOut}
                    label={"log out"}
                />
                <DefaultButton
                    onClick={handleOnclickDeleteBtn}
                    label={"delete account"}
                />
            </div>
        </>
    )
}

export default UserProfile