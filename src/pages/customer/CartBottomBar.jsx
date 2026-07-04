import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart } from "../../features/customer/services/cartService";

function CartBottomBar({ refreshKey = 0 }) {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);

  async function fetchCart() {
    try {
      const response = await getCart();
      setCart(response.data || null);
    } catch {
      setCart(null);
    }
  }

  useEffect(() => {
    fetchCart();

    function refreshCart() {
      fetchCart();
    }

    window.addEventListener("cartUpdated", refreshCart);

    return () => {
      window.removeEventListener("cartUpdated", refreshCart);
    };
  }, [refreshKey]);

  const items = cart?.items || [];

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[90%] max-w-3xl -translate-x-1/2 rounded-2xl bg-gray-900 p-4 text-white shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold">
            🛒 {items.length} item{items.length > 1 ? "s" : ""}
          </p>
          <p className="text-sm text-gray-300">₹{cart.totalAmount}</p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/customer/cart")}
          className="rounded-xl bg-orange-500 px-5 py-2 text-sm font-semibold text-white"
        >
          View Cart
        </button>
      </div>
    </div>
  );
}

export default CartBottomBar;