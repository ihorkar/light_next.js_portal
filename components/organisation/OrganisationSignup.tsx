'use client'

import { ChangeEvent, useCallback, useRef, useState, MouseEvent, useEffect } from 'react'
import DefaultInput from '../ui/elements/DefaultInput'
import API from '@/utils/api/api';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import axios from 'axios';

export default function OrganisationSignUp() {
  const router = useRouter()
  const session = useSession()
  const [ slug, setSlug ] = useState("");
  const [ name, setName ] = useState("");
  const formEl = useRef<HTMLFormElement>(null)

  useEffect(() => {
    //@ts-ignore
    if (session.data?.accessToken){
        //@ts-ignore
        axios.defaults.headers.common['Authorization'] = `${session.data?.accessToken}`;
    }
}, []);

  const handleChangeSlugInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value)
  }, [])

  const handelChangeNameInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }, [])

  const handleOnSubmitOrganisation = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    formEl.current?.reportValidity();
    const organisationData = {slug: slug, name: name}
    API.createOrganisation(organisationData)
      .then(response => {
        if(response.status === 201) router.push(`${response.data.slug}/organisation`)
      })
      .catch(error => console.log("Error while creating organisation", error))
  }

  return (
    <form ref={formEl} className="w-full max-w-lg mx-auto bg-gray-100 p-8 rounded-lg shadow-md">
      <div className="space-y-12 sm:space-y-16 p-8">
        <div>
          <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label htmlFor="slug" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Short Name
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">portal.briggsdev.tech/</span>
                    <DefaultInput 
                        name="Short Name"
                        id="slug"
                        autoComplete="Short Name"
                        placeholder="Short Name"
                        onChange={handleChangeSlugInput}
                        required
                    />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Full name
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <DefaultInput 
                        name="name"
                        id="name"
                        autoComplete="name"
                        placeholder="Your awesome company Ltd."
                        onChange={handelChangeNameInput}
                        required
                    />
              </div>
            </div>
        </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type='submit'
          onClick={handleOnSubmitOrganisation}
          className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  )
}
