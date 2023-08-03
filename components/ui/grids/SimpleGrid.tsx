import { useRouter } from 'next/navigation'

interface GridProps {
  Title: string 
  Tiles?: {id: number, title: string, description: string, link: string}[]
}

const SimpleGrid: React.FC<GridProps> = ({ Title, Tiles }) => {
  const router = useRouter();

  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:px-6">
        <h1>{Title}</h1>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Tiles?.map((Tile) => (
            <div
              key={Tile.id}
              onClick={() => router.push(Tile.link)}
              className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-actionprimarydefault focus-within:ring-offset-2 hover:border-gray-400"
            >
              <div className="min-w-0 flex-1">
                <a className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">{Tile.title}</p>
                  <p className="truncate text-sm text-gray-500">{Tile.description}</p>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default SimpleGrid;