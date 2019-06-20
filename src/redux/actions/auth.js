import { SUCESSFULL_LOGIN, USER_DATA } from '../types/types';

export const userDetailsAction = (userDetails) => {
    return {
        type: USER_DATA,
        payload:{
            userDetails
        }
    }
 }