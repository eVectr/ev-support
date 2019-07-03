import { SHOW_NOTIFICATION, SELECTED_REASON } from '../../types/types';

export const showNotificationAction = (notification) => {
    return {
        type: SHOW_NOTIFICATION,
        payload:{
            notification
        }
    }
}

export const SelectedReason = (data) => {
    console.log(data,"data123")
    return {
        type: SELECTED_REASON,
        payload:{
            data
        }
    }
}