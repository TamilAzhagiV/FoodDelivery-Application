export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validatePhone(phone) {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(phone);
}

export function validatePassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  return regex.test(password);
}

export function validateIdentifier(identifier) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9}$/;

  return emailRegex.test(identifier) || phoneRegex.test(identifier);
}

export function validateRegister(formData) {
  const errors = {};

  if (!formData.fullName.trim()) {
    errors.fullName = "Full name is required";
  }

  if (!validateEmail(formData.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!validatePhone(formData.phoneNumber)) {
    errors.phoneNumber = "Enter a valid 10-digit phone number";
  }

  if (!formData.role) {
    errors.role = "Please select a role";
  }

  if (formData.role === "ADMIN" && !formData.adminCode.trim()) {
    errors.adminCode = "Admin access code is required";
  }

  if (!validatePassword(formData.password)) {
    errors.password =
      "Password must contain uppercase, lowercase, number, special character and minimum 8 characters";
  }

  if (!formData.confirmPassword.trim()) {
    errors.confirmPassword = "Confirm password is required";
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}

export function validateLogin(formData) {
  const errors = {};

  if (!formData.role) {
    errors.role = "Please select a role";
  }

  if (!formData.identifier.trim()) {
    errors.identifier = "Email or Phone Number is required";
  } else if (!validateIdentifier(formData.identifier)) {
    errors.identifier = "Enter a valid email or phone number";
  }

  if (!formData.password.trim()) {
    errors.password = "Password is required";
  }

  return errors;
}
export function validateResetPassword(formData) {
  const errors = {};

  const password = formData.password.trim();
  const confirmPassword = formData.confirmPassword.trim();

  if (!password) {
    errors.password = "Password is required";
  } else if (!validatePassword(password)) {
    errors.password =
      "Password must contain uppercase, lowercase, number, special character and minimum 8 characters";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Confirm password is required";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}
