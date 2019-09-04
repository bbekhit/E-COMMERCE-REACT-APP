import {
  SET_TYPES_FILTER,
  SET_SEARCH_FILTER,
  SET_MAX_PRICE_FILTER,
  SET_MIN_PRICE_FILTER,
  SET_FAVOURITES_FILTER
} from "../actions/actionTypes";

const initialState = {
  types: [],
  searchFilter: "",
  minPrice: "0",
  maxPrice: "1000000",
  favourites: []
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TYPES_FILTER:
      return {
        ...state,
        types: action.payload
      };
    case SET_SEARCH_FILTER:
      return {
        ...state,
        searchFilter: action.payload
      };
    case SET_MIN_PRICE_FILTER:
      return {
        ...state,
        minPrice: action.payload || 0
      };
    case SET_MAX_PRICE_FILTER:
      return {
        ...state,
        maxPrice: action.payload || 10000
      };
    case SET_FAVOURITES_FILTER:
      return {
        ...state,
        favourites: action.payload
      };
    default:
      return state;
  }
};

export default filterReducer;
