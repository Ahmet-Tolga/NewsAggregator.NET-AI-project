import * as ChatActionTypes from "../../types/ChatActionTypes";

const InitialState={
    response:"",
    loading:false,
    error:""
}

export const ChatReducer=(state=InitialState,action)=>{
    switch(action.type){
        case ChatActionTypes.GET_CHAT_REQUEST:
            return {...state,loading:true,error:""};
        
        case ChatActionTypes.GET_CHAT_SUCCESS:
            return {...state,response:action.payload.data.response.response,loading:false,error:""};

        case ChatActionTypes.GET_CHAT_FAILED:
            return {...state,loading:false,error:action.payload};

        default:
            return state;
    }
}