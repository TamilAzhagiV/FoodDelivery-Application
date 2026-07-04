const API_BASE_URL = "http://192.168.1.22:3000";


function getToken() {
  return localStorage.getItem("accessToken");
}

async function parseResponse(response) {
  const text = await response.text();

  console.log("Menu API status:", response.status);
  console.log("Menu API response:", text);

  let data = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(text || "Backend did not return JSON");
  }

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}
export async function getMenuItems() {
  const response = await fetch(`${API_BASE_URL}/menu`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return parseResponse(response);
}

export async function createMenuItem(data) {
  const response = await fetch(`${API_BASE_URL}/menu`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: data,
  });

  return parseResponse(response);
}

export async function updateMenuItem(menuItemId, data) {
  const response = await fetch(`${API_BASE_URL}/menu/${menuItemId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: data,
  });

  return parseResponse(response);
}

export async function deleteMenuItem(menuItemId) {
  const response = await fetch(`${API_BASE_URL}/menu/${menuItemId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return parseResponse(response);
}

export const getRestaurantMenu = getMenuItems;