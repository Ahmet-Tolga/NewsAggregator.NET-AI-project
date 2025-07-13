import * as ChatActionTypes from "../../types/ChatActionTypes";
import axios from "axios";

export const GetChatRequest=()=>{
    return {type:ChatActionTypes.GET_CHAT_REQUEST};
}

export const GetChatSuccess=(data)=>{
    return {type:ChatActionTypes.GET_CHAT_SUCCESS,payload:data};
}

export const GetChatFailed=(err)=>{
    return {type:ChatActionTypes.GET_CHAT_FAILED,payload:err};
}

export const fetchChatResponse=(url,data)=>{
    return async(dispatch)=>{
        dispatch(GetChatRequest());
    
        try{
            const response=await axios.post(url,data);
            dispatch(GetChatSuccess(response));
        }

        catch(error){
            dispatch(GetChatFailed(error));
        }
    }
}