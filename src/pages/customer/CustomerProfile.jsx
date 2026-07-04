import { useEffect, useState } from "react";

import CustomerLayout from "../../components/layout/CustomerLayout";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";

import {
  getProfile,
  updateCustomerProfile,
} from "../../features/profile/services/profileService";



function CustomerProfile() {
  const [formData, setFormData] = useState({
    profileImage: null,
    label: "HOME",
    street: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    latitude: "",
    longitude: "",
    vegetarian: false,
    favouriteCuisines: [],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const addressLabels = [
    { label: "Home", value: "HOME" },
    { label: "Work", value: "WORK" },
    { label: "Other", value: "OTHER" },
  ];

  const cuisines = [
    "South Indian",
    "North Indian",
    "Chinese",
    "Biryani",
    "Fast Food",
    "Pizza",
    "Burger",
    "Desserts",
    "Beverages",
  ];

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await getProfile();

        const profile = response.data || response.profile || response;

        setFormData({
          profileImage: null,
          label: profile.addresses?.[0]?.label || "HOME",
          street: profile.addresses?.[0]?.street || "",
          area: profile.addresses?.[0]?.area || "",
          city: profile.addresses?.[0]?.city || "",
          state: profile.addresses?.[0]?.state || "",
          pincode: profile.addresses?.[0]?.pincode || "",
          landmark: profile.addresses?.[0]?.landmark || "",
          latitude: profile.addresses?.[0]?.latitude || "",
          longitude: profile.addresses?.[0]?.longitude || "",
          vegetarian: profile.preferences?.vegetarian || false,
          favouriteCuisines: profile.preferences?.favouriteCuisines || [],
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  function handleChange(event) {
    const { name, value, type, checked, files } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "file"
          ? files[0]
          : type === "checkbox"
          ? checked
          : value,
    }));
  }

  function handleCuisineChange(cuisine) {
    setFormData((prev) => {
      const isSelected = prev.favouriteCuisines.includes(cuisine);

      return {
        ...prev,
        favouriteCuisines: isSelected
          ? prev.favouriteCuisines.filter((item) => item !== cuisine)
          : [...prev.favouriteCuisines, cuisine],
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const customerFormData = new FormData();

    if (formData.profileImage) {
      customerFormData.append("profileImage", formData.profileImage);
    }

    customerFormData.append(
      "addresses",
      JSON.stringify([
        {
          label: formData.label,
          street: formData.street,
          area: formData.area,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          landmark: formData.landmark,
          latitude: Number(formData.latitude),
          longitude: Number(formData.longitude),
        },
      ])
    );

    customerFormData.append(
      "preferences",
      JSON.stringify({
        vegetarian: formData.vegetarian,
        favouriteCuisines: formData.favouriteCuisines,
      })
    );

    try {
      const response = await updateCustomerProfile(customerFormData);

      console.log("Customer Profile Response:", response);

      const updatedProfile = response.data || response.profile || response;

      localStorage.setItem("profile", JSON.stringify(updatedProfile));

      window.dispatchEvent(new Event("profileUpdated"));

      alert(response.message || "Customer profile saved successfully");
      setIsEditing(false);

    } catch (error) {
      console.log("Customer profile error:", error.message);
      alert(error.message || "Something went wrong");
    }
  }

  return (
    <CustomerLayout>
      {loading && (
        <p className="mb-4 rounded-xl bg-white p-4 text-gray-500">
          Loading profile...
        </p>
      )}

      {error && (
        <p className="mb-4 rounded-xl bg-red-50 p-4 text-red-500">
          {error}
        </p>
      )}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Customer Profile
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Complete your address and food preferences.
          </p>
        </div>

        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="rounded-xl bg-orange-500 px-5 py-2 text-sm font-semibold text-white hover:bg-orange-600"
          >
            Edit Profile
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Profile Image
          </h2>

          <Input
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Address Information
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Select
              name="label"
              value={formData.label}
              onChange={handleChange}
              options={addressLabels}
              disabled={!isEditing}
              required
            />

            <Input
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="Street"
              disabled={!isEditing}
              required
            />

            <Input
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="Area"
              disabled={!isEditing}
              required
            />

            <Input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              disabled={!isEditing}
              required
            />

            <Input
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              disabled={!isEditing}
              required
            />

            <Input
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Pincode"
              disabled={!isEditing}
              required
            />

            <Input
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              placeholder="Landmark"
              disabled={!isEditing}
            />

            <Input
              type="number"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              placeholder="Latitude"
              disabled={!isEditing}
              required
            />

            <Input
              type="number"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              placeholder="Longitude"
              disabled={!isEditing}
              required
            />
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Food Preferences
          </h2>

          <label className="mb-4 flex items-center gap-3 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              name="vegetarian"
              checked={formData.vegetarian}
              onChange={handleChange}
              disabled={!isEditing}
              className="h-4 w-4"
            />
            Vegetarian
          </label>

          <div className="flex flex-wrap gap-3">
            {cuisines.map((cuisine) => (
              <button
                type="button"
                key={cuisine}
                disabled={!isEditing}
                onClick={() => {
                  if (!isEditing) return;
                  handleCuisineChange(cuisine);
                }}
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  formData.favouriteCuisines.includes(cuisine)
                    ? "bg-orange-500 text-white"
                    : "bg-orange-100 text-orange-600"
                } ${!isEditing ? "cursor-not-allowed opacity-60" : ""}`}
              >
                {cuisine}
              </button>
            ))}
          </div>
        </div>

        {isEditing && (
          <div className="max-w-xs">
            <Button type="submit">Save Customer Profile</Button>
          </div>
        )}
      </form>
    </CustomerLayout>
  );
}

export default CustomerProfile;