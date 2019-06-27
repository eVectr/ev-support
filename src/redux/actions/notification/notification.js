import { SHOW_NOTIFICATION } from '../../types/types';

export const showNotificationAction = (notification) => {
    return {
        type: SHOW_NOTIFICATION,
        payload:{
            notification
        }
    }
}