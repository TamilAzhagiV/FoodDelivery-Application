import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CustomerLayout from "../../components/layout/CustomerLayout";
import {
  getRestaurantById,
  getRestaurantMenu,
} from "../../features/customer/services/restaurantService";

import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
} from "../../features/customer/services/cartService";

import CartBottomBar from "./CartBottomBar";

function RestaurantDetails() {
  const { restaurantId } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartRefreshKey, setCartRefreshKey] = useState(0);

  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchRestaurantDetails() {
    try {
      setLoading(true);
      setError("");

      const restaurantResponse = await getRestaurantById(restaurantId);
      const menuResponse = await getRestaurantMenu(restaurantId);
      const cartResponse = await getCart();

      setRestaurant(restaurantResponse.data || {});
      setMenuItems(menuResponse.data || []);
      setCartItems(cartResponse.data?.items || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCartItems() {
    try {
      const cartResponse = await getCart();
      setCartItems(cartResponse.data?.items || []);
      setCartRefreshKey((prev) => prev + 1);
    } catch {
      setCartItems([]);
    }
  }

  useEffect(() => {
    fetchRestaurantDetails();
  }, [restaurantId]);

  function getItemQuantity(menuItemId) {
    const cartItem = cartItems.find((item) => {
      const id =
        typeof item.menuItemId === "object"
          ? item.menuItemId._id
          : item.menuItemId;

      return id === menuItemId;
    });

    return cartItem?.quantity || 0;
  }

  async function handleAddToCart(item) {
    try {
      await addToCart(item._id, 1);
      window.dispatchEvent(new Event("cartUpdated"));
      await fetchCartItems();
    } catch (error) {
      alert(error.message);
    }
  }
  window.dispatchEvent(new Event("cartUpdated"));

  async function handleIncrease(item) {
    try {
      const currentQuantity = getItemQuantity(item._id);
      await updateCartItem(item._id, currentQuantity + 1);
      window.dispatchEvent(new Event("cartUpdated"));
      await fetchCartItems();
     
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleDecrease(item) {
    try {
      const currentQuantity = getItemQuantity(item._id);

      if (currentQuantity <= 1) {
        await removeCartItem(item._id);
        window.dispatchEvent(new Event("cartUpdated"));
      } else {
        await updateCartItem(item._id, currentQuantity - 1);
      }

      await fetchCartItems();
    } catch (error) {
      alert(error.message);
    }
  }

  const filteredMenuItems = menuItems.filter((item) =>
    item.name?.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) {
    return (
      <CustomerLayout>
        <p className="rounded-xl bg-white p-4 text-gray-500">
          Loading restaurant details...
        </p>
      </CustomerLayout>
    );
  }

  if (error) {
    return (
      <CustomerLayout>
        <p className="rounded-xl bg-red-50 p-4 text-red-500">{error}</p>
      </CustomerLayout>
    );
  }

  return (
    <CustomerLayout>
      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="h-56 bg-orange-100">
          {restaurant?.coverImage ? (
            <img
              src={restaurant.coverImage}
              alt={restaurant.restaurantName}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-5xl font-bold text-orange-500">
              {restaurant?.restaurantName?.charAt(0) || "R"}
            </div>
          )}
        </div>

        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {restaurant?.restaurantName}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {restaurant?.cuisineTypes?.join(", ") || "Restaurant"}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            {restaurant?.address?.area}, {restaurant?.address?.city}
          </p>

          <span className="mt-4 inline-block rounded-full bg-green-100 px-4 py-2 text-xs font-semibold text-green-700">
            {restaurant?.isActive ? "Open" : "Closed"}
          </span>
        </div>
      </div>

      <div className="my-6 rounded-2xl bg-white p-4 shadow-sm">
        <input
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Search food items..."
          className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <h2 className="mb-4 text-2xl font-bold text-gray-800">Menu</h2>

      <div className="space-y-4 pb-24">
        {filteredMenuItems.map((item) => {
          const quantity = getItemQuantity(item._id);

          return (
            <div
              key={item._id}
              className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 overflow-hidden rounded-2xl bg-orange-100">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center font-bold text-orange-500">
                      {item.name?.charAt(0)}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>

                  <p className="mt-1 text-sm font-semibold text-gray-700">
                    ₹{item.price}
                  </p>

                  <span
                    className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      item.isVeg
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.isVeg ? "Veg" : "Non Veg"}
                  </span>
                </div>
              </div>

              {!item.isAvailable ? (
                <button
                  type="button"
                  disabled
                  className="cursor-not-allowed rounded-xl bg-gray-200 px-5 py-2 text-sm font-semibold text-gray-500"
                >
                  Unavailable
                </button>
              ) : quantity > 0 ? (
                <div className="flex items-center gap-3 rounded-xl border border-orange-500 px-3 py-2">
                  <button
                    type="button"
                    onClick={() => handleDecrease(item)}
                    className="text-lg font-bold text-orange-500"
                  >
                    -
                  </button>

                  <span className="min-w-6 text-center font-bold text-gray-800">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleIncrease(item)}
                    className="text-lg font-bold text-orange-500"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleAddToCart(item)}
                  className="rounded-xl bg-orange-500 px-5 py-2 text-sm font-semibold text-white hover:bg-orange-600"
                >
                  Add
                </button>
              )}
            </div>
          );
        })}

        {filteredMenuItems.length === 0 && (
          <p className="rounded-xl bg-white p-4 text-gray-500">
            No menu items found.
          </p>
        )}
      </div>

      <CartBottomBar refreshKey={cartRefreshKey} />
    </CustomerLayout>
  );
}

export default RestaurantDetails;