import { useEffect, useState } from "react";
import CustomerLayout from "../../components/layout/CustomerLayout";

import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  selectAddress,
  getSelectedAddress,
} from "../../features/address/services/addressService";

function DeliveryAddress() {
  const [addresses, setAddresses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState("");

  const [formData, setFormData] = useState({
    label: "HOME",
    fullAddress: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });

  useEffect(() => {
    const storedAddresses = getAddresses();
    const selectedAddress = getSelectedAddress();

    setAddresses(storedAddresses);
    setSelectedAddressId(selectedAddress?.id || "");
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function resetForm() {
    setFormData({
      label: "HOME",
      fullAddress: "",
      city: "",
      state: "",
      pincode: "",
      landmark: "",
    });

    setEditingId(null);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !formData.fullAddress.trim() ||
      !formData.city.trim() ||
      !formData.state.trim() ||
      !formData.pincode.trim()
    ) {
      alert("Address, city, state and pincode are required");
      return;
    }

    if (editingId) {
      updateAddress(editingId, formData);
    } else {
      addAddress(formData);
    }

    setAddresses(getAddresses());
    resetForm();
  }

  function handleEdit(address) {
    setEditingId(address.id);

    setFormData({
      label: address.label,
      fullAddress: address.fullAddress,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      landmark: address.landmark || "",
    });
  }

  function handleDelete(addressId) {
    const confirmDelete = window.confirm("Delete this address?");

    if (!confirmDelete) return;

    deleteAddress(addressId);
    setAddresses(getAddresses());

    if (selectedAddressId === addressId) {
      setSelectedAddressId("");
    }
  }
  function handleSelect(address) {
  selectAddress(address);
  setSelectedAddressId(address.id);

  window.dispatchEvent(new Event("addressUpdated"));

  alert("Delivery address selected");
  }

  return (
    <CustomerLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Delivery Address
        </h1>

        <p className="text-sm text-gray-500">
          Add, edit and select your delivery address.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-8 rounded-3xl bg-white p-6 shadow-sm"
      >
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          {editingId ? "Edit Address" : "Add New Address"}
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <select
            name="label"
            value={formData.label}
            onChange={handleChange}
            className="rounded-xl border p-3"
          >
            <option value="HOME">Home</option>
            <option value="WORK">Work</option>
            <option value="OTHER">Other</option>
          </select>

          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="rounded-xl border p-3"
          />

          <input
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            className="rounded-xl border p-3"
          />

          <input
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            className="rounded-xl border p-3"
          />

          <input
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            placeholder="Landmark"
            className="rounded-xl border p-3 md:col-span-2"
          />

          <textarea
            name="fullAddress"
            value={formData.fullAddress}
            onChange={handleChange}
            placeholder="Full Address"
            rows="4"
            className="rounded-xl border p-3 md:col-span-2"
          />
        </div>

        <div className="mt-5 flex gap-3">
          <button
            type="submit"
            className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white"
          >
            {editingId ? "Update Address" : "Save Address"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl border px-6 py-3 font-semibold"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-4">
        {addresses.length === 0 && (
          <p className="rounded-xl bg-white p-4 text-gray-500">
            No address added yet.
          </p>
        )}

        {addresses.map((address) => (
          <div
            key={address.id}
            className="rounded-2xl bg-white p-5 shadow-sm"
          >
            <div className="flex flex-wrap justify-between gap-4">
              <div>
                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-600">
                  {address.label}
                </span>

                {selectedAddressId === address.id && (
                  <span className="ml-2 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-600">
                    Selected
                  </span>
                )}

                <p className="mt-3 font-semibold text-gray-800">
                  {address.fullAddress}
                </p>

                <p className="text-sm text-gray-500">
                  {address.city}, {address.state} - {address.pincode}
                </p>

                {address.landmark && (
                  <p className="text-sm text-gray-400">
                    Landmark: {address.landmark}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleSelect(address)}
                  className="rounded-xl bg-green-500 px-4 py-2 text-sm font-semibold text-white"
                >
                  Select
                </button>

                <button
                  type="button"
                  onClick={() => handleEdit(address)}
                  className="rounded-xl border px-4 py-2 text-sm font-semibold"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(address.id)}
                  className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </CustomerLayout>
  );
}

export default DeliveryAddress;