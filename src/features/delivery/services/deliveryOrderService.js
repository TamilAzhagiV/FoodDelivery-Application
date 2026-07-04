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

export async function getDeliveryOrders() {
  const response = await fetch(`${API_BASE_URL}/delivery-orders`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return parseResponse(response);
}

export async function acceptDeliveryOrder(orderId) {
  const response = await fetch(
    `${API_BASE_URL}/delivery-orders/${orderId}/accept`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return parseResponse(response);
}

export async function pickupDeliveryOrder(orderId) {
  const response = await fetch(
    `${API_BASE_URL}/delivery-orders/${orderId}/pickup`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return parseResponse(response);
}

export async function markDeliveryOrderDelivered(orderId) {
  const response = await fetch(
    `${API_BASE_URL}/delivery-orders/${orderId}/delivered`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return parseResponse(response);
}