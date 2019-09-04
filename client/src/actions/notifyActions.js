import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from "./actionTypes";

export const showNotification = (name, message) => {
  return {
    type: SHOW_NOTIFICATION,
    payload: {
      name,
      message
    }
  };
};

export const hideNotification = () => {
  return {
    type: HIDE_NOTIFICATION
  };
};
