import * as NewsActionType from "../../types/NewsActionType";
import axios from "axios";

export const fetchNewsRequest=()=>{
    return {type:NewsActionType.FETCH_NEWS_REQUEST};
}

export const fetchNewsSuccess=(news)=>{
    return {type:NewsActionType.FETCH_NEWS_SUCCESS,payload:news};
}

export const fetchNewsFailure=(error)=>{
    return {type:NewsActionType.FETCH_NEWS_FAILURE,payload:error};
}

export const fetchNews=(url)=>{
    return async(dispatch)=>{
        dispatch(fetchNewsRequest());
    
        try{
            const response=await axios.get(url);
            dispatch(fetchNewsSuccess(response.data));
        }

        catch(error){
            dispatch(fetchNewsFailure(error.message));
        }
    }
}
