import * as ActionTypes from '../actions/ActionTypes';

export const usefulData = (state={isLoading: true, errmess: null, data: []}, action) =>{
    switch(action.type){
        case ActionTypes.USEFULDATA_LOADING:
            return {isLoading: true, errmess: null, data: []};
        case ActionTypes.USEFULDATA_ERROR:
            return {isLoading: false, errmess: action.payload, data: []};
        case ActionTypes.USEFULDATA_ADD:
            return {isLoading: false, errmess: null, data: action.payload};
        case ActionTypes.USEFULDATA_CLEAR:
            return {isLoading: false, errmess: null, data: []};
        default:
            return state;
    }
}