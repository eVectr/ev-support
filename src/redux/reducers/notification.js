import { SHOW_NOTIFICATION, SELECTED_REASON,CASE_NO } from '../types/types'

let initialState = {
  notification: {
    text: '',
    show: false,
    selectedReason: ''
  }
}

const showNotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return { ...state, notification: action.payload.notification }
    case SELECTED_REASON:
      return { ...state, selectedReason: action.payload }
    case CASE_NO:
      return { ...state, caseNo: action.payload.caseno }
    default:
      return state
  }
}

export default showNotificationReducer
