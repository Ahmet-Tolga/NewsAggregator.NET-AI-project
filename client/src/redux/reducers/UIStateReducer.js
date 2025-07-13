
import {

    FETCH_NEWS_REQUEST,
    FETCH_NEWS_SUCCESS,
    FETCH_NEWS_FAILURE
  } from '../../types/NewsActionType';

  import { FETCH_SIMILAR_NEWS_REQUEST,FETCH_SIMILAR_NEWS_SUCCESS,FETCH_SIMILAR_NEWS_FAILURE } from '../../types/SimilarNewsActionsTypes';
  
  const initialState = {
    isPageLoading: false,
    activeRequests: 0, 
    globalError: null
  }
  
  const UIStatusReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_NEWS_REQUEST:
      case FETCH_SIMILAR_NEWS_REQUEST:
        return {
          ...state,
          activeRequests: state.activeRequests + 1,
          isPageLoading: true,
          globalError: null
        };
  
      case FETCH_NEWS_SUCCESS:
      case FETCH_SIMILAR_NEWS_SUCCESS:
        const newActiveRequestsAfterSuccess = state.activeRequests - 1;
        return {
          ...state,
          activeRequests: newActiveRequestsAfterSuccess,
          isPageLoading: newActiveRequestsAfterSuccess > 0,
          globalError: null
        };
  
      case FETCH_NEWS_FAILURE:
      case FETCH_SIMILAR_NEWS_FAILURE:
        const newActiveRequestsAfterFailure = state.activeRequests - 1;
        return {
          ...state,
          activeRequests: newActiveRequestsAfterFailure,
          isPageLoading: newActiveRequestsAfterFailure > 0,
          globalError: action.payload 
        };
  
      default:
        return state;
    }
  };
  
  export default UIStatusReducer;