import { SUB_ADMIN_DETAILS } from "../../types/subAdminDetail";

export const subAdminDetail = (payload) =>{
    return{
        type: SUB_ADMIN_DETAILS,
        payload
    }
}