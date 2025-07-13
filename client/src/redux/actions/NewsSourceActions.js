import * as NewsSourceActionTypes from '../../types/NewsSourceActionType';

export const setNewsSourceAction=(data)=>{
    return {
        type:NewsSourceActionTypes.SET_NEWS_SOURCE_ACTION_TYPE,
        payload:data
    };
}

