'use client'

import React, { useState, useEffect, useMemo } from 'react';
import API from "@/utils/api/api"
import { Disclosure } from '@headlessui/react'
import DefaultButton from '../buttons/DefaultButton';
import {
  CalendarIcon,
  ChartPieIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  BuildingOfficeIcon,
  ClipboardDocumentListIcon,
  WrenchScrewdriverIcon,
  UserIcon,
  UserPlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'
import { redirect, useRouter } from 'next/navigation';
import IconButton from '../buttons/IconButton';

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

export interface MenuChild {
  name: string;
  href: string;
  current: boolean;
}

export interface Organisation {
  id: number;
  name: string;
  href: string;
  initial: string;
  current: boolean;
}

export interface MenuItem {
  name: string;
  href: string;
  icon: string;
  current: boolean;
  children?: MenuChild[];
}

export interface NavProps {
  menuitems: MenuItem[];
  organisations?: Organisation[];
  isUserProfilePage?: boolean;
}

const icons: { [iconName: string]: React.ElementType } = {
  CalendarIcon: CalendarIcon,
  ChartPieIcon:ChartPieIcon ,
  ClipboardDocumentListIcon:ClipboardDocumentListIcon,
  FolderIcon:FolderIcon,
  HomeIcon:HomeIcon,
  UsersIcon:UsersIcon,
  BuildingOfficeIcon:BuildingOfficeIcon,
  WrenchScrewdriverIcon:WrenchScrewdriverIcon,
  UserIcon: UserIcon,
  UserPlusIcon: UserPlusIcon
};

const SideNavWithSub: React.FC<NavProps> = ({menuitems, organisations, isUserProfilePage}) => {
  const router = useRouter()
  const [ userData, setUserData ] = useState<any>();
  const [ hiddenSide, setHiddenSide ] = useState(true)

  let mainClassName = "flex flex-col pt-8 pb-2 h-screen gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6";
  
  useEffect(() => {
    handleGetUserData()
  }, [])

  const handleGetUserData = () => {
    API.getUserData()
    .then(response => {
      setUserData(response.data[0])
    })
    .catch(error => {
      console.log(error, "while getting user data")
    })
  }

  const navigateAnotherSite = () => {
    const newUrl = 'https://app.briggsdev.tech';

    window.location.href = newUrl
  }

  mainClassName = useMemo(() => {
    switch(hiddenSide) {
      case false:
        return mainClassName += " w-[300px] px-8";
      case true:
        return mainClassName += " w-[80px] px-4 relative";
    }
  }, [hiddenSide])

  return (
    <div className={mainClassName}>
      <div className='flex justify-between'>
        <div onClick={() => router.push('/')} className={classNames(
          !hiddenSide ? 'justify-between' : 'justify-center',
          'flex h-12 w-12 rounded items-center cursor-pointer'
        )}>
          <img
            className="h-8 rounded-[16px] w-auto"
            src="/briggsplus-logo.png"
            alt="Light Portal"
          />
        </div>
        {!hiddenSide && <div className='h-full flex items-center cursor-pointer' onClick={() => setHiddenSide(true)}><ChevronLeftIcon className='h-[24px]' /></div>}
        {hiddenSide && <div className='fixed flex items-center bg-white top-10 left-14 z-10 h-8 p-2 cursor-pointer' onClick={() => setHiddenSide(false)}><ChevronRightIcon  className='h-[24px]'/></div>}
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {menuitems.map((item) => (
                <li key={item.name}>
                  {!item.children ? (
                    <a
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-50' : 'hover:bg-gray-100',
                        !hiddenSide ? 'justify-between' : 'justify-center',
                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700'
                      )}
                    >
                      {React.createElement(icons[item.icon], {className: "h-6 w-6 shrink-0 text-gray-400", 'aria-hidden': "true"})}
                      {!hiddenSide && item.name}
                    </a>
                  ) : (
                    <Disclosure as="div">
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            className={classNames(
                              item.current ? 'bg-gray-50' : 'hover:bg-gray-50',
                              'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-700'
                            )}
                          >
                            <div className="h-6 w-6 shrink-0 text-gray-400" aria-hidden="true" >
                              <item.icon />
                            </div>
                            {item.name}
                            <ChevronRightIcon
                              className={classNames(
                                open ? 'rotate-90 text-gray-500' : 'text-gray-400',
                                'ml-auto h-5 w-5 shrink-0'
                              )}
                              aria-hidden="true"
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel as="ul" className="mt-1 px-2">
                            {item.children?.map((subItem) => (
                              <li key={subItem.name}>
                                {/* 44px */}
                                <Disclosure.Button
                                  as="a"
                                  href={subItem.href}
                                  className={classNames(
                                    subItem.current ? 'bg-gray-50' : 'hover:bg-gray-50',
                                    'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700'
                                  )}
                                >
                                  {subItem.name}
                                </Disclosure.Button>
                              </li>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  )}
                </li>
              ))}
            </ul>
          </li>

          { //@ts-ignore
            organisations?.length > 0 && (
              <li>
                  {!hiddenSide && <div className="text-xs font-semibold leading-6 text-gray-700">Managed Organisations</div>}
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                      {organisations?.map((organisation) => (
                          <li key={organisation.name}>
                              <a
                                  href={organisation.href}
                                  className={classNames(
                                      organisation.current ? 'bg-gray-50' : 'hover:bg-gray-50',
                                      !hiddenSide ? 'justify-between' : 'justify-center',
                                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700'
                                  )}
                              >
                                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-400 bg-gray-500 text-[0.625rem] font-medium text-white">
                                      {organisation.initial}
                                  </span>
                                  {!hiddenSide && <span className="truncate">{organisation.name}</span>}
                              </a>
                          </li>
                      ))}
                  </ul>
              </li>
          )}

          {!hiddenSide ? <DefaultButton
            label="Let's signup!"
            onClick={navigateAnotherSite}
            type='confirmation'
          /> : <IconButton
            icon={<ArrowRightOnRectangleIcon className="h-5 w-5" />}
            label="Let's signup!"
            onClick={navigateAnotherSite}
            visible={() => true}
          />}

          {!isUserProfilePage && <li className="-mx-6 mt-auto">
            <div
              onClick={() => router.push('/user-profile')}
              className={classNames(
                !hiddenSide ? 'justify-between' : 'justify-center',
                'flex items-center gap-x-4 px-6 py-3 font-semibold leading-6 text-gray-900 hover:bg-gray-50 cursor-pointer'
              )}
            >
              <img
                className="h-8 w-8 rounded-full bg-gray-50"
                src="johndoeavatar.png"
                alt=""
              />
              <span className="sr-only">Your profile</span>
              {userData && !hiddenSide && <span aria-hidden="true">{`${userData?.firstName} ${userData?.lastName}`}</span>}
            </div>
          </li>
          }
        </ul>
      </nav>
    </div>
  )
}

export default SideNavWithSub;