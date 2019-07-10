import { SHOW_NOTIFICATION, SELECTED_REASON } from '../types/types'

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
      return { ...state, selectedReason: action.payload.data }
    default:
      return state
  }
}

export default showNotificationReducer
