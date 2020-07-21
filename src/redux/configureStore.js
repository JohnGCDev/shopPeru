import {createStore, combineReducers, applyMiddleware} from 'redux';
import {descForBuyers} from './reducers/descForBuyers';
import {descForOwners} from './reducers/descForOwners';
import {buyerProfile} from './reducers/buyerProfile';
import {ownerProfile} from './reducers/ownerProfile';
import thunk from 'redux-thunk';

export const ConfigureStore = () => {
    return createStore(
        combineReducers({
            descForOwners,
            descForBuyers,
            buyerProfile,
            ownerProfile
        }),
        applyMiddleware(thunk)
    );
}