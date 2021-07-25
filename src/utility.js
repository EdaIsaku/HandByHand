const validatePassword = (password) => {
  if (password.length < 5) {
    console.log("Password is to short");
  } else if (!/[A-Z]/.test(password)) {
    console.log("Password must contain a capital letter");
  } else {
    console.log("ok");
  }
};

const validateEquality = (pass, newPass) => {
  if (pass === newPass) {
    console.log("ok");
  } else {
    console.log("Password doesn't match");
  }
};

export { validateEmail, validatePassword, validateEquality };
