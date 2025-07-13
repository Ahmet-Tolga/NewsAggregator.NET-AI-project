import * as RelatedNewsData from "../../types/RelatedNewsDataActionTypes";

export const setRelatedNewsData=(data)=>{
    return {type:RelatedNewsData.SET_RELATED_NEWS_DATA,payload:data};
}

export const clearRelatedNewsData=()=>{
    return {type:RelatedNewsData.CLEAR_RELATED_NEWS_DATA};
}