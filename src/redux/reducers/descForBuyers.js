import * as ActionTypes from '../actions/ActionTypes';

export const descForBuyers = (state={isLoading: true, errmess: null, descForBuyers: []}, action) => {
    switch(action.type){
        case ActionTypes.DESCFORBUYERS_LOADING:
            return {isLoading: true, errmess: null, descForBuyers: []};
        case ActionTypes.DESCFORBUYERS_ERROR:
            return {isLoading: false, errmess: action.payload, descForBuyers: []};
        case ActionTypes.DESCFORBUYERS_ADD_ALL:
            return {isLoading: false, errmess: null, descForBuyers: action.payload};
        default:
            return state;
    }
};