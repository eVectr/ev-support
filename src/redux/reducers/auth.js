<<<<<<< HEAD
import { SUCESSFULL_LOGIN, USER_DATA } from '../types/types'
=======
import { USER_DATA } from '../types/types'
>>>>>>> new-code

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

<<<<<<< HEAD
export default userDetailsReducer
=======
export default userDetailsReducer



>>>>>>> new-code
