import React from 'react';

interface Tab {
  name: string;
  href: string;
  current: boolean;
}

interface TabNavigationProps {
  tabs: Tab[];
  setActiveTab: (tabName: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, setActiveTab }) => {
  return (
    <div className="mt-3 sm:mt-4">
      <div className="sm:hidden">
        <label htmlFor="current-tab" className="sr-only">
          Select a tab
        </label>
        <select
          id="current-tab"
          name="current-tab"
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          defaultValue={tabs.find((tab) => tab.current)?.name}
          onChange={(e) => setActiveTab(e.target.value)}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <a
              key={tab.name}
              href={tab.href}
              className={
                tab.current
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }
              aria-current={tab.current ? 'page' : undefined}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(tab.name);
              }}
            >
              {tab.name}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default TabNavigation;
