import React, { Component } from "react";
import img1 from "../../assets/images/img1.svg";
import ProgressBar from "../ProgressBar/ProgressBar";

class RegisterStepOne extends Component {
  nextStep = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const {
      values,
      handleChange,
      shouldMarkError,
      blur,
      isDisabled,
      errors
    } = this.props;

    return (
      <div>
        <ProgressBar filler="33" />
        <div className="register-wrapper">
          <div className="register-wrapper__left">
            <img src={img1} alt="register" className="register-image" />
          </div>
          <div className="register-wrapper__right">
            <form>
              <label className="label-text">Name</label>
              <input
                className={shouldMarkError("name") ? "error" : ""}
                placeholder="Name"
                name="name"
                type="text"
                defaultValue={values.name}
                onChange={handleChange}
                onBlur={() => blur("name")}
              />
              {shouldMarkError("name") ? (
                <p className="error-text">{errors.name}</p>
              ) : null}
              <label>Last Name</label>
              <input
                className={shouldMarkError("lastname") ? "error" : ""}
                placeholder="Last Name"
                type="text"
                name="lastname"
                defaultValue={values.lastname}
                onChange={handleChange}
                onBlur={() => blur("lastname")}
              />
              {shouldMarkError("lastname") ? (
                <p className="error-text">{errors.lastname}</p>
              ) : null}
              <label>Password</label>
              <input
                className={shouldMarkError("password") ? "error" : ""}
                placeholder="Password"
                type="password"
                name="password"
                defaultValue={values.password}
                onChange={handleChange}
                onBlur={() => blur("password")}
              />
              {shouldMarkError("password") ? (
                <p className="error-text">{errors.password}</p>
              ) : null}
              <div className="buttons-wrapper">
                <button
                  onClick={this.nextStep}
                  disabled={isDisabled}
                  className={`${isDisabled} ? disable : ${null} `}
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterStepOne;
