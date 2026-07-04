import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CustomerLayout from "../../components/layout/CustomerLayout";

import {
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../../features/customer/services/cartService";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchCart() {
    try {
      setLoading(true);
      setError("");

      const response = await getCart();
      setCart(response.data || null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  async function handleQuantityChange(menuItemId, quantity) {
    try {
      if (quantity < 1) {
        await removeCartItem(menuItemId);
      } else {
        await updateCartItem(menuItemId, quantity);
      }

      window.dispatchEvent(new Event("cartUpdated"));
      fetchCart();
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleRemove(menuItemId) {
    try {
      await removeCartItem(menuItemId);

      window.dispatchEvent(new Event("cartUpdated"));
      fetchCart();
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleClearCart() {
    const confirmClear = window.confirm("Clear all cart items?");

    if (!confirmClear) return;

    try {
      await clearCart();

      window.dispatchEvent(new Event("cartUpdated"));
      fetchCart();
    } catch (error) {
      alert(error.message);
    }
  }

  const items = cart?.items || [];

  return (
    <CustomerLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Cart</h1>
        <p className="text-sm text-gray-500">
          Review your food items before placing the order.
        </p>
      </div>

      {loading && (
        <p className="rounded-xl bg-white p-4 text-gray-500">
          Loading cart...
        </p>
      )}

      {error && (
        <p className="rounded-xl bg-red-50 p-4 text-red-500">{error}</p>
      )}

      {!loading && items.length === 0 && (
        <p className="rounded-xl bg-white p-4 text-gray-500">
          Your cart is empty.
        </p>
      )}

      {!loading && items.length > 0 && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {items.map((item) => {
              const menuItem = item.menuItemId;
              const menuItemId =
                typeof menuItem === "object" ? menuItem._id : menuItem;

              return (
                <div
                  key={menuItemId}
                  className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 overflow-hidden rounded-2xl bg-orange-100">
                      {menuItem?.image ? (
                        <img
                          src={menuItem.image}
                          alt={menuItem.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center font-bold text-orange-500">
                          {menuItem?.name?.charAt(0) || "F"}
                        </div>
                      )}
                    </div>

                    <div>
                      <h2 className="font-bold text-gray-800">
                        {menuItem?.name || "Menu Item"}
                      </h2>

                      <p className="text-sm text-gray-500">
                        ₹{item.price} x {item.quantity}
                      </p>

                      <p className="text-sm font-semibold text-gray-700">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        handleQuantityChange(menuItemId, item.quantity - 1)
                      }
                      className="rounded-lg border px-3 py-1 font-bold"
                    >
                      -
                    </button>

                    <span className="font-semibold">{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() =>
                        handleQuantityChange(menuItemId, item.quantity + 1)
                      }
                      className="rounded-lg border px-3 py-1 font-bold"
                    >
                      +
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRemove(menuItemId)}
                      className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="h-fit rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800">Price Summary</h2>

            <div className="mt-5 flex justify-between text-sm text-gray-600">
              <span>Total Items</span>
              <span>{items.length}</span>
            </div>

            <div className="mt-3 flex justify-between text-lg font-bold text-gray-800">
              <span>Total Amount</span>
              <span>₹{cart?.totalAmount || 0}</span>
            </div>

            <button
              type="button"
              onClick={() => navigate("/customer/checkout")}
              className="mt-6 w-full rounded-xl bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600"
            >
              Proceed to Checkout
            </button>

            <button
              type="button"
              onClick={handleClearCart}
              className="mt-3 w-full rounded-xl border py-3 font-semibold text-gray-700"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </CustomerLayout>
  );
}

export default Cart;