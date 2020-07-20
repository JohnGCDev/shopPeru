import * as ActionTypes from '../actions/ActionTypes';

export const buyerProfile = (state={isLoading:true, errmess: null, profile: []}, action) =>{
    switch(action.type){
        //case ActionTypes.BUYERPROFILE_LOADING:
        //    return {isLoading:true, errmess: null, profile: []};
        case ActionTypes.BUYERPROFILE_ERROR:
            return {isLoading:false, errmess: action.payload, profile: []};
        case ActionTypes.BUYERPROFILE_ADD:
            return {isLoading:false, errmess: null, profile: action.payload};
        case ActionTypes.BUYERPROFILE_CLEAR:
            return {isLoading:false, errmess: null, profile: []};
        default:
            return state;
    }
}