import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function CustomerNavbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );

  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    function updateSelectedAddress() {
      const address = JSON.parse(
        localStorage.getItem("selectedCustomerAddress")
      );

      setSelectedAddress(address);
    }

    updateSelectedAddress();

    window.addEventListener("addressUpdated", updateSelectedAddress);

    return () => {
      window.removeEventListener("addressUpdated", updateSelectedAddress);
    };
  }, []);

  useEffect(() => {
    function updateProfile() {
      setProfile(JSON.parse(localStorage.getItem("profile")));
    }

    window.addEventListener("profileUpdated", updateProfile);

    return () => {
      window.removeEventListener("profileUpdated", updateProfile);
    };
  }, []);

  const role = user?.role || "CUSTOMER";

  const profileImage =
    profile?.profileImage ||
    profile?.data?.profileImage ||
    user?.profileImage ||
    "";

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("profile");
    localStorage.removeItem("accessToken");
    navigate("/login");
  }

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6">
        <Link
          to="/customer/dashboard"
          className="text-2xl font-bold text-orange-500"
        >
          FoodHub
        </Link>

        <button
          type="button"
          onClick={() => navigate("/customer/delivery-address")}
          className="hidden flex-1 rounded-xl border border-gray-300 bg-white px-4 py-2 text-left hover:border-orange-400 md:block"
        >
          <p className="text-xs text-gray-500">Deliver To</p>

          <p className="truncate text-sm font-semibold text-gray-800">
            {selectedAddress
              ? `${selectedAddress.label} • ${selectedAddress.city}, ${selectedAddress.pincode}`
              : "Select Delivery Address"}
          </p>
        </button>
                  <div className="flex items-center gap-5 text-sm font-medium">
        <Link
          to="/customer/home"
          className="text-gray-700 hover:text-orange-500"
        >
          Home
        </Link>

        <Link
          to="/customer/dashboard"
          className="text-gray-700 hover:text-orange-500"
        >
          Dashboard
        </Link>

        <Link
          to="/customer/orders"
          className="text-gray-700 hover:text-orange-500"
        >
          Orders
        </Link>

        <Link
          to="/customer/delivery-address"
          className="text-gray-700 hover:text-orange-500"
        >
          Address
        </Link>

        <Link
          to="/customer/cart"
          className="rounded-xl bg-orange-100 px-4 py-2 text-orange-600 hover:bg-orange-200"
        >
          Cart
        </Link>

        <Link
          to="/customer/profile"
          title={role}
          className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-600 ring-2 ring-orange-200"
        >
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            role.charAt(0)
          )}

          <span className="absolute top-12 hidden whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1 text-xs text-white group-hover:block">
            {role}
          </span>
        </Link>

        <button
          onClick={handleLogout}
          className="rounded-xl bg-red-50 px-4 py-2 text-red-500 hover:bg-red-100"
        >
          Logout
        </button>
      </div>
      </div>
    </nav>
  );
}

export default CustomerNavbar;