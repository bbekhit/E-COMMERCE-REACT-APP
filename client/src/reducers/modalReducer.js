import { OPEN_MODAL, CLOSE_MODAL } from "../actions/actionTypes";

const initialState = null;

const modalReducer = (state = initialState, action) => {
  // const { modalName, modalProps } = action.payload;
  switch (action.type) {
    case OPEN_MODAL:
      return {
        modalName: action.payload.modalName,
        modalProps: action.payload.modalProps
      };
    case CLOSE_MODAL:
      return null;
    default:
      return state;
  }
};

export default modalReducer;
