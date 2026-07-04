import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import TextArea from "../../components/ui/TextArea";

import {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../../features/restaurant/services/menuService";

function MenuManagement() {
  const [menuItems, setMenuItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    cuisineType: "",
    foodType: "VEG",
    preparationTime: "",
    isAvailable: true,
    image: null,
  });

  async function fetchMenuItems() {
    try {
      setLoading(true);
      const response = await getMenuItems();
      setMenuItems(response.data || []);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMenuItems();
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

  function resetForm() {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      cuisineType: "",
      foodType: "VEG",
      preparationTime: "",
      isAvailable: true,
      image: null,
    });

    setEditingId(null);
  }

  function buildMenuFormData() {
    const data = new FormData();

    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", Number(formData.price));
    data.append("category", formData.category);
    data.append("cuisineType", formData.cuisineType);
    data.append("foodType", formData.foodType);
    data.append("preparationTime", Number(formData.preparationTime));
    data.append("isAvailable", formData.isAvailable);

    if (formData.image) {
      data.append("image", formData.image);
    }

    return data;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const data = buildMenuFormData();

      if (editingId) {
        await updateMenuItem(editingId, data);
        alert("Menu item updated successfully");
      } else {
        await createMenuItem(data);
        alert("Menu item created successfully");
      }

      resetForm();
      fetchMenuItems();
    } catch (error) {
      alert(error.message);
    }
  }

  function handleEdit(item) {
    setEditingId(item._id);

    setFormData({
      name: item.name || "",
      description: item.description || "",
      price: item.price || "",
      category: item.category || "",
      cuisineType: item.cuisineType || "",
      foodType: item.foodType || "VEG",
      preparationTime: item.preparationTime || "",
      isAvailable: item.isAvailable ?? true,
      image: null,
    });
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this menu item?"
    );

    if (!confirmDelete) return;

    try {
      await deleteMenuItem(id);
      alert("Menu item deleted successfully");
      fetchMenuItems();
    } catch (error) {
      alert(error.message);
    }
  }

  const filteredItems = menuItems.filter((item) =>
    item.name?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Menu Management</h1>
        <p className="text-sm text-gray-500">
          Create, update, and manage your restaurant menu items.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-8 space-y-5 rounded-3xl bg-white p-6 shadow-sm"
      >
        <h2 className="text-xl font-bold text-gray-800">
          {editingId ? "Edit Menu Item" : "Add Menu Item"}
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Food Name"
            required
          />

          <Input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />

          <Input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            required
          />

          <Input
            name="cuisineType"
            value={formData.cuisineType}
            onChange={handleChange}
            placeholder="Cuisine Type"
            required
          />

          <select
            name="foodType"
            value={formData.foodType}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="VEG">Veg</option>
            <option value="NON_VEG">Non Veg</option>
          </select>

          <Input
            type="number"
            name="preparationTime"
            value={formData.preparationTime}
            onChange={handleChange}
            placeholder="Preparation Time in minutes"
            required
          />

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600">
              Food Image
            </label>
            <Input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
              className="h-4 w-4"
            />
            Available
          </label>

          <div className="md:col-span-2">
            <TextArea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Food Description"
              required
            />
          </div>
        </div>

        <div className="flex gap-3">
          <div className="max-w-xs">
            <Button type="submit">
              {editingId ? "Update Item" : "Add Item"}
            </Button>
          </div>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl border px-5 py-2 text-sm font-semibold"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mb-5 rounded-2xl bg-white p-4 shadow-sm">
        <Input
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Search menu item..."
        />
      </div>

      {loading ? (
        <p className="rounded-xl bg-white p-4 text-gray-500">
          Loading menu items...
        </p>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm"
            >
              <div>
                <h2 className="font-bold text-gray-800">{item.name}</h2>
                <p className="text-sm text-gray-500">{item.description}</p>
                <p className="mt-1 text-sm text-gray-600">
                  ₹{item.price} • {item.category} • {item.foodType}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    item.isAvailable
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {item.isAvailable ? "Available" : "Unavailable"}
                </span>

                <button
                  type="button"
                  onClick={() => handleEdit(item)}
                  className="rounded-xl border px-4 py-2 text-sm font-semibold"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(item._id)}
                  className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <p className="rounded-xl bg-white p-4 text-gray-500">
              No menu items found.
            </p>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}

export default MenuManagement;