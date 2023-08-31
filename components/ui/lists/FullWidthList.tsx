'use client'

import { useState } from "react";
import { useSession } from "next-auth/react";
import DefaultInput from "../elements/DefaultInput";

interface Column {
  header: string;
  name: string;
  accessor: (item: any) => any;  // Using a function to get the value
  isBold?: boolean;
}

interface ActionButton {
  label: string;
  icon: JSX.Element;
  onClick: (...params: any) => void;
  visible: (item: any) => any;
}

interface FullWidthListProps {
  columns: Column[];
  data: any[];
  actionButtons?: ActionButton[];
  loggedUserIndex?: number;
}


export default function FullWidthList({
  columns,
  data,
  actionButtons = [],
  loggedUserIndex
}: FullWidthListProps) {
  const session = useSession();

  const [ searchTerm, setSearchTerm ] = useState('')
  const [ sortDirection, setSortDirection ] = useState('asc')
  const [ sortedColumn, setSortedColumn ] = useState("")
  const [ itemsPerPage, setItemsPerPage ] = useState(10)
  const [ currentPage, setCurrentPage ] = useState(1)

  const sortFunction = (a: string, b: string) => {
    return a.localeCompare(b)
  }

  const sortedData = [...data].sort((a: any, b: any) => {
    if (!sortedColumn) return 0;

    let sortedColumns = sortedColumn.split(".");
    let aValue = a
    let bValue = b

    sortedColumns.map((columns) => {
      aValue = aValue[columns]
      bValue = bValue[columns]
    })

    if (sortDirection === 'asc') {
      return sortFunction(aValue, bValue);
    } else {
      return sortFunction(bValue, aValue);
    }
  });

  const filteredData = sortedData.filter(item => {
    const itemValues = columns.map(col => col.accessor(item).toString().toLowerCase());
    return itemValues.some(value => value.includes(searchTerm.toLowerCase()));
  });

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const pagedData = filteredData.slice(startIndex, endIndex)

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="flex justify-between">
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <DefaultInput 
                    name="Project name"
                    id="project"
                    autoComplete="Project name"
                    placeholder="My Awesome Project"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    inputType="search"
                    required
                />
              </div>
            </div>
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  {columns.map((col, index) => (
                    <th
                      key={index}
                      scope="col"
                      className={`px-3 py-3.5 text-left text-sm cursor-pointer ${col.isBold ? "font-bold" : "font-semibold"} text-gray-900`}
                      onClick={() => {
                        if (col.name === sortedColumn) {
                          setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                        } else {
                          setSortDirection('asc');
                        }
                        setSortedColumn(col.name);
                      }}
                    >
                      {col.header}
                      {col.name === sortedColumn && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? '▲' : '▼'}
                        </span>
                      )}
                    </th>
                  ))}
                  {actionButtons.length > 0 && (
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {pagedData.map((item, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-100 transition-all duration-200">
                  {columns.map((col, colIndex) => (
                      <td
                        key={colIndex}
                        //@ts-ignore
                        className={`whitespace-nowrap px-3 py-4 text-sm ${col.isBold ? "font-bold" : ""} text-gray-500`}
                      >
                        {col.accessor(item)}
                      </td>
                    ))}
                    {actionButtons.length > 0 && (
                      (loggedUserIndex !== null && loggedUserIndex === rowIndex) ? 
                      <td className="px-4 py-4"><p className="text-sm text-red-500 m-auto">You</p></td> : 
                      <td className="px-4 py-4">
                        {/*@ts-ignore*/}
                        {actionButtons.map((btn, btnIndex) =>  btn.visible(item) && (
                          <button
                            key={btnIndex}
                            onClick={() => btn.onClick(item)}
                            aria-label={btn.label}
                            className="mr-2"
                          > 
                            {btn.icon}
                          </button>
                        ))}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex justify-end">
              <button onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="mx-2 px-3 py-1 border rounded-lg"
              >
                Previous
              </button>
              <span className="mx-2 my-auto">{currentPage}</span>
              <button
                onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="mx-2 px-3 py-1 border rounded-lg"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


