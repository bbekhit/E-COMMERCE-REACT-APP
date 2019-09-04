const validateRegisterStepOne = (name, lastname, password, email, phone) => {
  let errors = {};

  // validate name
  if (typeof name !== "undefined") {
    //regular expression for email validation
    if (!name.match(/^[a-zA-Z0-9]{2,20}$/)) {
      errors.name = "*Name too short";
    }
  }
  if (!name) {
    errors.name = "*This field is required";
  }

  // validat lastname
  if (typeof lastname !== "undefined") {
    //regular expression for email validation
    if (!lastname.match(/^[a-zA-Z0-9]{2,20}$/)) {
      errors.lastname = "*Last Name too short";
    }
  }
  if (!lastname) {
    errors.lastname = "*This field is required";
  }

  //  validate email
  if (typeof email !== "undefined") {
    //regular expression for email validation
    if (
      !email.match(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
    ) {
      errors.email = "*Please enter valid email";
    }
  }
  if (!email) {
    errors.email = "*This field is required";
  }

  // Validate Password
  if (typeof password !== "undefined") {
    if (!password.match(/^[a-zA-Z0-9]{6,}$/)) {
      errors.password = "*Password at least 6 characters";
    }
  }
  if (!password) {
    errors.password = "*Please enter your password.";
  }

  // Validate Phone
  if (typeof phone !== "undefined") {
    if (!phone.match(/^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/)) {
      errors.phone = "*Invalid phone number";
    }
  }
  if (!phone) {
    errors.phone = "*Please enter your phone number";
  }

  return errors;
};

export default validateRegisterStepOne;
