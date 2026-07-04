import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import AuthLayout from "../../../components/layout/AuthLayout";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Button from "../../../components/ui/Button";
import ErrorMessage from "../../../components/ui/ErrorMessage";

import { ROLES } from "../../../utils/constants";
import { validateRegister } from "../validations/authValidation";

import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: "CUSTOMER",
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",

    restaurantName: "",
    restaurantAddress: "",
    cuisineType: "",

    vehicleNumber: "",
    licenseNumber: "",
    currentLocation: "",

    adminCode: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  async function handleSubmit(event) {
  event.preventDefault();

  const validationErrors = validateRegister(formData);

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  const registerData = {
    fullName: formData.fullName,
    email: formData.email,
    phoneNumber: formData.phoneNumber,
    password: formData.password,
    role: formData.role,
  };

  try {
    const response = await registerUser(registerData);

    console.log("Registration success:", response);

    alert("Registration successful");
    navigate("/login");
  } catch (error) {
    alert(error.message);
  }
}
  return (
    <AuthLayout title="Register" subtitle="Create your Food Delivery account">
      <div className="mb-5 text-center text-sm">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-orange-500 hover:text-orange-600"
        >
          Login
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Select
            name="role"
            value={formData.role}
            onChange={handleChange}
            options={ROLES}
          />
          <ErrorMessage message={errors.role} />
        </div>

        <div>
          <Input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
          />
          <ErrorMessage message={errors.fullName} />
        </div>

        <div>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
          />
          <ErrorMessage message={errors.email} />
        </div>

        <div>
          <Input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
          />
          <ErrorMessage message={errors.phoneNumber} />
        </div>

        {formData.role === "ADMIN" && (
          <div>
            <Input
              name="adminCode"
              value={formData.adminCode}
              onChange={handleChange}
              placeholder="Admin Access Code"
            />
            <ErrorMessage message={errors.adminCode} />
          </div>
        )}

        <div>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <ErrorMessage message={errors.password} />
        </div>

        <div>
          <Input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
          />
          <ErrorMessage message={errors.confirmPassword} />
        </div>

        <Button type="submit">Register</Button>
      </form>
    </AuthLayout>
  );
}

export default Register;