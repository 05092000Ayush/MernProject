import React from 'react';

function ValidationForm(values) {
  const errors = {};

  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+\\|[\]{};:'",.<>/?]).{8,}$/;

  if (values.firstName.trim() === "") {
    errors.firstName = "*First Name is Required!";
  }
  if (values.lastName.trim() === "") {
    errors.lastName = "*Last Name is Required!";
  }
  if (values.email.trim() === "") {
    errors.email = "*Email is Required!";
  } else if (!email_pattern.test(values.email)) {
    errors.email = "*Email is not Correct!";
  }
  if (values.password.trim() === "") {
    errors.password = "*Password is Required!";
  } else if (!password_pattern.test(values.password)) {
    errors.password = "*Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*()-_=+\\|[\]{};:'\",.<>/?)";
  }

  return errors;
}

export default ValidationForm;
