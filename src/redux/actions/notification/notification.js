import { SHOW_NOTIFICATION, SELECTED_REASON, CASE_NO } from '../../types/types'

export const showNotificationAction = (notification) => {
  return {
    type: SHOW_NOTIFICATION,
    payload: {
      notification
    }
  }
}

export const SelectedReason = (data) => {
  return {
    type: SELECTED_REASON,
    payload: {
      data
    }
  }
}

export const CaseNo = (caseno) => {
  return {
    type: CASE_NO,
    payload: {
      caseno
    }
  }
}
