import * as NewsActionType from "../../types/NewsActionType";

const InitialState={
    news:[],
    loading:false,
    error:""
}


export const NewsReducer=(state=InitialState,action)=>{

    switch(action.type){
        case NewsActionType.FETCH_NEWS_REQUEST:
            return {...state,loading:true,error:""};

        case NewsActionType.FETCH_NEWS_SUCCESS:
            return {...state,news:action.payload,loading:false,error:""};

        case NewsActionType.FETCH_NEWS_FAILURE:
            return {...state,loading:false,error:action.payload};

        default:
            return state;
    }
}