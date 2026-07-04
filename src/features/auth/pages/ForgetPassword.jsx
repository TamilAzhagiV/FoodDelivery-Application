import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../../../components/layout/AuthLayout";
import { validateEmail } from "../validations/authValidation";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import ErrorMessage from "../../../components/ui/ErrorMessage";

import { forgotPassword } from "../services/authService";

function ForgetPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Enter a valid email address");
      return;
    }

    const forgotPasswordData = {
      email: email,
    };

    try {
      const response = await forgotPassword(forgotPasswordData);

      console.log("Forgot Password Response:", response);

      sessionStorage.setItem("resetIdentifier", email);

      navigate("/verify-otp");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email address to receive OTP"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            placeholder="Enter your email address"
          />

          <ErrorMessage message={error} />
        </div>

        <Button type="submit">
          Send OTP
        </Button>

        <p className="text-center text-sm">
          Remember Password?{" "}
          <Link
            to="/login"
            className="font-semibold text-orange-500 hover:text-orange-600"
          >
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default ForgetPassword;