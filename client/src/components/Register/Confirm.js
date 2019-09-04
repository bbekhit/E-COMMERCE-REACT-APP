import React, { Component } from "react";
import PropTypes from "prop-types";
import { registerUser } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ProgressBar from "../ProgressBar/ProgressBar";

class Confirm extends Component {
  static propTypes = {
    prop: PropTypes
  };

  state = {
    errors: {}
  };

  static getDerivedStateFromProps(props, state) {
    if (props.errors !== state.errors) {
      return {
        errors: props.errors
      };
    }
    return null;
  }

  nextStep = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  prevStep = e => {
    e.preventDefault();
    this.props.prevStep();
    this.props.clearErrors();
  };

  confirm = e => {
    const userData = this.props.values;
    e.preventDefault();
    this.props.registerUser(userData, this.props.history);
  };

  render() {
    const {
      values: { name, lastname, email, phone }
    } = this.props;
    return (
      <div>
        <ProgressBar filler="100" />
        <div className="info-wrapper">
          <div className="card">
            <h1>Confirm Information</h1>
            {this.state.errors.email ? (
              <div className="notification">{this.state.errors.email}</div>
            ) : null}
            <p>
              <span>Name: </span>
              {name}
            </p>
            <p>
              <span>Last Name: </span>
              {lastname}
            </p>
            <p>
              <span>Email: </span>
              {email}
            </p>
            <p>
              <span>Phone: </span>
              {phone}
            </p>
            <div className="buttons-wrapper">
              <button className="back-button" onClick={this.prevStep}>
                Back
              </button>
              <button onClick={this.confirm}>Next</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser, clearErrors }
)(withRouter(Confirm));
