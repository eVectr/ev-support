import { SUCESSFULL_LOGIN, USER_DATA } from '../types/types'

let initialState = {
   userDetails: {}
}

const userDetailsReducer =  (state = initialState, action) => {
   switch (action.type) {
       case  USER_DATA:
           return { ...state,  userDetails: action.payload.userDetails }
       default:
           return state
   }
}

export default userDetailsReducer