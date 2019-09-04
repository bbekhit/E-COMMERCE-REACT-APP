import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./actionTypes";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utilis/setAuthToken";
import { closeModal } from "./modalActions";

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      const { token } = res.data;
      setAuthToken(false);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("currentUser", JSON.stringify(decoded));
      const currentUser = localStorage.getItem("currentUser");
      dispatch(setCurrentUser(JSON.parse(currentUser)));
      dispatch(closeModal());
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("currentUser");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

export const addFavourite = productId => dispatch => {
  axios
    .post("/api/users/add-favourite/", { productId })
    .then(res => {
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      dispatch({
        type: SET_CURRENT_USER,
        payload: res.data
      });
    })
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
    .then(res => {
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      dispatch({
        type: SET_CURRENT_USER,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const addToCart = product => dispatch => {
  axios
    .post("/api/users/add-cart/", { product })
    .then(res => {
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      dispatch({
        type: SET_CURRENT_USER,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const removeFromCart = productId => dispatch => {
  axios
    .post("/api/users/remove-cart/", { productId })
    .then(res => {
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      dispatch({
        type: SET_CURRENT_USER,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const clearCart = () => dispatch => {
  axios
    .post("/api/users/clear-cart/")
    .then(res => {
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      dispatch({
        type: SET_CURRENT_USER,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
