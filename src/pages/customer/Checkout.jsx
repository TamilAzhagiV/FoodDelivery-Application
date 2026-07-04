import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CustomerLayout from "../../components/layout/CustomerLayout";
import { getCart } from "../../features/customer/services/cartService";
import { placeOrder } from "../../features/customer/services/orderService";
import {
  createPayment,
  verifyPayment,
} from "../../features/customer/services/paymentServices";

function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [instruction, setInstruction] = useState("");

  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState("");

  async function fetchCheckoutData() {
    try {
      setLoading(true);
      setError("");

      const response = await getCart();
      setCart(response.data || null);

      const address = JSON.parse(
        localStorage.getItem("selectedCustomerAddress")
      );

      setSelectedAddress(address);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCheckoutData();
  }, []);

  function loadRazorpayScript() {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  async function handlePlaceOrder() {
    if (!selectedAddress) {
      alert("Please select a delivery address");
      navigate("/customer/delivery-address");
      return;
    }

    try {
      setPlacingOrder(true);

      if (paymentMethod === "COD") {
        const response = await placeOrder();

        window.dispatchEvent(new Event("cartUpdated"));
        alert(response.message || "Order placed successfully");
        navigate("/customer/orders");
        return;
      }

      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded) {
        alert("Razorpay failed to load");
        return;
      }

      const paymentResponse = await createPayment();

      const paymentData = paymentResponse.data;

      const options = {
        key: paymentData.key,
        amount: paymentData.amount,
        currency: paymentData.currency || "INR",
        name: "FoodHub",
        description: "Food Order Payment",
        order_id: paymentData.razorpayOrderId,

        handler: async function (razorpayResponse) {
          try {
            const verifyResponse = await verifyPayment({
              paymentId: paymentData.paymentId,
              razorpayOrderId: razorpayResponse.razorpay_order_id,
              razorpayPaymentId: razorpayResponse.razorpay_payment_id,
              razorpaySignature: razorpayResponse.razorpay_signature,
            });

            window.dispatchEvent(new Event("cartUpdated"));

            alert(verifyResponse.message || "Payment successful");

            navigate("/customer/orders");
          } catch (error) {
            alert(error.message || "Payment verification failed");
          }
        },

        modal: {
          ondismiss: function () {
            alert("Payment cancelled");
          },
        },

        theme: {
          color: "#f97316",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      alert(error.message);
    } finally {
      setPlacingOrder(false);
    }
  }

  const items = cart?.items || [];

  const itemTotal = cart?.totalAmount || 0;
  const deliveryFee = itemTotal > 0 ? 40 : 0;
  const platformFee = itemTotal > 0 ? 10 : 0;
  const gst = Math.round(itemTotal * 0.05);
  const grandTotal = itemTotal + deliveryFee + platformFee + gst;

  return (
    <CustomerLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
        <p className="text-sm text-gray-500">
          Review address, order summary and payment method.
        </p>
      </div>

      {loading && <p className="rounded-xl bg-white p-4">Loading checkout...</p>}

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
          <div className="space-y-5 lg:col-span-2">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Delivery Address
                  </h2>

                  {selectedAddress ? (
                    <div className="mt-3">
                      <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-600">
                        {selectedAddress.label}
                      </span>

                      <p className="mt-3 font-semibold text-gray-800">
                        {selectedAddress.fullAddress}
                      </p>

                      <p className="text-sm text-gray-500">
                        {selectedAddress.city}, {selectedAddress.state} -{" "}
                        {selectedAddress.pincode}
                      </p>

                      {selectedAddress.landmark && (
                        <p className="text-sm text-gray-400">
                          Landmark: {selectedAddress.landmark}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="mt-3 text-sm text-red-500">
                      No delivery address selected.
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/customer/delivery-address")}
                  className="rounded-xl border px-4 py-2 text-sm font-semibold"
                >
                  Change
                </button>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-gray-800">
                Order Items
              </h2>

              <div className="space-y-4">
                {items.map((item) => {
                  const menuItem = item.menuItemId;

                  return (
                    <div
                      key={menuItem?._id || menuItem}
                      className="flex justify-between border-b pb-4 last:border-b-0"
                    >
                      <div>
                        <h3 className="font-bold text-gray-800">
                          {menuItem?.name || "Food Item"}
                        </h3>

                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity} × ₹{item.price}
                        </p>
                      </div>

                      <p className="font-semibold text-gray-700">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-gray-800">
                Cooking Instructions
              </h2>

              <textarea
                value={instruction}
                onChange={(event) => setInstruction(event.target.value)}
                placeholder="Example: Less spicy, no onion..."
                rows="4"
                className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="h-fit space-y-5">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800">
                Payment Method
              </h2>

              <div className="mt-4 space-y-3">
                {["COD", "UPI", "CARD"].map((method) => (
                  <label
                    key={method}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border p-3"
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(event) => setPaymentMethod(event.target.value)}
                    />

                    <span className="font-semibold text-gray-700">
                      {method === "COD"
                        ? "Cash on Delivery"
                        : method === "UPI"
                        ? "UPI"
                        : "Card"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800">Bill Details</h2>

              <BillRow label="Item Total" value={itemTotal} />
              <BillRow label="Delivery Fee" value={deliveryFee} />
              <BillRow label="Platform Fee" value={platformFee} />
              <BillRow label="GST" value={gst} />

              <div className="mt-4 border-t pt-4">
                <div className="flex justify-between text-lg font-bold text-gray-800">
                  <span>Grand Total</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={placingOrder}
                className="mt-6 w-full rounded-xl bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600 disabled:bg-gray-300"
              >
                {placingOrder
                  ? "Processing..."
                  : paymentMethod === "COD"
                  ? "Place Order"
                  : "Proceed to Payment"}
              </button>

              <p className="mt-3 text-center text-xs text-gray-400">
                Online payment is handled securely by Razorpay.
              </p>
            </div>
          </div>
        </div>
      )}
    </CustomerLayout>
  );
}

function BillRow({ label, value }) {
  return (
    <div className="mt-3 flex justify-between text-sm text-gray-600">
      <span>{label}</span>
      <span>₹{value}</span>
    </div>
  );
}

export default Checkout;