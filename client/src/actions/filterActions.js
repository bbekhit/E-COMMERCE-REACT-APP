import {
  SET_SEARCH_FILTER,
  SET_TYPES_FILTER,
  SET_MIN_PRICE_FILTER,
  SET_MAX_PRICE_FILTER,
  SET_FAVOURITES_FILTER
} from "./actionTypes";

export const setTypesFilter = types => {
  return {
    type: SET_TYPES_FILTER,
    payload: types
  };
};
export const setSearchFilter = searchText => {
  return {
    type: SET_SEARCH_FILTER,
    payload: searchText
  };
};
export const setMinPriceFilter = minPrice => {
  return {
    type: SET_MIN_PRICE_FILTER,
    payload: minPrice
  };
};
export const setMaxPriceFilter = maxPrice => {
  return {
    type: SET_MAX_PRICE_FILTER,
    payload: maxPrice
  };
};
export const setFavouritesFilter = favourites => {
  return {
    type: SET_FAVOURITES_FILTER,
    payload: favourites
  };
};
