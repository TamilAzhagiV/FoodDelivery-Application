import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

import AuthLayout from "../../../components/layout/AuthLayout";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Button from "../../../components/ui/Button";
import ErrorMessage from "../../../components/ui/ErrorMessage";

import { ROLES } from "../../../utils/constants";
import { validateLogin } from "../validations/authValidation";
import { AuthContext } from "../../../context/AuthContext";
import { loginUser } from "../services/authService";
import { getProfile } from "../../profile/services/profileService";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    role: "CUSTOMER",
    identifier: "",
    password: "",
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

  function getVerificationData(profileResponse, role) {
    const data = profileResponse?.data || profileResponse?.profile || {};

    if (role === "RESTAURANT_OWNER") {
      return {
        isVerified:
          data?.isVerified ||
          data?.restaurant?.isVerified ||
          data?.restaurantProfile?.isVerified ||
          false,

        approvalStatus:
          data?.approvalStatus ||
          data?.restaurant?.approvalStatus ||
          data?.restaurantProfile?.approvalStatus ||
          "PENDING",
      };
    }

    if (role === "DELIVERY_PARTNER") {
      return {
        isVerified:
          data?.isVerified ||
          data?.deliveryPartner?.isVerified ||
          data?.deliveryProfile?.isVerified ||
          false,

        approvalStatus:
          data?.approvalStatus ||
          data?.deliveryPartner?.approvalStatus ||
          data?.deliveryProfile?.approvalStatus ||
          "PENDING",
      };
    }

    return {
      isVerified: true,
      approvalStatus: "APPROVED",
    };
  }

  function navigateByRole(role) {
    switch (role) {
      case "CUSTOMER":
        navigate("/customer/home");
        break;

      case "RESTAURANT_OWNER":
        navigate("/restaurant/dashboard");
        break;

      case "DELIVERY_PARTNER":
        navigate("/delivery/dashboard");
        break;

      case "ADMIN":
        navigate("/admin/dashboard");
        break;

      default:
        navigate("/login");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateLogin(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const loginData = {
      emailOrPhone: formData.identifier,
      password: formData.password,
      role: formData.role,
    };

    try {
      const response = await loginUser(loginData);

      console.log("Login Success:", response);

      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);

      let verificationData = {
        isVerified: true,
        approvalStatus: "APPROVED",
      };

      if (
        response.user.role === "RESTAURANT_OWNER" ||
        response.user.role === "DELIVERY_PARTNER"
      ) {
        const profileResponse = await getProfile();

        console.log("Profile Response:", profileResponse);

        verificationData = getVerificationData(
          profileResponse,
          response.user.role
        );
      }

      const loggedInUser = {
        ...response.user,
        isVerified: verificationData.isVerified,
        approvalStatus: verificationData.approvalStatus,
      };

      localStorage.setItem("user", JSON.stringify(loggedInUser));

      login(loggedInUser);

      navigateByRole(loggedInUser.role);
    } catch (error) {
      console.error(error);
      alert(error.message || "Login failed");
    }
  }

  return (
    <AuthLayout title="Login" subtitle="Welcome back to Food Delivery">
      <div className="mb-5 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-orange-500 hover:text-orange-600"
        >
          Register
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
            type="text"
            name="identifier"
            value={formData.identifier}
            onChange={handleChange}
            placeholder="Email or Phone Number"
          />
          <ErrorMessage message={errors.identifier} />
        </div>

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

        <div className="text-right">
          <Link
            to="/forgot-password"
            className="text-sm text-orange-500 hover:text-orange-600"
          >
            Forgot Password?
          </Link>
        </div>

        <Button type="submit">Login</Button>
      </form>
    </AuthLayout>
  );
}

export default Login;