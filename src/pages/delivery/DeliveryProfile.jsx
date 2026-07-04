import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";

import {
  getProfile,
  updateDeliveryProfile,
} from "../../features/profile/services/profileService";

function DeliveryProfile() {
  const [formData, setFormData] = useState({
    profileImage: null,

    dateOfBirth: "",
    emergencyContactNumber: "",
    aadhaarNumber: "",

    vehicleType: "BIKE",
    vehicleNumber: "",
    vehicleModel: "",

    drivingLicenseNumber: "",
    drivingLicenseExpiryDate: "",

    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",

    latitude: "",
    longitude: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const vehicleTypes = [
    { label: "Bike", value: "BIKE" },
    { label: "Scooter", value: "SCOOTER" },
    { label: "Car", value: "CAR" },
  ];

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await getProfile();
        const profile = response.data || response.profile || response;

        setFormData({
          profileImage: null,

          dateOfBirth: profile.dateOfBirth || "",
          emergencyContactNumber: profile.emergencyContactNumber || "",
          aadhaarNumber: profile.aadhaarNumber || "",

          vehicleType: profile.vehicleType || "BIKE",
          vehicleNumber: profile.vehicleNumber || "",
          vehicleModel: profile.vehicleModel || "",

          drivingLicenseNumber: profile.drivingLicenseNumber || "",
          drivingLicenseExpiryDate: profile.drivingLicenseExpiryDate || "",

          accountHolderName: profile.bankDetails?.accountHolderName || "",
          accountNumber: profile.bankDetails?.accountNumber || "",
          ifscCode: profile.bankDetails?.ifscCode || "",
          bankName: profile.bankDetails?.bankName || "",

          latitude: profile.currentLocation?.latitude || "",
          longitude: profile.currentLocation?.longitude || "",
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
    const { name, value, type, files } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const deliveryFormData = new FormData();

    if (formData.profileImage) {
      deliveryFormData.append("profileImage", formData.profileImage);
    }

    deliveryFormData.append("dateOfBirth", formData.dateOfBirth);
    deliveryFormData.append(
      "emergencyContactNumber",
      formData.emergencyContactNumber
    );
    deliveryFormData.append("aadhaarNumber", formData.aadhaarNumber);

    deliveryFormData.append("vehicleType", formData.vehicleType);
    deliveryFormData.append("vehicleNumber", formData.vehicleNumber);
    deliveryFormData.append("vehicleModel", formData.vehicleModel);

    deliveryFormData.append(
      "drivingLicenseNumber",
      formData.drivingLicenseNumber
    );
    deliveryFormData.append(
      "drivingLicenseExpiryDate",
      formData.drivingLicenseExpiryDate
    );

    deliveryFormData.append(
      "bankDetails",
      JSON.stringify({
        accountHolderName: formData.accountHolderName,
        accountNumber: formData.accountNumber,
        ifscCode: formData.ifscCode,
        bankName: formData.bankName,
      })
    );

    deliveryFormData.append(
      "currentLocation",
      JSON.stringify({
        latitude: Number(formData.latitude),
        longitude: Number(formData.longitude),
      })
    );

    try {
      const response = await updateDeliveryProfile(deliveryFormData);
      console.log("Delivery Profile Response:", response);
      alert(response.message || "Delivery profile saved successfully");
      setIsEditing(false);
    } catch (error) {
      console.log("Delivery profile error:", error.message);
      alert(error.message || "Something went wrong");
    }
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
            Delivery Partner Profile
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Complete your verification details to start accepting orders.
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
            Personal Information
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600">
                Profile Image
              </label>
              <Input
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600">
                Date of Birth
              </label>
              <Input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
            </div>

            <Input
              name="emergencyContactNumber"
              value={formData.emergencyContactNumber}
              onChange={handleChange}
              placeholder="Emergency Contact Number"
              disabled={!isEditing}
              required
            />

            <Input
              name="aadhaarNumber"
              value={formData.aadhaarNumber}
              onChange={handleChange}
              placeholder="Aadhaar Number"
              disabled={!isEditing}
              required
            />
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Vehicle Information
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              options={vehicleTypes}
              disabled={!isEditing}
              required
            />

            <Input
              name="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleChange}
              placeholder="Vehicle Number"
              disabled={!isEditing}
              required
            />

            <Input
              name="vehicleModel"
              value={formData.vehicleModel}
              onChange={handleChange}
              placeholder="Vehicle Model"
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Driving License
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              name="drivingLicenseNumber"
              value={formData.drivingLicenseNumber}
              onChange={handleChange}
              placeholder="Driving License Number"
              disabled={!isEditing}
              required
            />

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600">
                Driving License Expiry Date
              </label>
              <Input
                type="date"
                name="drivingLicenseExpiryDate"
                value={formData.drivingLicenseExpiryDate}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Bank Details
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              name="accountHolderName"
              value={formData.accountHolderName}
              onChange={handleChange}
              placeholder="Account Holder Name"
              disabled={!isEditing}
              required
            />

            <Input
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              placeholder="Account Number"
              disabled={!isEditing}
              required
            />

            <Input
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleChange}
              placeholder="IFSC Code"
              disabled={!isEditing}
              required
            />

            <Input
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              placeholder="Bank Name"
              disabled={!isEditing}
              required
            />
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Current Location
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              type="number"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              placeholder="Latitude"
              disabled={!isEditing}
            />

            <Input
              type="number"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              placeholder="Longitude"
              disabled={!isEditing}
            />
          </div>
        </div>

        {isEditing && (
          <div className="max-w-xs">
            <Button type="submit">Save Delivery Profile</Button>
          </div>
        )}
      </form>
    </DashboardLayout>
  );
}

export default DeliveryProfile;