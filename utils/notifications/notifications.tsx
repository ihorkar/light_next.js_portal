
import Notiflix from 'notiflix';

type Category = 'campaign' | 'organisation' | 'team'
type NotificationType = 'warning' | 'notification'

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

export default function showNotifications(category: Category, type: NotificationType) {
    if(type === 'warning') {
        Notiflix.Notify.warning(messages[category][type])
    }else if(type === 'notification') {
        Notiflix.Notify.info(messages[category][type])
    }
}

