'use client'

import React from 'react';
import { Disclosure } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  BuildingOfficeIcon,
  ClipboardDocumentListIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline'

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

export interface MenuChild {
  name: string;
  href: string;
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
}

const icons: { [iconName: string]: React.ElementType } = {
  CalendarIcon: CalendarIcon,
  ChartPieIcon:ChartPieIcon ,
  ClipboardDocumentListIcon:ClipboardDocumentListIcon,
  FolderIcon:FolderIcon,
  HomeIcon:HomeIcon,
  UsersIcon:UsersIcon,
  BuildingOfficeIcon:BuildingOfficeIcon,
  WrenchScrewdriverIcon:WrenchScrewdriverIcon
};

const SideNavWithSub: React.FC<NavProps> = ({
  menuitems}
      ) => {
  return (
    <div className="flex grow flex-col max-w-xs h-screen gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
      <div className="flex h-16 shrink-0 items-center">
        <img
          className="h-8 w-auto"
          src="/briggsplus.png"
          alt="Light Portal"
        />
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
                        item.current ? 'bg-gray-50' : 'hover:bg-gray-50',
                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700'
                      )}
                    >
                      {React.createElement(icons[item.icon], {className: "h-6 w-6 shrink-0 text-gray-400", 'aria-hidden': "true"})}
                      {item.name}
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
          <li className="-mx-6 mt-auto">
            <a
              href="#"
              className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
            >
              <img
                className="h-8 w-8 rounded-full bg-gray-50"
                src="johndoeavatar.png"
                alt=""
              />
              <span className="sr-only">Your profile</span>
              <span aria-hidden="true">John Doe</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default SideNavWithSub;