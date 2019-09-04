import { GET_PROFILES, ADD_PROFILE } from "../actions/actionTypes";

const initialState = [];

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROFILE:
      return [...state, action.payload];
    case GET_PROFILES:
      return action.payload;
    default:
      return state;
  }
};

export default profileReducer;
