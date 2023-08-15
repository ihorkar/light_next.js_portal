 'use client'
import { useEffect, useState } from "react"
import API from "@/utils/api/api"
import { useSession } from "next-auth/react"
import axios from "axios"
  
  export default function FullWidthList({organisationId}: {organisationId: string}) {
    const [resultData, setResultData] = useState<any[]>()
    const session = useSession();

    useEffect(() => {
      //@ts-ignore
      if(session.data?.accessToken) axios.defaults.headers.common['Authorization'] = `${session.data?.accessToken}`;
      handleGetResultData()
    }, [])

    const handleGetResultData = async () => {
      await API.getResultsByOrganisation(organisationId)
        .then(response => {
          if(response.data.length > 0) setResultData(response.data)
        })
    }

    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            {/*Leave for filters and stuff */}
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Result
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                    >
                      Form
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Agent
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Date
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                      <span className="sr-only">View</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {resultData?.map((form) => (
                    <tr key={form.resultId}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{form.resultId}</td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                        {form.form}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{form.agent}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{form.date}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          View<span className="sr-only">, {form.resultId}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
  