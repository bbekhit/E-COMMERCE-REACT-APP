const validateLogin = email => {
  let errors = {};

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

  return errors;
};

export default validateLogin;
