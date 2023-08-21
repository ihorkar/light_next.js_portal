'use client'
  
import { useSession } from "next-auth/react";
interface Column {
  header: string;
  accessor: (item: any) => any;  // Using a function to get the value
  isBold?: boolean;
}

interface ActionButton {
  label: string;
  icon: JSX.Element;
  onClick: (...params: any) => void;
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

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  {columns.map((col, index) => (
                    <th
                      key={index}
                      scope="col"
                      className={`px-3 py-3.5 text-left text-sm ${col.isBold ? "font-bold" : "font-semibold"} text-gray-900`}
                    >
                      {col.header}
                    </th>
                  ))}
                  {actionButtons.length > 0 && (
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data.map((item, rowIndex) => (
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
                        {actionButtons.map((btn, btnIndex) =>  (
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
          </div>
        </div>
      </div>
    </div>
  );
}


