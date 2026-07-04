import { useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { updateAdminProfile } from "../../features/profile/services/profileService";

function AdminProfile() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    employeeId: "",
    department: "",
    accessLevel: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
async function handleSubmit(event) {
  event.preventDefault();

  const payload = {
    fullName: formData.fullName,
    email: formData.email,
    phoneNumber: formData.phoneNumber,
    employeeId: formData.employeeId,
    department: formData.department,
    accessLevel: formData.accessLevel,
  };

  try {
    const response = await updateAdminProfile(payload);
    console.log("Admin Profile Response:", response);
    alert("Admin profile saved successfully");
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
}

  return (
    <DashboardLayout>
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Admin Profile
      </h1>

      <div className="max-w-2xl rounded-2xl bg-white p-6 shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" />
          <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" />
          <Input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" />
          <Input name="employeeId" value={formData.employeeId} onChange={handleChange} placeholder="Employee ID" />
          <Input name="department" value={formData.department} onChange={handleChange} placeholder="Department" />
          <Input name="accessLevel" value={formData.accessLevel} onChange={handleChange} placeholder="Access Level" />

          <Button type="submit">Save Admin Profile</Button>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default AdminProfile;