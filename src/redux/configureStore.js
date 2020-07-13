import {createStore, combineReducers, applyMiddleware} from 'redux';
import {descForBuyers} from './reducers/descForBuyers';
import {descForOwners} from './reducers/descForOwners';
import thunk from 'redux-thunk';

export const ConfigureStore = () => {
    return createStore(
        combineReducers({
            descForOwners,
            descForBuyers
        }),
        applyMiddleware(thunk)
    );
}