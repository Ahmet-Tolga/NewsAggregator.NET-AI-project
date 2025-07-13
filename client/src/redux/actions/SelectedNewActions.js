import * as SelectedNewTypes from "../../types/SelectedNewType";

export const setSelectedNewAction=(data)=>{
    return {
        type:SelectedNewTypes.SET_SELECTED_NEW_TYPE,
        payload:data
    }
}