import * as DetailModalActionTypes from "../../types/DetailModalActionTypes";


export const openModalAction=()=>{
    return {
        type:DetailModalActionTypes.OPEN_MODAL,
        payload:true
    }
}

export const closeModalAction=()=>{
    return {
        type:DetailModalActionTypes.CLOSE_MODAL,
        payload:false
    }
}