import { SUB_ADMIN_DETAILS } from '../../types/subAdminDetail';

let initialState = {
    adminDetails: {
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        password: ''
  }
}

const subAdminDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUB_ADMIN_DETAILS:
      return { ...state, adminDetails: action.payload }
    default:
      return state
  }
}

export default subAdminDetailsReducer
