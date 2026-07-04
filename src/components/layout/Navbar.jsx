import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [searchText, setSearchText] = useState("");

  function handleSearch(e) {
    e.preventDefault();

    if (!searchText.trim()) return;

    navigate(`/customer/search?query=${searchText}`);
  }

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <nav className="sticky top-0 z-10 bg-white px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between gap-6">
        <Link to="/" className="text-xl font-bold text-orange-500">
          FoodDelivery
        </Link>

        {user?.role === "CUSTOMER" && (
          <form onSubmit={handleSearch} className="flex flex-1 max-w-xl">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search restaurants or food..."
              className="w-full rounded-l-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <button
              type="submit"
              className="rounded-r-xl bg-orange-500 px-5 py-2 font-semibold text-white hover:bg-orange-600"
            >
              Search
            </button>
          </form>
        )}

        <div className="flex items-center gap-4">
          {user?.role === "CUSTOMER" && (
            <Link
              to="/customer/cart"
              className="rounded-xl bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-200"
            >
              Cart
            </Link>
          )}

          <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700">
            {user?.role || "Guest"}
          </span>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-100"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;