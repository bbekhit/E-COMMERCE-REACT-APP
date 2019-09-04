import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { closeModal } from "../../actions/modalActions";
import { loginUser } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import validateLogin from "../../validation/validateLogin";

class LoginModal extends Component {
  static propTypes = {
    closeModal: PropTypes.func,
    errors: PropTypes.shape({}),
    loginUser: PropTypes.func
  };

  static defaultProps = {
    closeModal: () => {},
    errors: {},
    loginUser: () => {}
  };

  state = {
    email: "",
    password: "",
    touched: {
      email: false,
      password: false
    },
    errors: {}
  };
  componentDidMount() {
    document.body.classList.add("hide");
  }
  componentWillUnmount() {
    document.body.classList.remove("hide");
  }
  static getDerivedStateFromProps(nextProps, state) {
    if (state.errors !== nextProps.errors) {
      return {
        errors: nextProps.errors
      };
    }
    return null;
  }
  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  preventClick(e) {
    e.stopPropagation();
  }

  handleBlur(field) {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  }

  onSubmit = e => {
    e.preventDefault();
    const userData = this.state;
    this.props.loginUser(userData);
    this.props.clearErrors();
    this.props.history.push("/products");
  };

  close = e => {
    e.stopPropagation();
    this.props.clearErrors();
    this.props.closeModal();
  };

  render() {
    const errors = validateLogin(this.state.email, this.state.password);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    const shouldMarkError = field => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };
    return (
      <div className="login-wrapper" onClick={this.close}>
        <div className="close" onClick={this.close}>
          &times;
        </div>
        <div className="modal-body" onClick={this.preventClick}>
          <form onSubmit={this.onSubmit}>
            <label>Email</label>
            <input
              className={shouldMarkError("email") ? "error" : ""}
              type="text"
              placeholder="Enter email"
              name="email"
              value={this.state.email}
              onChange={this.handleOnChange}
              onBlur={this.handleBlur.bind(this, "email")}
            />
            {shouldMarkError("email") ? (
              <p className="error-text">{errors.email}</p>
            ) : this.state.errors ? (
              <p className="error-text">{this.state.errors.email}</p>
            ) : null}
            <label>Password</label>
            <input
              className={shouldMarkError("password") ? "error" : ""}
              placeholder="Password"
              type="password"
              name="password"
              defaultValue={this.state.password}
              onChange={this.handleOnChange}
              onBlur={this.handleBlur.bind(this, "password")}
            />
            {<p className="error-text">{this.state.errors.password}</p>}
            <div className="buttons-wrapper">
              <button disabled={isDisabled}>Login</button>
            </div>
          </form>
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
  { closeModal, loginUser, clearErrors }
)(withRouter(LoginModal));
