import axios from "axios";

import {
  GET_ERRORS,
  ADD_PROFILE,
  UPDATE_FAVOURITE,
  GET_PROFILES
} from "./actionTypes";

export const addProfile = data => dispatch => {
  axios
    .post("api/profile/add-profile", data)
    .then(res =>
      dispatch({
        type: ADD_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getProfiles = () => dispatch => {
  axios
    .get("/api/profiles")
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

export const addFavourite = productId => dispatch => {
  axios
    .post("/api/users/add-favourite/", { productId })
    // .then(res => axios.get("/api/products"))
    .then(res =>
      dispatch({
        // type: GET_PRODUCTS,
        // payload: res.data
        type: UPDATE_FAVOURITE,
        payload: res.data.favouriteList
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const removeFavourite = productId => dispatch => {
  axios
    .post("/api/users/remove-favourite/", { productId })
    // .then(res => axios.get("/api/products"))
    .then(res =>
      dispatch({
        // type: GET_PRODUCTS,
        // payload: res.data
        type: UPDATE_FAVOURITE,
        payload: res.data.favouriteList
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
