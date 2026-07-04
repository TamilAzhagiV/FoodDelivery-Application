import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../../../components/layout/AuthLayout";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import ErrorMessage from "../../../components/ui/ErrorMessage";

import { verifyOtp, resendOtp } from "../services/authService";

function VerifyOtp() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [resendMessage, setResendMessage] = useState("");

  const identifier = sessionStorage.getItem("resetIdentifier");

  useEffect(() => {
    if (!identifier) {
      navigate("/forgot-password");
    }
  }, [identifier, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!otp.trim()) {
      setError("OTP is required");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setError("OTP must be 6 digits");
      return;
    }

    try {
      const response = await verifyOtp({
        email: identifier,
        identifier: identifier,
        otp: otp,
      });

      console.log("Verify OTP Response:", response);

      const resetToken =
        response.resetToken ||
        response.token ||
        response.data?.resetToken ||
        response.data?.token ||
        "";

      if (resetToken) {
        sessionStorage.setItem("resetToken", resetToken);
      }

      sessionStorage.setItem("verifiedOtp", otp);
      sessionStorage.setItem("otpVerified", "true");

      navigate("/reset-password");
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleResendOtp() {
  try {
    setError("");
    setResendMessage("");

    const response = await resendOtp({
      email: identifier,
    });

    console.log("Resend OTP Response:", response);

    setResendMessage("OTP sent successfully");
  } catch (error) {
    setError(error.message);
  }
}

  return (
    <AuthLayout title="Verify OTP" subtitle={`Enter OTP sent to ${identifier}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            name="otp"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
              setError("");
            }}
            placeholder="Enter OTP"
          />
          <ErrorMessage message={error} />
        </div>

        <Button type="submit">Verify OTP</Button>

        <p className="text-center text-sm">
          Didn&apos;t receive OTP?{" "}
          <button type="button" className="font-semibold text-orange-500 " onClick={handleResendOtp}>
            Resend
          </button>
        </p>
            {resendMessage && (
      <p className="text-center text-green-600 text-sm">
        {resendMessage}
      </p>
    )}

        <p className="text-center text-sm">
          <Link to="/forgot-password" className="font-semibold text-orange-500">
            Change Email / Phone
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default VerifyOtp;