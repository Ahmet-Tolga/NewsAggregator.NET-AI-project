import * as SimilarNewsTypes from "../../types/SimilarNewsActionsTypes";

const InitialState={
    similarNews:{similar_news:[]},
    loading:false,
    error:""
}

export const SimilarNewsReducer=(state=InitialState,action)=>{
    switch(action.type){
        case SimilarNewsTypes.FETCH_SIMILAR_NEWS_REQUEST:
            return {...state,loading:true,error:""};

        case SimilarNewsTypes.FETCH_SIMILAR_NEWS_SUCCESS:
            return {...state,similarNews:action.payload,loading:false,error:""};

        case SimilarNewsTypes.FETCH_SIMILAR_NEWS_FAILURE:
            return {...state,loading:false,error:action.payload};

        case SimilarNewsTypes.SET_SIMILAR_NEWS:
            return {...state,loading:false,error:"",similarNews:action.payload};

        default:
            return state;
    }
}