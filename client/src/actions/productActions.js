import axios from "axios";

import {
  GET_ERRORS,
  GET_PRODUCT,
  GET_PRODUCTS,
  ADD_PRODUCT,
  UPDATE_LIKES
} from "./actionTypes";

export const addProduct = data => dispatch => {
  axios
    .post("api/products/add-product", data)
    .then(res =>
      dispatch({
        type: ADD_PRODUCT,
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

export const getProduct = id => dispatch => {
  axios
    .get(`/api/products/product/${id}`)
    .then(res =>
      dispatch({
        type: GET_PRODUCT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PRODUCT,
        payload: null
      })
    );
};

export const getProducts = () => dispatch => {
  axios
    .get("/api/products")
    .then(res =>
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PRODUCTS,
        payload: null
      })
    );
};

export const addReview = (productId, data) => dispatch => {
  axios
    .post(`/api/products/review/${productId}`, data)
    .then(res =>
      dispatch({
        type: UPDATE_LIKES,
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
export const removeReview = (productId, reviewId) => dispatch => {
  axios
    .delete(`/api/products/review/${productId}/${reviewId}`)
    .then(res =>
      dispatch({
        type: UPDATE_LIKES,
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
export const editReview = (productId, reviewId, reviewData) => dispatch => {
  axios
    .post(`/api/products/review/${productId}/${reviewId}`, { reviewData })
    .then(res =>
      dispatch({
        type: UPDATE_LIKES,
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

export const addLike = (productId, reviewsId) => dispatch => {
  axios
    .post(`/api/products/add-likes/`, { productId, reviewsId })
    .then(res =>
      dispatch({
        type: UPDATE_LIKES,
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

export const removeLike = (productId, reviewsId) => dispatch => {
  axios
    .post(`/api/products/remove-likes/`, { productId, reviewsId })
    .then(res =>
      dispatch({
        type: UPDATE_LIKES,
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

export const updateRating = (productId, value, ratingId) => dispatch => {
  axios
    .post(`/api/products/update-rating/`, { productId, value, ratingId })
    .then(res =>
      dispatch({
        type: UPDATE_LIKES,
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
