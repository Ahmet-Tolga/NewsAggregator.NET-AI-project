import { NewsReducer } from '../NewsReducers';
import { SelectedCategoryReducer } from '../SelectedCategoryReducer';
import { combineReducers } from 'redux';
import { SelectedNewReducer } from '../SetSelectedNewReducer';
import { detailModalReducer } from '../DetailModalReducer';
import { newsSourceReducer } from '../NewsSourceReducer';
import { SimilarNewsReducer } from '../SimilarNewsReducer';
import UIStatusReducer from '../UIStateReducer';
import { RelatedNewsDataReducer } from '../RelatedNewsDataReducer';
import { ChatReducer } from '../ChatReducer';

const reducers=combineReducers({
    NewsReducer,
    SelectedCategoryReducer,
    SelectedNewReducer,
    detailModalReducer,
    newsSourceReducer,
    SimilarNewsReducer,
    UIStatusReducer,
    RelatedNewsDataReducer,
    ChatReducer
});

export default reducers;