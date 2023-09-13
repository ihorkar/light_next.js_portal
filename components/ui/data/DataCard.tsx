import { PaperClipIcon } from '@heroicons/react/20/solid'

interface DataItem {
    label: string;
    value: string | JSX.Element; // To allow flexibility in the type of content (e.g., list of attachments, text, etc.)
    onUpdate?: () => void;
  }
  
  interface DataCardProps {
    data: DataItem[];
  }

    const DataCard: React.FC<DataCardProps> = ({ data}) => {
        return (
          <>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                {data.map((item, index) => (
                  <div key={index} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">{item.label}</dt>
                    <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <span className="flex-grow">{item.value}</span>
                      {item.onUpdate && (
                        <span className="ml-4 flex-shrink-0">
                          <button type="button" className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500" onClick={item.onUpdate}>
                            Update
                          </button>
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </>
        );
      };

export default DataCard;