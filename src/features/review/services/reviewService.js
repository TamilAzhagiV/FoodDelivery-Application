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

export async function submitRestaurantReview(data) {
  const response = await fetch(`${API_BASE_URL}/restaurant-reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  return parseResponse(response);
}

export async function getRestaurantReviews() {
  const response = await fetch(`${API_BASE_URL}/restaurant-reviews`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return parseResponse(response);
}

export async function submitDeliveryReview(data) {
  const response = await fetch(`${API_BASE_URL}/delivery-reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  return parseResponse(response);
}

export async function getDeliveryReviews() {
  const response = await fetch(`${API_BASE_URL}/delivery-reviews`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return parseResponse(response);
}

