const regexUsername = /^[a-zA-Z0-9]+$/;
const regexName = /^[^\d]+$/;
const regexEmail = /^\S+@\S+.\S+$/;
const regexPassword = /^[a-zA-Z0-9]+$/;
const regexNumber = /^[0-9]+$/;

export function validateSignUp(inputs) {
  const errors = {};

  if (!inputs.username) {
    errors.username = "El nombre de usuario no puede estar vacío.";
  } else if (!regexUsername.test(inputs.username)) {
    errors.username =
      "Formato de nombre de usuario inválido, el nombre de usuario solo puede contener letras o números.";
  } else if (inputs.username.length < 8 || inputs.username.length > 25) {
    errors.username =
      "El nombre de usuario debe tener entre 8 y 25 caractéres.";
  }

  if (!inputs.email) {
    errors.email = "El correo electrónico no puede estar vacío.";
  } else if (!regexEmail.test(inputs.email)) {
    errors.email = "Formato de correo electrónico inválido.";
  } else if (inputs.email.length < 8 || inputs.username.length > 255) {
    errors.email = "El E-Mail debe tener entre 8 y 25 caractéres.";
  }

  if (!inputs.password) {
    errors.password = "La contraseña no puede estar vacía.";
  } else if (!regexPassword.test(inputs.password)) {
    errors.password = "La contraseña solo puede contener letras o números.";
  } else if (inputs.password.length < 8 || inputs.password.length > 255) {
    errors.password = "La contraseña debe tener entre 8 y 25 caractéres.";
  }

  if (!inputs.firstName) {
    errors.firstName = "El nombre no puede estar vacío.";
  } else if (!regexName.test(inputs.firstName)) {
    errors.firstName = "El nombre solo puede contener letras.";
  } else if (inputs.firstName.length < 8 || inputs.firstName.length > 25) {
    errors.firstName = "El nombre debe tener entre 8 y 25 caractéres.";
  }

  if (!inputs.lastName) {
    errors.lastName = "El apellido no puede estar vacío.";
  } else if (!regexName.test(inputs.lastName)) {
    errors.lastName = "El apellido solo puede contener letras.";
  } else if (inputs.lastName.length < 8 || inputs.lastName.length > 25) {
    errors.lastName = "El apellido debe tener entre 8 y 25 caractéres.";
  }

  if (!inputs.dni) {
    errors.dni = "El DNI no puede estar vacío.";
  } else if (!regexNumber.test(inputs.dni)) {
    errors.dni = "El DNI solo puede contener números.";
  } else if (inputs.dni.length < 8 || inputs.dni.length > 25) {
    errors.dni = "El DNI debe tener entre 8 y 25 caractéres.";
  }

  if (!inputs.number) {
    errors.number = "El número de teléfono no puede estar vacío.";
  } else if (!regexNumber.test(inputs.number)) {
    errors.number = "El número de teléfono solo puede contener números.";
  } else if (inputs.number.length < 8 || inputs.number.length > 25) {
    errors.number = "El número de teléfono debe tener entre 8 y 25 caractéres.";
  }

  if (!inputs.sex) {
    errors.sex =
      "Por favor, indique su género (M o F) en el campo Sexo. Este campo no puede quedar vacío.";
  }

  if (!inputs.height) {
    errors.height = "La altura no puede estar vacía.";
  } else if (!regexNumber.test(inputs.height)) {
    errors.height = "La altura solo puede contener números.";
  }

  if (!inputs.civilState) {
    errors.civilState = "Por favor, seleccione un estado civil.";
  }

  if (!inputs.confirmPassword) {
    errors.confirmPassword =
      "La confirmación de contraseña no puede estar vacía.";
  } else if (inputs.confirmPassword !== inputs.password) {
    errors.confirmPassword =
      "La confirmación de contraseña debe coincidir con la contraseña.";
  }

  return errors;
}

export function validateLogin(inputs) {
  const errors = {};

  if (!inputs.username) {
    errors.username = "El nombre de usuario no puede estar vacío.";
  } else if (!regexUsername.test(inputs.username)) {
    errors.username =
      "Formato de nombre de usuario inválido, el nombre de usuario solo puede contener letras o números.";
  } else if (inputs.username.length < 8 || inputs.username.length > 25) {
    errors.username =
      "El nombre de usuario debe tener entre 8 y 25 caractéres.";
  }

  if (!inputs.password) {
    errors.password = "La contraseña no puede estar vacía.";
  } else if (!regexPassword.test(inputs.password)) {
    errors.password = "La contraseña solo puede contener letras o números.";
  } else if (inputs.password.length < 8 || inputs.password.length > 255) {
    errors.password = "La contraseña debe tener entre 8 y 25 caractéres.";
  }

  return errors;
}

export function validatePayCard(inputs) {
  const errors = {};

  if (!inputs.name) {
    errors.name = "El nombre no puede estar vacío.";
  } else if (!regexName.test(inputs.name)) {
    errors.name = "El nombre solo puede contener letras.";
  } else if (inputs.name.length > 25) {
    errors.name = "El nombre debe tener entre 8 y 25 caractéres.";
  }

  if (!inputs.number) {
    errors.number = "El número de la tarjeta no puede estar vacío.";
  } else if (!regexNumber.test(inputs.number)) {
    errors.number = "El número de la tarjeta solo puede contener números";
  } else if (inputs.number.length !== 16) {
    errors.number = "El número de la tarjeta debe ser de 16 caractéres.";
  }

  if (!inputs.month) {
    errors.month =
      "El mes/año de expiración de la tarjeta no puede estar vacío.";
  }

  if (!inputs.year) {
    errors.year =
      "El mes/año de expiración de la tarjeta no puede estar vacío.";
  }

  if (!inputs.cvv) {
    errors.cvv = "El número de la tarjeta no puede estar vacío.";
  } else if (!regexNumber.test(inputs.number)) {
    errors.cvv = "El número de la tarjeta solo puede contener números";
  } else if (inputs.cvv.length !== 3) {
    errors.cvv = "El número de la tarjeta debe tener 3 números.";
  }

  if (!inputs.dni) {
    errors.dni = "El DNI no puede estar vacío.";
  } else if (!regexNumber.test(inputs.dni)) {
    errors.dni = "El DNI solo puede contener números.";
  } else if (inputs.dni.length < 8 || inputs.dni.length > 25) {
    errors.dni = "El DNI debe tener entre 8 y 25 caractéres.";
  }

  return errors;
}
