import axios from "axios";
import * as SimilarNewsTypes from "../../types/SimilarNewsActionsTypes";

export const fetchSimilarNewsRequest=()=>{
    return {type:SimilarNewsTypes.FETCH_SIMILAR_NEWS_REQUEST};
}

export const fetchSimilarNewsSuccess=(similar_news)=>{
    return {type:SimilarNewsTypes.FETCH_SIMILAR_NEWS_SUCCESS,payload:similar_news};
}

export const fetchSimilarNewsFailure=(error)=>{
    return {type:SimilarNewsTypes.FETCH_SIMILAR_NEWS_FAILURE,payload:error.message};
}

export const setSimilarNews=(data)=>{
    return {type:SimilarNewsTypes.SET_SIMILAR_NEWS,payload:data};
}

export const fetchSimilarNews=(url,data)=>{
    return async(dispatch)=>{
        dispatch(fetchSimilarNewsRequest());
    
        try{
            const response=await axios.post(url,data);
            dispatch(fetchSimilarNewsSuccess(response.data));
        }

        catch(error){
            dispatch(fetchSimilarNewsFailure(error.message));
        }
    }
}