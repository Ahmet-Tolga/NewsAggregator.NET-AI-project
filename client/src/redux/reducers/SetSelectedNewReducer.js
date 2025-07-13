import * as SelectedNewType from "../../types/SelectedNewType";

export const SelectedNewReducer=(state="",action)=>{
    switch(action.type){
        case SelectedNewType.SET_SELECTED_NEW_TYPE:
            return action.payload;

        default:
            return state;
    }
}