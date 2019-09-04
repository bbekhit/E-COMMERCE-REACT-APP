import React, { Component } from "react";
import img1 from "../../assets/images/img1.svg";
import ProgressBar from "../ProgressBar/ProgressBar";

class RegisterStepTwo extends Component {
  nextStep = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  prevStep = e => {
    e.preventDefault();
    this.props.prevStep();
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
        <ProgressBar filler="66" />
        <div className="register-wrapper">
          <div className="register-wrapper__left">
            <img src={img1} alt="register" className="register-image" />
          </div>
          <div className="register-wrapper__right">
            <form>
              <label>Email</label>
              <input
                placeholder="Email"
                type="text"
                name="email"
                defaultValue={values.email}
                className={shouldMarkError("email") ? "error" : ""}
                onChange={handleChange}
                onBlur={() => blur("email")}
              />
              {shouldMarkError("email") ? (
                <p className="error-text">{errors.email}</p>
              ) : null}
              <label>Phone</label>
              <input
                placeholder="Phone"
                name="phone"
                type="text"
                defaultValue={values.phone}
                onChange={handleChange}
                className={shouldMarkError("phone") ? "error" : ""}
                onBlur={() => blur("phone")}
              />
              {shouldMarkError("phone") ? (
                <p className="error-text">{errors.phone}</p>
              ) : null}
              <div className="buttons-wrapper">
                <button className="back-button" onClick={this.prevStep}>
                  Back
                </button>
                <button onClick={this.nextStep} disabled={isDisabled}>
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

export default RegisterStepTwo;
