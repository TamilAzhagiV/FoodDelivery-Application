const API_BASE_URL = "http://192.168.1.22:3000/admin";

function getToken() {
  return localStorage.getItem("accessToken");
}

async function parseResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export async function getAllRestaurantsForApproval() {
  const response = await fetch(`${API_BASE_URL}/restaurants`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return parseResponse(response);
}

export async function approveRestaurant(restaurantId) {
  const response = await fetch(
    `${API_BASE_URL}/restaurants/${restaurantId}/approve`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return parseResponse(response);
}

export async function rejectRestaurant(restaurantId, rejectionReason) {
  const response = await fetch(
    `${API_BASE_URL}/restaurants/${restaurantId}/reject`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ rejectionReason }),
    }
  );

  return parseResponse(response);
}

export async function getAllDeliveryPartnersForApproval() {
  const response = await fetch(`${API_BASE_URL}/delivery-partners`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return parseResponse(response);
}