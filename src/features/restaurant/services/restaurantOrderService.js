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

export async function getRestaurantOrders() {
  const response = await fetch(`${API_BASE_URL}/restaurant/orders`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return parseResponse(response);
}

export async function acceptRestaurantOrder(orderId) {
  const response = await fetch(
    `${API_BASE_URL}/restaurant/orders/${orderId}/accept`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return parseResponse(response);
}

export async function markOrderPreparing(orderId) {
  const response = await fetch(
    `${API_BASE_URL}/restaurant/orders/${orderId}/preparing`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return parseResponse(response);
}

export async function markOrderReady(orderId) {
  const response = await fetch(
    `${API_BASE_URL}/restaurant/orders/${orderId}/ready`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return parseResponse(response);
}