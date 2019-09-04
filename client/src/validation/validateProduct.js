const validateProduct = (name, lastname, password, email, phone) => {
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

  return errors;
};

export default validateProduct;
