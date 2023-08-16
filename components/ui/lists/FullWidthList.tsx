 'use client'
  
interface Column {
  header: string;
  accessor: (item: any) => any;  // Using a function to get the value
  isBold?: boolean;
}

interface FullWidthListProps {
  columns: Column[];
  data: any[];
}

export default function FullWidthList({ columns, data }: FullWidthListProps) {
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
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data.map((item, rowIndex) => (
                  <tr key={rowIndex}>
                    {columns.map((col, colIndex) => (
                      <td
                        key={colIndex}
                        className={`whitespace-nowrap px-3 py-4 text-sm ${col.isBold ? "font-bold" : ""} text-gray-500`}
                      >
                        {col.accessor(item)}
                      </td>
                    ))}
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

