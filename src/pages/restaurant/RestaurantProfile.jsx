import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import TextArea from "../../components/ui/TextArea";

import {
  getProfile,
  updateRestaurantProfile,
} from "../../features/profile/services/profileService";

function RestaurantProfile() {
  const [formData, setFormData] = useState({
    restaurantName: "",
    description: "",
    logo: "",
    coverImage: "",

    businessPhoneNumber: "",
    businessEmail: "",

    street: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    latitude: "",
    longitude: "",

    cuisineTypes: [],

    gstNumber: "",
    fssaiLicenseNumber: "",

    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",

    openingTime: "",
    closingTime: "",

    deliveryRadius: "",
    averagePreparationTime: "",
    minimumOrderAmount: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    "Bakery",
    "Sea Food",
  ];

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await getProfile();
        const profile = response.data || response.profile || response;

        setFormData({
          restaurantName: profile.restaurantName || "",
          description: profile.description || "",
          logo: "",
          coverImage: "",

          businessPhoneNumber: profile.businessPhoneNumber || "",
          businessEmail: profile.businessEmail || "",

          street: profile.address?.street || "",
          area: profile.address?.area || "",
          city: profile.address?.city || "",
          state: profile.address?.state || "",
          pincode: profile.address?.pincode || "",
          latitude: profile.address?.latitude || "",
          longitude: profile.address?.longitude || "",

          cuisineTypes: profile.cuisineTypes || [],

          gstNumber: profile.gstNumber || "",
          fssaiLicenseNumber: profile.fssaiLicenseNumber || "",

          accountHolderName: profile.bankDetails?.accountHolderName || "",
          accountNumber: profile.bankDetails?.accountNumber || "",
          ifscCode: profile.bankDetails?.ifscCode || "",
          bankName: profile.bankDetails?.bankName || "",

          openingTime: profile.openingTime || "",
          closingTime: profile.closingTime || "",

          deliveryRadius: profile.deliveryRadius || "",
          averagePreparationTime: profile.averagePreparationTime || "",
          minimumOrderAmount: profile.minimumOrderAmount || "",
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
    const { name, value, files, type } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  }

  function handleCuisineChange(cuisine) {
    setFormData((prev) => {
      const alreadySelected = prev.cuisineTypes.includes(cuisine);

      return {
        ...prev,
        cuisineTypes: alreadySelected
          ? prev.cuisineTypes.filter((item) => item !== cuisine)
          : [...prev.cuisineTypes, cuisine],
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const payload = {
      restaurantName: formData.restaurantName,
      description: formData.description,
      logo: formData.logo,
      coverImage: formData.coverImage,

      businessPhoneNumber: formData.businessPhoneNumber,
      businessEmail: formData.businessEmail,

      address: {
        street: formData.street,
        area: formData.area,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        latitude: Number(formData.latitude),
        longitude: Number(formData.longitude),
      },

      gstNumber: formData.gstNumber,
      fssaiLicenseNumber: formData.fssaiLicenseNumber,
      cuisineTypes: formData.cuisineTypes,

      openingTime: formData.openingTime,
      closingTime: formData.closingTime,

      bankDetails: {
        accountHolderName: formData.accountHolderName,
        accountNumber: formData.accountNumber,
        ifscCode: formData.ifscCode,
        bankName: formData.bankName,
      },

      deliveryRadius: Number(formData.deliveryRadius || 5),
      averagePreparationTime: Number(formData.averagePreparationTime || 30),
      minimumOrderAmount: Number(formData.minimumOrderAmount || 0),
    };

    const restaurantFormData = new FormData();

    restaurantFormData.append("restaurantName", payload.restaurantName);
    restaurantFormData.append("description", payload.description);
    restaurantFormData.append("businessPhoneNumber", payload.businessPhoneNumber);
    restaurantFormData.append("businessEmail", payload.businessEmail);
    restaurantFormData.append("gstNumber", payload.gstNumber);
    restaurantFormData.append("fssaiLicenseNumber", payload.fssaiLicenseNumber);
    restaurantFormData.append("openingTime", payload.openingTime);
    restaurantFormData.append("closingTime", payload.closingTime);
    restaurantFormData.append("deliveryRadius", payload.deliveryRadius);
    restaurantFormData.append(
      "averagePreparationTime",
      payload.averagePreparationTime
    );
    restaurantFormData.append("minimumOrderAmount", payload.minimumOrderAmount);

    restaurantFormData.append("address", JSON.stringify(payload.address));
    restaurantFormData.append(
      "cuisineTypes",
      JSON.stringify(payload.cuisineTypes)
    );
    restaurantFormData.append(
      "bankDetails",
      JSON.stringify(payload.bankDetails)
    );

    if (payload.logo) {
      restaurantFormData.append("logo", payload.logo);
    }

    if (payload.coverImage) {
      restaurantFormData.append("coverImage", payload.coverImage);
    }

    try {
      const response = await updateRestaurantProfile(restaurantFormData);
      console.log("Restaurant Profile Response:", response);
      alert(response.message || "Restaurant profile submitted for review");
      setIsEditing(false);
    } catch (error) {
      console.log("Restaurant profile error:", error.message);
      alert(error.message || "Something went wrong");
    }
  }

        const latitude = Number(formData.latitude);
      const longitude = Number(formData.longitude);

      if (latitude < -90 || latitude > 90) {
        alert("Latitude must be between -90 and 90");
        return;
      }

      if (longitude < -180 || longitude > 180) {
        alert("Longitude must be between -180 and 180");
        return;
      }

    

  return (
    <DashboardLayout>
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
            Restaurant Profile
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Complete your restaurant profile to submit it for admin approval.
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
            Basic Restaurant Information
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              name="restaurantName"
              value={formData.restaurantName}
              onChange={handleChange}
              placeholder="Restaurant Name"
              disabled={!isEditing}
              required
            />

            <div className="md:col-span-2">
              <TextArea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Restaurant Description"
                disabled={!isEditing}
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600">
                Logo
              </label>
              <Input
                type="file"
                name="logo"
                onChange={handleChange}
                disabled={!isEditing}
                required={!formData.logo}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600">
                Cover Image
              </label>
              <Input
                type="file"
                name="coverImage"
                onChange={handleChange}
                disabled={!isEditing}
                required={!formData.coverImage}
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Contact Information
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              name="businessPhoneNumber"
              value={formData.businessPhoneNumber}
              onChange={handleChange}
              placeholder="Business Phone Number"
              disabled={!isEditing}
              required
            />

            <Input
              type="email"
              name="businessEmail"
              value={formData.businessEmail}
              onChange={handleChange}
              placeholder="Business Email"
              disabled={!isEditing}
              required
            />
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Restaurant Address
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Input name="street" value={formData.street} onChange={handleChange} placeholder="Street" disabled={!isEditing} required />
            <Input name="area" value={formData.area} onChange={handleChange} placeholder="Area" disabled={!isEditing} required />
            <Input name="city" value={formData.city} onChange={handleChange} placeholder="City" disabled={!isEditing} required />
            <Input name="state" value={formData.state} onChange={handleChange} placeholder="State" disabled={!isEditing} required />
            <Input name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" disabled={!isEditing} required />
           <Input
                type="number"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                placeholder="Latitude"
                disabled={!isEditing}
                required
                min="-90"
                max="90"
                step="any"
              />

            <Input
                  type="number"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  placeholder="Longitude"
                  disabled={!isEditing}
                  required
                  min="-180"
                  max="180"
                  step="any"
                />
            </div>
          </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Cuisine Information
          </h2>

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
                  formData.cuisineTypes.includes(cuisine)
                    ? "bg-orange-500 text-white"
                    : "bg-orange-100 text-orange-600"
                } ${!isEditing ? "cursor-not-allowed opacity-60" : ""}`}
              >
                {cuisine}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Legal Information
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Input name="gstNumber" value={formData.gstNumber} onChange={handleChange} placeholder="GST Number" disabled={!isEditing} required />
            <Input name="fssaiLicenseNumber" value={formData.fssaiLicenseNumber} onChange={handleChange} placeholder="FSSAI License Number" disabled={!isEditing} required />
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Bank Details
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Input name="accountHolderName" value={formData.accountHolderName} onChange={handleChange} placeholder="Account Holder Name" disabled={!isEditing} required />
            <Input name="accountNumber" value={formData.accountNumber} onChange={handleChange} placeholder="Account Number" disabled={!isEditing} required />
            <Input name="ifscCode" value={formData.ifscCode} onChange={handleChange} placeholder="IFSC Code" disabled={!isEditing} required />
            <Input name="bankName" value={formData.bankName} onChange={handleChange} placeholder="Bank Name" disabled={!isEditing} required />
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Restaurant Timings
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Input type="time" name="openingTime" value={formData.openingTime} onChange={handleChange} disabled={!isEditing} required />
            <Input type="time" name="closingTime" value={formData.closingTime} onChange={handleChange} disabled={!isEditing} required />
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Delivery Settings
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            <Input type="number" name="deliveryRadius" value={formData.deliveryRadius} onChange={handleChange} placeholder="Delivery Radius KM" disabled={!isEditing} />
            <Input type="number" name="averagePreparationTime" value={formData.averagePreparationTime} onChange={handleChange} placeholder="Average Preparation Time" disabled={!isEditing} />
            <Input type="number" name="minimumOrderAmount" value={formData.minimumOrderAmount} onChange={handleChange} placeholder="Minimum Order Amount" disabled={!isEditing} />
          </div>
        </div>
        

        {isEditing && (
          <div className="max-w-sm">
            <Button type="submit">Submit Restaurant Profile</Button>
          </div>
        )}
      </form>
    </DashboardLayout>
  );
}

export default RestaurantProfile;