import * as ActionTypes from '../actions/ActionTypes';

export const descForOwners = (state={isLoading: true, errmess: null, descForOwners: []}, action) => {
    switch(action.type){
        case ActionTypes.DESCFOROWNERS_LOADING:
            return {isLoading: true, errmess: null, descForOwners: []};
        case ActionTypes.DESCFOROWNERS_ERROR:
            return {isLoading: false, errmess: action.payload, descForOwners: []};
        case ActionTypes.DESCFOROWNERS_ADD_ALL:
            return {isLoading: false, errmess: null, descForOwners: action.payload};
        default:
            return state;
    }
    
};