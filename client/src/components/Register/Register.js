import React, { Component } from "react";
import RegisterStepOne from "./RegisterStepOne";
import RegisterStepTwo from "./RegisterStepTwo";
import Confirm from "./Confirm";
import validateRegisterStepOne from "../../validation/validateRegisterStepOne";

class Register extends Component {
  state = {
    step: 1,
    name: "",
    lastname: "",
    phone: "",
    email: "",
    city: "",
    password: "",
    touched: {
      name: false,
      lastname: false,
      email: false,
      password: false
    }
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleBlur = field => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  };

  shouldMarkError = field => {
    const { touched, name, lastname, password, email, phone } = this.state;
    const errors = validateRegisterStepOne(
      name,
      lastname,
      password,
      email,
      phone
    );
    const hasError = errors[field];
    const shouldShow = touched[field];
    return hasError ? shouldShow : false;
  };

  render() {
    const { step } = this.state;
    const { name, lastname, phone, email, password, city } = this.state;
    const values = { name, lastname, phone, email, password, city };
    const errors = validateRegisterStepOne(
      name,
      lastname,
      password,
      email,
      phone
    );
    const isDisabledOne = () => {
      const errors = validateRegisterStepOne(
        name,
        lastname,
        password,
        email,
        phone
      );

      if (!errors.name && !errors.lastname && !errors.password) {
        return false;
      }
      return true;
    };
    const isDisabledTwo = () => {
      const errors = validateRegisterStepOne(
        name,
        lastname,
        password,
        email,
        phone
      );

      if (!errors.phone && !errors.email) {
        return false;
      }
      return true;
    };

    switch (step) {
      case 1:
        return (
          <RegisterStepOne
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
            blur={this.handleBlur}
            isDisabled={isDisabledOne()}
            shouldMarkError={this.shouldMarkError}
            errors={errors}
          />
        );
      case 2:
        return (
          <RegisterStepTwo
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            blur={this.handleBlur}
            values={values}
            isDisabled={isDisabledTwo()}
            shouldMarkError={this.shouldMarkError}
            errors={errors}
          />
        );
      case 3:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        );
      default:
        return null;
    }
  }
}

export default Register;
