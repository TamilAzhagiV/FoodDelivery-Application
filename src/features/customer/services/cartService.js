const API_BASE_URL = "http://192.168.1.22:3000";

function getToken() {
  return localStorage.getItem("accessToken");
}

async function parseResponse(response) {
  const text = await response.text();

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

export async function getCart() {
  const response = await fetch(`${API_BASE_URL}/cart`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return parseResponse(response);
}

export async function addToCart(menuItemId, quantity = 1) {
  const response = await fetch(`${API_BASE_URL}/cart/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      menuItemId,
      quantity,
    }),
  });

  return parseResponse(response);
}

export async function updateCartItem(menuItemId, quantity) {
  const response = await fetch(`${API_BASE_URL}/cart/item/${menuItemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ quantity }),
  });

  return parseResponse(response);
}

export async function removeCartItem(menuItemId) {
  const response = await fetch(`${API_BASE_URL}/cart/item/${menuItemId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return parseResponse(response);
}

export async function clearCart() {
  const response = await fetch(`${API_BASE_URL}/cart/clear`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return parseResponse(response);
}