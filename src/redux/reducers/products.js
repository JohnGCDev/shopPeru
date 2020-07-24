import * as ActionTypes from '../actions/ActionTypes';

export const products = (state={isLoading: true, errmess: null, data: []}, action) =>{
    switch(action.type){
        case ActionTypes.PRODUCTS_LOADING:
            return {isLoading: true, errmess: null, data: []};
        case ActionTypes.PRODUCTS_ERROR:
            return {isLoading: false, errmess: action.payload, data: []};
        case ActionTypes.PRODUCTS_ADD:
            return {isLoading: false, errmess: null, data: action.payload};
        case ActionTypes.PRODUCTS_CLEAR:
            return {isLoading: false, errmess: null, data: []};
        default:
            return state;
    }
}