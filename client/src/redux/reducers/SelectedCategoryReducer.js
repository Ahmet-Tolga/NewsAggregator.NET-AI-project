import { act } from 'react';
import * as SelectedCategoryActionTypes from '../../types/SelectedCategoryType';
import { COMMON_CATEGORIES } from '../../constants/categories';

export const SelectedCategoryReducer=(state=COMMON_CATEGORIES[0],action)=>{
    let newState;
    switch(action.type){
        case SelectedCategoryActionTypes.SET_SELECTED_CATEGORY:
            newState = action.payload;
            return newState;

        default:
            return state;
    }    
}