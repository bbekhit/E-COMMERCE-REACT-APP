import React from "react";
import { connect } from "react-redux";
import LoginModal from "./LoginModal";

const ModalManager = ({ currentModal }) => {
  let renderedModal;
  if (currentModal) {
    const { modalProps, modalName } = currentModal;
    const ModalComponent = modalList[modalName];
    renderedModal = <ModalComponent {...modalProps} />;
  }
  return <div>{renderedModal}</div>;
};
const modalList = {
  LoginModal
};

const mapStateToProps = state => ({
  currentModal: state.modal
});
export default connect(mapStateToProps)(ModalManager);
