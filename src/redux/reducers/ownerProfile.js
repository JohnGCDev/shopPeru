import * as ActionTypes from '../actions/ActionTypes';

export const ownerProfile = (state={isLoading:true, errmess: null, profile: []}, action) =>{
    switch(action.type){
        case ActionTypes.OWNERPROFILE_LOADING:
            return {isLoading:true, errmess: null, profile: []};
        case ActionTypes.OWNERPROFILE_ERROR:
            return {isLoading:false, errmess: action.payload, profile: []};
        case ActionTypes.OWNERPROFILE_ADD:
            return {isLoading:false, errmess: null, profile: action.payload};
        case ActionTypes.OWNERPROFILE_CLEAR:
            return {isLoading:false, errmess: null, profile: []};
        default:
            return state;
    }
}