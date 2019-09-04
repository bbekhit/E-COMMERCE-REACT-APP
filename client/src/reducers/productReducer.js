import {
  GET_PRODUCTS,
  GET_PRODUCT,
  ADD_PRODUCT,
  UPDATE_LIKES
} from "../actions/actionTypes";

const initialState = [];

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return [...state, action.payload];
    case GET_PRODUCTS:
      return action.payload;
    case GET_PRODUCT:
      return action.payload;
    case UPDATE_LIKES:
      return state.map(product =>
        product.id === action.payload.id ? (product = action.payload) : product
      );
    default:
      return state;
  }
};

export default productReducer;
