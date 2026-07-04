import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CustomerLayout from "../../components/layout/CustomerLayout";
import { getRestaurants } from "../../features/customer/services/restaurantService";
import { FOOD_CATEGORIES } from "../../utils/categories";
import CartBottomBar from "./CartBottomBar";

function CustomerDashboard() {
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchRestaurants() {
    try {
      setLoading(true);
      setError("");

      const response = await getRestaurants();
      setRestaurants(response.data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const search = searchText.toLowerCase();

    const name = restaurant.restaurantName?.toLowerCase() || "";
    const cuisines = restaurant.cuisineTypes?.join(" ").toLowerCase() || "";
    const city = restaurant.address?.city?.toLowerCase() || "";

    const matchesSearch =
      name.includes(search) || cuisines.includes(search) || city.includes(search);

    const matchesCategory =
      selectedCategory === "all" || cuisines.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  return (
    <CustomerLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Restaurants Near You
        </h1>

        <p className="text-sm text-gray-500">
          Discover restaurants and order your favorite food.
        </p>
      </div>

      <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm">
        <input
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Search restaurants, cuisine, or city..."
          className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div className="mb-6">
        <h2 className="mb-3 text-xl font-bold text-gray-800">
          Categories
        </h2>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {FOOD_CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setSelectedCategory(category.id)}
              className={`min-w-fit rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm ${
                selectedCategory === category.id
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700 hover:bg-orange-50"
              }`}
            >
              <span className="mr-2">{category.emoji}</span>
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <p className="rounded-xl bg-white p-4 text-gray-500">
          Loading restaurants...
        </p>
      )}

      {error && (
        <p className="rounded-xl bg-red-50 p-4 text-red-500">{error}</p>
      )}

      {!loading && filteredRestaurants.length === 0 && (
        <p className="rounded-xl bg-white p-4 text-gray-500">
          No restaurants found.
        </p>
      )}

      <div className="grid gap-6 pb-24 md:grid-cols-2 xl:grid-cols-3">
        {filteredRestaurants.map((restaurant) => (
          <div
            key={restaurant._id}
            className="overflow-hidden rounded-3xl bg-white shadow-sm"
          >
            <div className="h-40 bg-orange-100">
              {restaurant.coverImage ? (
                <img
                  src={restaurant.coverImage}
                  alt={restaurant.restaurantName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-4xl font-bold text-orange-500">
                  {restaurant.restaurantName?.charAt(0) || "R"}
                </div>
              )}
            </div>

            <div className="p-5">
              <h2 className="text-xl font-bold text-gray-800">
                {restaurant.restaurantName}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {restaurant.cuisineTypes?.join(", ") || "Food"}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                {restaurant.address?.area}, {restaurant.address?.city}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    restaurant.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {restaurant.isActive ? "Open" : "Closed"}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    navigate(`/customer/restaurants/${restaurant._id}`)
                  }
                  className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
                >
                  View Menu
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CartBottomBar />
    </CustomerLayout>
  );
}

export default CustomerDashboard;