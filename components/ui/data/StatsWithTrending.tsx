import { useState, useEffect } from "react";
import API from "@/utils/api/api";
  
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export interface StatsWithTrendingProps {
  organisationId: string;
}

export default function StatsWithTrending({ organisationId }: StatsWithTrendingProps) {
  const [result, setResult] = useState(0)
  const [yesterdayResult, setYesterdayResult] = useState(0)
  const [crewsize, setCrewsize] = useState(0)
  const [projectActive, setProjectActive] = useState(0)

  useEffect(() => {
    handleGetResultData();
    handleGetUserData();
    handleGetActiveProject();
  }, []);

  const handleGetResultData = async () => {
    await API.getResultsByOrganisation(organisationId).then(response => {
      const today = new Date();
      let year = today.getFullYear();
      let month = today.getMonth();
      let date = today.getDate();
      let yesterdayresult = 0;

      const yesterday = month < 9 ? `${year}-0${month+1}-${date-1}` : `${year}-${month+1}-${date-1}`;
      if (response.data.length > 0) setResult(response.data.length);
      
      response.data.map((result: any) => {
        if(result.date === yesterday) yesterdayresult++ 
      })

      setYesterdayResult(yesterdayresult)
    });
  };

  const handleGetUserData = async () => {
    await API.getUsersByOrganisation(organisationId).then(response => {
      if(response.data.length > 0) setCrewsize(response.data.length)
    })
  }

  const handleGetActiveProject = async () => {
    await API.getActiveFormByOrganisation(organisationId).then(response => {
      if(response.data.length > 0) setProjectActive(response.data.length)
    })
  }
  
  const stats = [
    { name: 'Results', value: result},
    { name: 'Yesterday Result', value: yesterdayResult, change: '+0%', changeType: 'positive' },
    { name: 'Crewsize', value: crewsize, change: '+0%', changeType: 'positive' },
    { name: 'Active Projects', value: projectActive },
  ]

  return (
    <dl className="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8"
        >
          <dt className="text-sm font-medium leading-6 text-gray-500">{stat.name}</dt>
          <dd
            className={classNames(
              stat.changeType === 'negative' ? 'text-rose-600' : 'text-gray-700',
              'text-xs font-medium'
            )}
          >
            {stat.change}
          </dd>
          <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}
  