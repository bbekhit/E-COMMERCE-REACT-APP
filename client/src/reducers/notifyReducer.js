import { SHOW_NOTIFICATION } from "../actions/actionTypes";

const initialState = null;

const notifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        name: action.payload.name,
        message: action.payload.message
      };
    default:
      return state;
  }
};

export default notifyReducer;
