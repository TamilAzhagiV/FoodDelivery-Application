import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles, requireApproval = false }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  if (
    requireApproval &&
    user.role === "RESTAURANT_OWNER" &&
    user.approvalStatus !== "APPROVED"
  ) {
    return <Navigate to="/restaurant/approval-status" />;
  }

  if (
    requireApproval &&
    user.role === "DELIVERY_PARTNER" &&
    user.approvalStatus !== "APPROVED"
  ) {
    return <Navigate to="/delivery/dashboard" />;
  }

  if (
  requireApproval &&
  user.role === "DELIVERY_PARTNER" &&
  user.approvalStatus !== "APPROVED"
) {
  return <Navigate to="/delivery/approval-status" />;
}

  return children;
}


export default ProtectedRoute;