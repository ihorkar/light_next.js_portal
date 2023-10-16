'use client'

import { useState, useCallback } from "react"
import Container from "@/components/ui/Layout/Container"
import UserSignUp from "@/components/user/UserSignup"
import DefaultHeader from "@/components/ui/headers/DefaultHeader"
import DefaultSelect, { ISelectOption } from "@/components/ui/elements/DefaultSelect"
import ReactCountryFlag from "react-country-flag"
import { SingleValue, ActionMeta } from "react-select"

const options: ISelectOption[] = [
    {label: "English", image: <ReactCountryFlag countryCode='GB' svg style={{width: '24px', height: '24px'}} />},
    {label: "Dutch", image: <ReactCountryFlag countryCode='NL' svg style={{width: '24px', height: '24px'}} />}
]


export default function Page() {
  const [language, setLanguage] = useState<ISelectOption>(options[0])

  const handleSelectedLanguage = useCallback((newValue: SingleValue<ISelectOption>, actionMeta: ActionMeta<ISelectOption>) => {
      if(newValue) setLanguage(newValue)
  }, [])

  return (
    <div className="bg-white">
      <Container>
        <div className="flex w-full justify-end">
          <DefaultSelect options={options} onChange={handleSelectedLanguage} selectedOption={language} required />
        </div>
        <DefaultHeader
          Headline="Join Briggs"
          Description="Sign up and start boosting your campaign today."
          subHeadline="Welcome to Our Platform"
        />
        <UserSignUp lang={language.label} />
      </Container>
    </div>
  )
}
