import { XCircleIcon, InformationCircleIcon } from '@heroicons/react/20/solid'

export interface UserAlertsProps {
    category: 'campaign' | 'organisation' | 'team';
    type: 'warning' | 'notification';
    showAlerts: boolean;  
}

const messages = {
    campaign: {
        warning: "No campaign",
        notification: ""
    },
    team: {
        warning: "",
        notification: "No users"
    },
    organisation: {
        warning: "Incomplete contact details",
        notification: "No payment details"
    },
}

const UserAlerts = ({category, type, showAlerts}: UserAlertsProps) => {
    return(
        <>
            {showAlerts && <div className={type === 'warning' ? 'rounded-md bg-red-50 p-4' : 'rounded-md bg-blue-50 p-4 mt-4'}>
                <div className="flex">
                    <div className="flex-shrink-0">
                        {type === "warning" ? <XCircleIcon /> : <InformationCircleIcon />}
                    </div>
                    <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                        <p>
                            {messages[category][type]}
                        </p>
                    </div>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default UserAlerts