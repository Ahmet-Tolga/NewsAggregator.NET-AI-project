import * as RelatedNewsDataActionTypes from "../../types/RelatedNewsDataActionTypes";

export const RelatedNewsDataReducer=(state="",action)=>{
    switch(action.type){
        case RelatedNewsDataActionTypes.SET_RELATED_NEWS_DATA:
            return action.payload;

        case RelatedNewsDataActionTypes.CLEAR_RELATED_NEWS_DATA:
            return "";

        default:
            return state;
    }
}