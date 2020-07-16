import * as ActionTypes from './ActionTypes';
import {BASE_URL} from '../../shared/baseUrl';

//------Actions: Descriptions for Buyers------
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
      .then(data => {setTimeout(()=>{dispatch(addAllDescForBuyers(data))}, 2200)})
      .catch(error => dispatch(errorDescForBuyers(error.message)));
};

const addAllDescForBuyers = (allData) => ({
    type: ActionTypes.DESCFORBUYERS_ADD_ALL,
    payload: allData
});

const errorDescForBuyers = (errmess) => ({
    type: ActionTypes.DESCFORBUYERS_ERROR,
    payload: errmess
});

//------Actions: Descriptions for Owners------
export const fetchAllDescForOwners = () => (dispatch) => {
  fetch(BASE_URL + '/descriptions/forOwners')
    .then(response => {
        if(response.ok){
          return response;
        }else{
          throw new Error('Error ' + response.status + ': ' + response.statusText);
        }
      },
      error => {
        throw error;
      }
    )
    .then(response => response.json())
    .then(data => {setTimeout(() => {dispatch(addAllDescForOwners(data))}, 2200)})
    .catch(error => dispatch(errorDescForOwners(error.message)));
};

const addAllDescForOwners = (allData) => ({
  type: ActionTypes.DESCFOROWNERS_ADD_ALL,
  payload: allData
});

const errorDescForOwners = (errmess) => ({
  type: ActionTypes.DESCFOROWNERS_ERROR,
  payload: errmess
});