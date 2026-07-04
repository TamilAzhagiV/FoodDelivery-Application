import { Link } from "react-router-dom";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const menuItems = {
    CUSTOMER: [
      {
        label: "Dashboard",
        path: "/customer/dashboard",
      },
      {
        label: "Profile",
        path: "/customer/profile",
      },
      {
        label: "Home",
        path: "/customer/home",
      },
    ],
        RESTAURANT_OWNER: [
      { label: "Dashboard", path: "/restaurant/dashboard" },
      { label: "Profile", path: "/restaurant/profile" },
      { label: "Menu Management", path: "/restaurant/menu" },
      { label: "Order Management", path: "/restaurant/orders" },
    ],

    DELIVERY_PARTNER: [
  { label: "Dashboard", path: "/delivery/dashboard" },
  { label: "Profile", path: "/delivery/profile" },
  { label: "Delivery Orders", path: "/delivery/orders" },
  { label: "Delivered Orders", path: "/delivery/delivered-orders" },
  ],

    ADMIN: [
      {
        label: "Dashboard",
        path: "/admin/dashboard",
      },
      {
        label: "Profile",
        path: "/admin/profile",
      },
      {
        label: "Restaurant Approvals",
        path: "/admin/restaurant-approvals",
      },
      {
        label: "Delivery Approvals",
        path: "/admin/delivery-approvals",
      },
    ],
  };

  return (
    <aside className="min-h-screen w-64 bg-white px-4 py-6 shadow-sm">
      <h2 className="mb-6 text-sm font-bold uppercase tracking-wide text-gray-400">
        Main Menu
      </h2>

      <div className="space-y-2">
        {menuItems[user?.role]?.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;