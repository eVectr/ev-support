import { SHOW_NOTIFICATION } from '../types/types'

let initialState = {
  notification: {
      text:'',
      show: false
  }
}

const showNotificationReducer =  (state = initialState, action) => {
   switch (action.type) {
       case SHOW_NOTIFICATION:
           return { ...state,  notification: action.payload.notification }
       default:
           return state
   }
}

export default showNotificationReducer

