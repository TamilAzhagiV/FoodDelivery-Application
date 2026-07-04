import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../../../components/layout/AuthLayout";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import ErrorMessage from "../../../components/ui/ErrorMessage";

import { validateResetPassword } from "../validations/authValidation";
import { resetPassword } from "../services/authService";

function ResetPassword() {
  const navigate = useNavigate();

  const identifier = sessionStorage.getItem("resetIdentifier");
  const otpVerified = sessionStorage.getItem("otpVerified");
  const resetToken = sessionStorage.getItem("resetToken");
  const verifiedOtp = sessionStorage.getItem("verifiedOtp");

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!identifier || otpVerified !== "true") {
      navigate("/forgot-password");
    }
  }, [identifier, otpVerified, navigate]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const normalizedFormData = {
      password: formData.password.trim(),
      confirmPassword: formData.confirmPassword.trim(),
    };

    const validationErrors = validateResetPassword(normalizedFormData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const resetData = {
      email: identifier,
      identifier: identifier,
      newPassword: normalizedFormData.password,
      password: normalizedFormData.password,
      confirmPassword: normalizedFormData.confirmPassword,
      otp: verifiedOtp || undefined,
      resetToken: resetToken || undefined,
      token: resetToken || undefined,
    };

    try {
      const response = await resetPassword(resetData);

      console.log("Reset Password Response:", response);

      sessionStorage.removeItem("resetIdentifier");
      sessionStorage.removeItem("otpVerified");
      sessionStorage.removeItem("resetToken");
      sessionStorage.removeItem("verifiedOtp");

      alert("Password reset successful");
      navigate("/login");
    } catch (error) {
      setErrors({
        password: error.message,
      });
    }
  }

  return (
    <AuthLayout title="Reset Password" subtitle="Create your new password">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="New Password"
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

        <Button type="submit">Reset Password</Button>

        <p className="text-center text-sm">
          Back to{" "}
          <Link to="/login" className="font-semibold text-orange-500">
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default ResetPassword;