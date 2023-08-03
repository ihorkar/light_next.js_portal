import { PencilSquareIcon, ExclamationTriangleIcon, ArrowPathIcon, CheckIcon, HandThumbUpIcon, UserIcon } from '@heroicons/react/20/solid'

const otimeline = [
  {
    id: 1,
    content: 'Unconfirmed signup from',
    target: '16:23',
    href: '#',
    Icon: PencilSquareIcon,
    iconBackground: 'bg-yellow-400',
  },
  {
    id: 2,
    content: 'Completed signup from',
    target: '16:03',
    href: '#',
    Icon: ArrowPathIcon,
    iconBackground: 'bg-blue-500',
  },
  {
    id: 3,
    content: 'Synced signup from',
    target: '15:45',
    href: '#',
    Icon: CheckIcon,
    iconBackground: 'bg-green-500',
  },
  {
    id: 4,
    content: 'Incomplete signup from',
    target: '15:21',
    href: '#',
    Icon: ExclamationTriangleIcon,
    iconBackground: 'bg-red-500',
  },
  {
    id: 5,
    content: 'Synced sigup from',
    target: '15:10',
    href: '#',
    Icon: CheckIcon,
    iconBackground: 'bg-green-500',
  },
]

function classNames(...classes:any[]) {
  return classes.filter(Boolean).join(' ')
}

export interface TimelineEvent {
  id: string;
  content: string;
  target: string;
  href: string;
  Icon: React.ElementType;
  iconBackground: string;
}

export interface TimelineProps {
  events: TimelineEvent[];
}

const SimpleTimeline: React.FC<TimelineProps> = ({
  events}
      ) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:p-6">
            <ul role="list" className="-mb-8">
                {events.map((event, eventIdx) => (
                <li key={event.id}>
                    <div className="relative pb-8">
                    {eventIdx !== events.length - 1 ? (
                        <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                    ) : null}
                    <div className="relative flex space-x-3">
                        <div>
                        <span
                            className={classNames(
                            event.iconBackground,
                            'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                            )}
                        >
                            <event.Icon className="h-5 w-5 text-white" aria-hidden="true" />
                        </span>
                        </div>
                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                            <p className="text-sm text-gray-500">
                            {event.content}{' '}
                            <a href={event.href} className="font-medium text-gray-900">
                                {event.target}
                            </a>
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                </li>
                ))}
            </ul>
    </div>
  </div>
  )
}

export default SimpleTimeline;