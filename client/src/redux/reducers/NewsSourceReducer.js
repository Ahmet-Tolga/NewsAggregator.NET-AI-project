import { SOURCE_ARRAY } from '../../constants/urls';
import * as NewsSourceActionTypes from '../../types/NewsSourceActionType';

export const newsSourceReducer = (state = SOURCE_ARRAY[0] , action) => {
    switch (action.type) {
        case NewsSourceActionTypes.SET_NEWS_SOURCE_ACTION_TYPE:
            return action.payload;
        default:
            return state;
    }
}