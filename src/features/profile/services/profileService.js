const API_BASE_URL = "http://192.168.1.22:3000/profile";

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

// Get Logged-in User Profile
export async function getProfile() {
  const response = await fetch(`${API_BASE_URL}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return parseResponse(response);
}

// Get User Role
export async function getUserRole() {
  const profile = await getProfile();
  return profile.role;
}

// Update Customer Profile
export async function updateCustomerProfile(data) {
  const response = await fetch(`${API_BASE_URL}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    body: data
  });

  return parseResponse(response);
}

// Update Restaurant Profile
export async function updateRestaurantProfile(data) {
  
  const response = await fetch(`${API_BASE_URL}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    body: data // FormData
  });
  
  return parseResponse(response);
}

// Update Delivery Partner Profile
export async function updateDeliveryProfile(data) {
  const response = await fetch(`${API_BASE_URL}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    body: data
  });

  return parseResponse(response);
}

// Update Admin Profile
export async function updateAdminProfile(data) {
  const response = await fetch(`${API_BASE_URL}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(data)
  });

  return parseResponse(response);
}

// Get Role-Based Profile
export async function getRoleBasedProfile() {
  const response = await getProfile();

  return {
    role: response.role,
    profile: response.data
  };
}