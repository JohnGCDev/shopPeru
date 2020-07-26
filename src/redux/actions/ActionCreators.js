import * as ActionTypes from './ActionTypes';
import {BASE_URL} from '../../shared/baseUrl';

//------Actions: Descriptions for Buyers------
export const fetchAllDescForBuyers = () => (dispatch) => {
    dispatch(loadingDescForBuyers());

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

const loadingDescForBuyers = () => ({
  type: ActionTypes.DESCFORBUYERS_LOADING
});


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
  dispatch(loadingDescForOwners());

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

const loadingDescForOwners = () => ({
  type: ActionTypes.DESCFOROWNERS_LOADING
});

const addAllDescForOwners = (allData) => ({
  type: ActionTypes.DESCFOROWNERS_ADD_ALL,
  payload: allData
});

const errorDescForOwners = (errmess) => ({
  type: ActionTypes.DESCFOROWNERS_ERROR,
  payload: errmess
});
//------Actions: Useful Data------
const fetchUsefulData = () => (dispatch) => {
  dispatch(loadingUsefulData);

  fetch(BASE_URL + '/useful')
    .then(response => {
      if(response.ok){
        return response;
      }else{
        throw new Error('Error '+response.status+': '+response.statusText);
      }
    }, error => {
      throw error;
    })
    .then(response => response.json())
    .then(data => setTimeout(() =>{
      localStorage.setItem('usefulData', JSON.stringify(data));
      dispatch(addUsefulData(data));
    },1500))
    .catch(error => dispatch(errorUsefulData(error.message)));
};

const loadingUsefulData = () => ({
  type: ActionTypes.USEFULDATA_LOADING
});

export const addUsefulData = (data) => ({
  type: ActionTypes.USEFULDATA_ADD,
  payload: data
});

const errorUsefulData = (errmess) => ({
  type: ActionTypes.USEFULDATA_ERROR,
  payload: errmess
});

export const clearUsefulData = () => ({
  type: ActionTypes.USEFULDATA_CLEAR
});

//------Actions: Profile for Buyers------
export const fetchBuyerProfile = (buyerId) => (dispatch) => {
  dispatch(loadingBuyerProfile());
  dispatch(fetchUsefulData()); //Fetch Useful Data from server
  
  fetch(BASE_URL +'/users/buyers/'+ buyerId)
    .then(response => {
      if(response.ok){
        return response;
      }else{
        throw new Error('Error '+response.status+': '+response.statusText);
      }
    }, error => {
      throw error;
    })
    .then(response => response.json())
    .then(data => {setTimeout(()=>{
      localStorage.setItem("userProfile", JSON.stringify(data)); //Keep track user's profile
      dispatch(addBuyerProfile(data));
    }, 2200)})
    .catch(error => dispatch(errorBuyerProfile(error.message)));
};

const loadingBuyerProfile = () => ({
  type: ActionTypes.BUYERPROFILE_LOADING
});

export const addBuyerProfile = (profile) => ({
  type: ActionTypes.BUYERPROFILE_ADD,
  payload: profile
});

const errorBuyerProfile = (errmess) => ({
  type: ActionTypes.BUYERPROFILE_ERROR,
  payload: errmess
});

export const clearBuyerProfile = () => ({
  type: ActionTypes.BUYERPROFILE_CLEAR
});

//---Actions: Profile for Owners---
export const fetchOwnerProfile = (ownerId) => (dispatch) => {
  dispatch(loadingOwnerProfile());
  dispatch(fetchUsefulData()); //Fetch Useful Data from server

  fetch(BASE_URL +'/users/owners/'+ ownerId)
    .then(response => {
      if(response.ok){
        return response;
      }else{
        throw new Error('Error '+response.status+': '+response.statusText);
      }
    }, error => {
      throw error;
    })
    .then(response => response.json())
    .then(data => {setTimeout(()=>{
      localStorage.setItem("userProfile", JSON.stringify(data));
      dispatch(addOwnerProfile(data));
    }, 2200)})
    .catch(error => dispatch(errorOwnerProfile(error.message)));
};

const loadingOwnerProfile = () => ({
  type: ActionTypes.OWNERPROFILE_LOADING
});

export const addOwnerProfile = (data) => ({
  type: ActionTypes.OWNERPROFILE_ADD,
  payload: data
});

const errorOwnerProfile = (errmess) => ({
  type: ActionTypes.OWNERPROFILE_ERROR,
  payload: errmess
});

export const clearOwnerProfile = () => ({
  type: ActionTypes.OWNERPROFILE_CLEAR
});
//---Actions: Products---
export const fetchProducts = () => (dispatch) => {
  dispatch(loadingProducts());

  fetch(BASE_URL + '/products')
    .then(response => {
      if(response.ok){
        return response;
      }else{
        throw new Error('Error '+response.status+': '+response.statusText);
      }
    }, error => {
      throw error;
    })
    .then(response => response.json())
    .then(data => {setTimeout(()=>{
      dispatch(addProducts(data));
    }, 2200)})
    .catch(error => dispatch(errorProducts(error.message)));
};

const loadingProducts = () => ({
  type: ActionTypes.PRODUCTS_LOADING
});

const addProducts = (data) => ({
  type: ActionTypes.PRODUCTS_ADD,
  payload: data
});

const errorProducts = (errmess) => ({
  type: ActionTypes.PRODUCTS_ERROR,
  payload: errmess
});

export const clearProducts = () => ({
  type: ActionTypes.PRODUCTS_CLEAR
});

//---Actions: All Owners Data---
export const fetchAllOwners = () => (dispatch) => {
  dispatch(loadingAllOwners());

  fetch(BASE_URL +'/users/owners')
    .then(response => {
      if(response.ok){
        return response;
      }else{
        throw new Error('Error '+response.status+': '+response.statusText);
      }
    }, error => {
      throw error;
    })
    .then(response => response.json())
    .then(data => {setTimeout(()=>{
      dispatch(addAllOwners(data));
    }, 2200)})
    .catch(error => dispatch(errorAllOwners(error.message)));
}
 
const loadingAllOwners = () => ({
  type: ActionTypes.ALLOWNERS_LOADING
});

const addAllOwners = (data) => ({
  type: ActionTypes.ALLOWNERS_ADD,
  payload: data
});

const errorAllOwners = (errmess) => ({
  type: ActionTypes.ALLOWNERS_ERROR,
  payload: errmess
});

export const clearAllOwners = () => ({
  type: ActionTypes.ALLOWNERS_CLEAR
});