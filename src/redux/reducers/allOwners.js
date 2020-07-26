import * as ActionTypes from '../actions/ActionTypes';

export const allOwners = (state={isLoading: true, errmess: null, data: []}, action) =>{
    switch(action.type){
        case ActionTypes.ALLOWNERS_LOADING:
            return {isLoading: true, errmess: null, data: []};
        case ActionTypes.ALLOWNERS_ERROR:
            return {isLoading: false, errmess: action.payload, data: []};
        case ActionTypes.ALLOWNERS_ADD:
            return {isLoading: false, errmess: null, data: action.payload};
        case ActionTypes.ALLOWNERS_CLEAR:
            return {isLoading: false, errmess: null, data: []};
        default:
            return state;
    }
}