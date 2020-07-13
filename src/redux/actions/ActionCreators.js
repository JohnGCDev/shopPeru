import * as ActionTypes from './ActionTypes';
import {BASE_URL} from '../../shared/baseUrl';

export const fetchAllDescForBuyers = () => (dispatch) => {

    fetch(BASE_URL + '/descriptions/forBuyers')
      .then(response => { //Fulfilled promise
          if(response.ok){
            return response;
          }else{
            throw new Error('Error '+response.status + ': ' + response.statusText);
          }
        },
        error => { //Rejected promise
          throw error;
        }
      )
      .then(response => response.json())
      .then(data => {setTimeout(()=>{dispatch(addAllDescForBuyers(data))}, 3000)})
      .catch(error => dispatch(errorDescForBuyers(error.message)));
}

const addAllDescForBuyers = (allData) => ({
    type: ActionTypes.DESCFOROWNERS_ADD_ALL,
    payload: allData
});

const errorDescForBuyers = (errmess) => ({
    type: ActionTypes.DESCFOROWNERS_ERROR,
    payload: errmess
});