import * as DetailModalActionTypes from "../../types/DetailModalActionTypes";

export const detailModalReducer=(state=false,action)=>{
    switch(action.type){
        case DetailModalActionTypes.OPEN_MODAL:
            return true;

        case DetailModalActionTypes.CLOSE_MODAL:
            return false;

        default:
            return state;
    }
}