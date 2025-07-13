import * as SelectedCategoryActionTypes from '../../types/SelectedCategoryType';

export const setSelectedCategoryAction=(category)=>{
    return {
        type:SelectedCategoryActionTypes.SET_SELECTED_CATEGORY,
        payload:category
    }
}