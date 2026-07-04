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

export async function getRestaurants() {
  const response = await fetch(`${API_BASE_URL}/restaurants`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return parseResponse(response);
}

export async function getRestaurantById(restaurantId) {
  const response = await fetch(`${API_BASE_URL}/restaurants/${restaurantId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return parseResponse(response);
}

export async function getRestaurantMenu(restaurantId) {
  const response = await fetch(
    `${API_BASE_URL}/restaurants/${restaurantId}/menu`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return parseResponse(response);
}

export async function searchMenuItems(query) {
  const response = await fetch(
    `${API_BASE_URL}/restaurants/search/menu?search=${query}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return parseResponse(response);
}
