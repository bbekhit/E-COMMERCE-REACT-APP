import { combineReducers } from "redux";
import authReducer from "./authReducer";
import modalReducer from "./modalReducer";
import errorReducer from "./errorReducer";
import notifyReducer from "./notifyReducer";
import filterReducer from "./filterReducer";
import productReducer from "./productReducer";
import profileReducer from "./profileReducer";
// import cartReducer from "./cartReducer";
// import notificationReducer from "./notificationReducer";

export default combineReducers({
  auth: authReducer,
  modal: modalReducer,
  errors: errorReducer,
  notify: notifyReducer,
  products: productReducer,
  filters: filterReducer,
  profile: profileReducer
  // cart: cartReducer,
  // notification: notificationReducer
});
